const app = document.querySelector("#app");

const STORAGE_KEY = "silent-wake-session";
const SOCKET_ACK_TIMEOUT_MS = 2000;

const state = {
  scenario: null,
  game: null,
  session: loadSession(),
  selectedCommitIds: [],
  lastError: "",
  flashMessage: "",
  connectionStatus: "offline",
};

let socket = null;

const roleLabels = {
  admin: "Game Admin",
  co: "Chief Officer",
  cyber_officer: "Cyber Officer",
  air_officer: "Air Officer",
  naval_officer: "Naval Officer",
  submarine_officer: "Submarine Officer",
};

const validRoles = Object.keys(roleLabels);

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function saveSession(session) {
  state.session = session;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function clearSession() {
  state.session = null;
  localStorage.removeItem(STORAGE_KEY);
  disconnectSocket();
}

function getPlayer() {
  return state.session?.player || null;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fmtSeconds(total) {
  const mins = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.max(0, total % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

async function api(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };
  const body = options.body;
  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (state.session?.token) {
    headers["x-session-token"] = state.session.token;
  }

  const response = await fetch(path, {
    method: options.method || "GET",
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

function flash(message) {
  state.flashMessage = message;
  render();
  window.clearTimeout(flash.timeoutId);
  flash.timeoutId = window.setTimeout(() => {
    state.flashMessage = "";
    render();
  }, 3000);
}

function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  state.connectionStatus = "offline";
}

function connectSocket() {
  const token = state.session?.token;
  if (!token) {
    disconnectSocket();
    return;
  }

  disconnectSocket();
  socket = io({
    auth: { token },
    transports: ["websocket"],
    timeout: SOCKET_ACK_TIMEOUT_MS,
  });

  socket.on("connect", () => {
    state.connectionStatus = "online";
    state.lastError = "";
    render();
  });

  socket.on("disconnect", () => {
    state.connectionStatus = "offline";
    render();
  });

  socket.on("connect_error", (error) => {
    state.connectionStatus = "offline";
    state.lastError = error.message || "Socket connection failed.";
    render();
  });

  socket.on("STATE_UPDATE", async (payload) => {
    state.game = payload;
    if (state.scenario?.version !== payload.scenario_version) {
      await refreshScenario();
    }
    render();
  });

  socket.on("SCENARIO_UPDATED", async (payload) => {
    state.scenario = payload;
    render();
  });

  socket.on("TURN_RESOLVED", () => {
    state.selectedCommitIds = [];
    render();
  });

  socket.on("SERVER_ERROR", (payload) => {
    state.lastError = payload?.message || "A server error occurred.";
    render();
  });

  socket.on("CHAT_MESSAGE", () => {
    render();
  });
}

function emitSocket(eventName, payload = {}) {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error("Socket is not connected."));
      return;
    }

    socket.timeout(SOCKET_ACK_TIMEOUT_MS).emit(eventName, payload, (error, response) => {
      if (error) {
        reject(new Error("Socket request timed out."));
        return;
      }
      if (!response?.ok) {
        reject(new Error(response?.error || "Socket request failed."));
        return;
      }
      resolve(response);
    });
  });
}

async function refreshScenario() {
  state.scenario = await api("/api/v1/scenario");
}

async function refreshState() {
  state.game = await api("/api/v1/state");
}

async function restoreSession() {
  if (!state.session?.token) {
    return false;
  }

  try {
    const data = await api("/api/v1/resume_session", {
      method: "POST",
    });
    saveSession({
      player: data.player,
      token: state.session.token,
    });
    return true;
  } catch {
    clearSession();
    return false;
  }
}

async function bootstrap() {
  await refreshScenario();
  await refreshState();
  await restoreSession();
  if (state.session?.token) {
    connectSocket();
  }
  render();
}

function getTurn() {
  if (!state.scenario || !state.game) {
    return null;
  }
  return state.scenario.turns.find(
    (turn) => turn.turn_index === state.game.game_metadata.current_turn,
  );
}

function getPlayerTurnCards() {
  const turn = getTurn();
  const player = getPlayer();
  if (!turn || !player?.role) {
    return [];
  }
  return turn.cards[player.role] || [];
}

function getActiveSelection() {
  const player = getPlayer();
  if (!state.game || !player) {
    return null;
  }
  return state.game.turn_data.active_cards.find((entry) => entry.player_id === player.id);
}

function resolveCardById(cardId) {
  const turn = getTurn();
  if (!turn) {
    return null;
  }
  for (const [role, cards] of Object.entries(turn.cards)) {
    const card = cards.find((entry) => entry.id === cardId);
    if (card) {
      return { ...card, role };
    }
  }
  return null;
}

function renderStatus(status) {
  return `<span class="status-${status.toLowerCase()}">${status}</span>`;
}

function renderNoticeBar() {
  const items = [];
  if (state.connectionStatus !== "online" && getPlayer()) {
    items.push(`<span class="notice error">Realtime offline</span>`);
  }
  if (state.flashMessage) {
    items.push(`<span class="notice ok">${escapeHtml(state.flashMessage)}</span>`);
  }
  if (state.lastError) {
    items.push(`<span class="notice error">${escapeHtml(state.lastError)}</span>`);
  }
  if (items.length === 0) {
    return "";
  }
  return `<section class="notice-row">${items.join("")}</section>`;
}

function renderHeader() {
  const meta = state.game.game_metadata;
  return `
    <section class="hero">
      <div>
        <div class="turn-banner">${escapeHtml(state.game.scenario_meta.title)} • ${escapeHtml(meta.phase)}</div>
        <h1>Silent Wake</h1>
        <p>${escapeHtml(state.game.scenario_meta.description)}</p>
      </div>
      <div class="pill-row">
        <span class="pill">Turn ${meta.current_turn}/10</span>
        <span class="pill">Timer ${fmtSeconds(state.game.turn_data.timer_remaining)}</span>
        <span class="pill">Stress ${meta.stress_level}</span>
        <span class="pill">Score ${meta.mission_score}</span>
      </div>
    </section>
    ${renderNoticeBar()}
  `;
}

function renderSystemsPanel() {
  const rows = Object.entries(state.game.systems)
    .map(
      ([key, value]) => `
        <div class="score-row">
          <span>${escapeHtml(key)}</span>
          ${renderStatus(value)}
        </div>
      `,
    )
    .join("");

  return `
    <section class="panel compact">
      <h3>Systems</h3>
      <div class="history-list">${rows}</div>
    </section>
  `;
}

function renderChatPanel() {
  const messages = state.game.chat.length
    ? state.game.chat
        .map(
          (message) => `
            <div class="chat-message">
              <strong>${escapeHtml(message.player_name)}</strong>
              <div class="muted">${escapeHtml(roleLabels[message.role] || message.role)}</div>
              <div>${escapeHtml(message.text)}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="muted">No traffic yet.</div>`;

  return `
    <section class="panel compact">
      <h3>Chat</h3>
      <div class="chat-log">${messages}</div>
      ${
        getPlayer()
          ? `
            <form class="chat-form" id="chat-form">
              <input id="chat-input" maxlength="400" placeholder="Send room message" />
              <button type="submit">Send</button>
            </form>
          `
          : ""
      }
    </section>
  `;
}

function renderHistoryPanel() {
  const items = state.game.turn_history.length
    ? [...state.game.turn_history]
        .reverse()
        .map(
          (entry) => `
            <div class="history-item">
              <div class="row-between">
                <strong>Turn ${entry.turn_index}</strong>
                <span class="pill">${escapeHtml(entry.outcome)}</span>
              </div>
              <div>Score delta: ${entry.score_delta}</div>
              <div class="muted">Matched: ${entry.matched.join(", ") || "none"}</div>
              <div class="muted">Missed: ${entry.missed.join(", ") || "none"}</div>
              <div class="muted">Bad: ${entry.bad_cards.join(", ") || "none"}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="muted">No completed turns yet.</div>`;

  return `
    <section class="panel compact">
      <h3>Turn History</h3>
      <div class="history-list">${items}</div>
    </section>
  `;
}

function renderJoinScreen() {
  const options = validRoles
    .map((role) => `<option value="${role}">${escapeHtml(roleLabels[role])}</option>`)
    .join("");

  app.innerHTML = `
    <main class="shell">
      <section class="panel">
        <h2>Join Session</h2>
        <p>Choose a role for room ${escapeHtml(state.game?.room.code || "alpha-room")}.</p>
        ${renderNoticeBar()}
        <form id="join-form" class="grid two">
          <input id="player-name" maxlength="40" placeholder="Player name" required />
          <select id="player-role">${options}</select>
          <button type="submit">Join</button>
        </form>
      </section>
    </main>
  `;

  document.querySelector("#join-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    state.lastError = "";
    try {
      const name = document.querySelector("#player-name").value.trim();
      const role = document.querySelector("#player-role").value;
      const data = await api("/api/v1/join", {
        method: "POST",
        body: { name, role },
      });
      saveSession({
        player: data.player,
        token: data.session_token,
      });
      connectSocket();
      flash(`Joined as ${roleLabels[data.player.role]}.`);
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  });
}

function renderWaitingRoom() {
  const player = getPlayer();
  const roster = state.game.players.length
    ? state.game.players
        .map(
          (entry) => `
            <div class="roster-item">
              <div>
                <strong>${escapeHtml(entry.name)}</strong>
                <div class="muted">${escapeHtml(roleLabels[entry.role] || entry.role)}</div>
              </div>
              <span class="pill">${entry.connected ? "online" : "offline"}</span>
            </div>
          `,
        )
        .join("")
    : `<div class="muted">No players connected.</div>`;

  const isAdmin = player?.role === "admin";
  app.innerHTML = `
    <main class="shell">
      ${renderHeader()}
      <section class="grid two">
        <section class="panel">
          <h2>Waiting Room</h2>
          <p>Players are staged here until the admin starts the 10 second countdown.</p>
          ${
            isAdmin
              ? `
                <div class="toolbar">
                  <button id="create-room-btn" class="secondary">Reset Room</button>
                  <button id="start-game-btn">Start Countdown</button>
                  <button id="refresh-btn" class="secondary">Refresh State</button>
                </div>
                <form id="scenario-form" class="toolbar" enctype="multipart/form-data">
                  <input id="scenario-file" type="file" accept=".json,application/json" />
                  <button type="submit" class="secondary">Upload Scenario</button>
                </form>
              `
              : `<p class="muted">Waiting for Game Admin to initiate launch.</p>`
          }
          ${
            state.game.room.startCountdownEndsAt
              ? `<div class="big-number">${Math.max(0, Math.ceil((state.game.room.startCountdownEndsAt - Date.now()) / 1000))}</div>`
              : ""
          }
        </section>
        <section class="panel">
          <h2>Roster</h2>
          <div class="roster-list">${roster}</div>
        </section>
      </section>
      <section class="grid two">
        ${renderChatPanel()}
        ${renderSystemsPanel()}
      </section>
    </main>
  `;

  wireChat();

  if (isAdmin) {
    document.querySelector("#create-room-btn").addEventListener("click", async () => {
      try {
        await api("/api/v1/create_room", {
          method: "POST",
          body: { room_code: state.game.room.code },
        });
        state.selectedCommitIds = [];
        flash("Room reset.");
      } catch (error) {
        state.lastError = error.message;
        render();
      }
    });

    document.querySelector("#start-game-btn").addEventListener("click", async () => {
      try {
        await api("/api/v1/start_game_countdown", {
          method: "POST",
        });
        flash("Countdown started.");
      } catch (error) {
        state.lastError = error.message;
        render();
      }
    });

    document.querySelector("#refresh-btn").addEventListener("click", async () => {
      try {
        await refreshScenario();
        await refreshState();
        flash("State refreshed.");
        render();
      } catch (error) {
        state.lastError = error.message;
        render();
      }
    });

    document.querySelector("#scenario-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      state.lastError = "";
      try {
        const file = document.querySelector("#scenario-file").files[0];
        if (!file) {
          throw new Error("Choose a scenario file first.");
        }
        const payload = new FormData();
        payload.append("scenario", file);
        await api("/api/v1/load_scenario", {
          method: "POST",
          body: payload,
        });
        await refreshScenario();
        await refreshState();
        flash("Scenario loaded.");
        render();
      } catch (error) {
        state.lastError = error.message;
        render();
      }
    });
  }
}

function renderOfficerView() {
  const player = getPlayer();
  const turn = getTurn();
  const cards = getPlayerTurnCards();
  const activeSelection = getActiveSelection();
  const selectionCard = activeSelection ? resolveCardById(activeSelection.card_id) : null;
  const canInteract = state.game.game_metadata.phase === "action" && state.connectionStatus === "online";
  const cardsMarkup = cards
    .map(
      (card) => `
        <article class="card ${activeSelection?.card_id === card.id ? "selected" : ""}">
          <div class="role-label">${escapeHtml(roleLabels[player.role])}</div>
          <h4>${escapeHtml(card.name)}</h4>
          <p>${escapeHtml(card.desc)}</p>
          <div class="card-actions">
            <span class="pill">${escapeHtml(card.id)}</span>
            <button data-play-card="${card.id}" ${canInteract ? "" : "disabled"}>Play</button>
          </div>
        </article>
      `,
    )
    .join("");

  app.innerHTML = `
    <main class="shell">
      ${renderHeader()}
      <section class="grid two">
        <section class="panel">
          <h2>${escapeHtml(roleLabels[player.role])}</h2>
          <p>${turn ? escapeHtml(turn.context) : "Awaiting mission data."}</p>
          <div class="placeholder">
            <strong>Visual Placeholder</strong>
            ${
              selectionCard
                ? `<div>${escapeHtml(selectionCard.name)} (${escapeHtml(selectionCard.id)})</div>`
                : `<div class="muted">No card armed.</div>`
            }
            <div class="footer-note">Hot-swapping remains available while the timer is active.</div>
            <button id="remove-card-btn" class="secondary" ${canInteract && selectionCard ? "" : "disabled"}>Remove</button>
          </div>
        </section>
        <section class="panel">
          <h2>Shipboard Status</h2>
          <div class="stat-grid">
            <div class="stat"><small>Timer</small><strong>${fmtSeconds(state.game.turn_data.timer_remaining)}</strong></div>
            <div class="stat"><small>Stress</small><strong>${state.game.game_metadata.stress_level}</strong></div>
            <div class="stat"><small>Mission Score</small><strong>${state.game.game_metadata.mission_score}</strong></div>
            <div class="stat"><small>Tide Window</small><strong>${state.game.game_metadata.tide_window_minutes}m</strong></div>
          </div>
        </section>
      </section>
      <section class="grid three">
        <section class="panel">
          <h3>Your Cards</h3>
          <div class="cards">${cardsMarkup}</div>
        </section>
        ${renderChatPanel()}
        ${renderSystemsPanel()}
      </section>
    </main>
    ${renderPhaseOverlay(turn)}
  `;

  wireChat();
  document.querySelectorAll("[data-play-card]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        state.lastError = "";
        await emitSocket("PLAY_CARD", {
          cardId: button.dataset.playCard,
        });
      } catch (error) {
        state.lastError = error.message;
        render();
      }
    });
  });

  document.querySelector("#remove-card-btn")?.addEventListener("click", async () => {
    try {
      state.lastError = "";
      await emitSocket("REMOVE_CARD");
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  });
}

function renderCOView() {
  const turn = getTurn();
  const activeCards = state.game.turn_data.active_cards
    .map((entry) => ({ ...entry, card: resolveCardById(entry.card_id) }))
    .sort((a, b) => a.role.localeCompare(b.role));

  const activeMarkup = activeCards.length
    ? activeCards
        .map(
          (entry) => `
            <div class="selection-item">
              <div>
                <strong>${escapeHtml(entry.player_name)}</strong>
                <div class="muted">${escapeHtml(roleLabels[entry.role])}</div>
                <div>${escapeHtml(entry.card?.name || entry.card_id)}</div>
              </div>
              <label class="pill">
                <input type="checkbox" data-commit-card="${entry.card_id}" ${
                  state.selectedCommitIds.includes(entry.card_id) ? "checked" : ""
                } />
                Commit
              </label>
            </div>
          `,
        )
        .join("")
    : `<div class="muted">No officers have played a card yet.</div>`;

  app.innerHTML = `
    <main class="shell">
      ${renderHeader()}
      <section class="grid two">
        <section class="panel">
          <h2>Chief Officer Board</h2>
          <p>${turn ? escapeHtml(turn.context) : "Awaiting mission data."}</p>
          <div class="toolbar">
            <button id="start-turn-btn" ${
              state.game.game_metadata.phase === "briefing" ? "" : "disabled"
            }>Start Turn</button>
            <button id="commit-turn-btn" ${
              state.game.game_metadata.phase === "action" && activeCards.length > 0 ? "" : "disabled"
            }>Commit Final Answer</button>
          </div>
          <div class="footer-note">Only the Chief Officer can commit the final answer.</div>
        </section>
        <section class="panel">
          <h2>Turn Control</h2>
          <div class="stat-grid">
            <div class="stat"><small>Timer</small><strong>${fmtSeconds(state.game.turn_data.timer_remaining)}</strong></div>
            <div class="stat"><small>Played Cards</small><strong>${state.game.turn_data.active_cards.length}</strong></div>
            <div class="stat"><small>Committed</small><strong>${state.selectedCommitIds.length}</strong></div>
            <div class="stat"><small>Phase</small><strong>${escapeHtml(state.game.game_metadata.phase)}</strong></div>
          </div>
        </section>
      </section>
      <section class="grid three">
        <section class="panel">
          <h3>Played Cards</h3>
          <div class="selection-list">${activeMarkup}</div>
        </section>
        ${renderHistoryPanel()}
        ${renderSystemsPanel()}
      </section>
    </main>
    ${renderPhaseOverlay(turn)}
  `;

  document.querySelectorAll("[data-commit-card]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.dataset.commitCard;
      if (checkbox.checked) {
        if (!state.selectedCommitIds.includes(id)) {
          state.selectedCommitIds = [...state.selectedCommitIds, id];
        }
      } else {
        state.selectedCommitIds = state.selectedCommitIds.filter((entry) => entry !== id);
      }
      render();
    });
  });

  document.querySelector("#start-turn-btn").addEventListener("click", async () => {
    try {
      state.lastError = "";
      await api("/api/v1/start_turn", {
        method: "POST",
      });
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  });

  document.querySelector("#commit-turn-btn").addEventListener("click", async () => {
    try {
      state.lastError = "";
      await api("/api/v1/commit_turn", {
        method: "POST",
        body: { card_ids: state.selectedCommitIds },
      });
      state.selectedCommitIds = [];
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  });
}

function renderScoreboard() {
  const entries = [...state.game.players]
    .filter((player) => player.role !== "admin")
    .map((player) => {
      let correct = 0;
      let incorrect = 0;
      for (const turnEntry of state.game.turn_history) {
        const played = turnEntry.summary.played_cards.find((card) => card.player_id === player.id);
        if (!played) {
          continue;
        }
        if (turnEntry.matched.includes(played.card_id)) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      }
      return { player, correct, incorrect };
    });

  const playerStats = entries.length
    ? entries
        .map(
          (entry) => `
            <div class="history-item">
              <strong>${escapeHtml(entry.player.name)}</strong>
              <div class="muted">${escapeHtml(roleLabels[entry.player.role])}</div>
              <div>Correct: ${entry.correct}</div>
              <div>Incorrect: ${entry.incorrect}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="muted">No player statistics available.</div>`;

  app.innerHTML = `
    <main class="shell">
      ${renderHeader()}
      <section class="grid two">
        <section class="panel">
          <h2>Mission Rating</h2>
          <div class="big-number">${state.game.game_metadata.mission_score}</div>
          <p>${escapeHtml(state.game.game_metadata.final_rating || "Pending")}</p>
          <div class="footer-note">The scoring dashboard is triggered automatically after Turn 10.</div>
        </section>
        <section class="panel">
          <h2>Player Statistics</h2>
          <div class="history-list">${playerStats}</div>
        </section>
      </section>
      <section class="grid two">
        ${renderHistoryPanel()}
        ${renderSystemsPanel()}
      </section>
      <section class="panel compact">
        <button id="logout-btn" class="secondary">Clear Local Session</button>
      </section>
    </main>
  `;

  document.querySelector("#logout-btn").addEventListener("click", () => {
    clearSession();
    state.selectedCommitIds = [];
    render();
  });
}

function renderPhaseOverlay(turn) {
  if (state.game.game_metadata.phase === "briefing" && turn) {
    return `
      <div class="overlay">
        <div class="modal-card">
          <div class="turn-banner">Briefing • Turn ${turn.turn_index}</div>
          <h3>${escapeHtml(turn.title)}</h3>
          <p>${escapeHtml(turn.context)}</p>
          <div class="footer-note">
            ${
              getPlayer()?.role === "co"
                ? "Chief Officer starts the turn when ready."
                : "Timer remains paused until the Chief Officer starts the turn."
            }
          </div>
        </div>
      </div>
    `;
  }

  if (state.game.game_metadata.phase === "transition") {
    return `
      <div class="transition-overlay">
        <div class="modal-card">
          <div class="turn-banner">Transition</div>
          <div class="big-number">${state.game.transition_remaining}</div>
          <p>Next turn in ${state.game.transition_remaining} seconds.</p>
        </div>
      </div>
    `;
  }

  return "";
}

function wireChat() {
  const chatForm = document.querySelector("#chat-form");
  if (!chatForm) {
    return;
  }

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.querySelector("#chat-input");
    const text = input.value.trim();
    if (!text) {
      return;
    }
    try {
      state.lastError = "";
      await emitSocket("CHAT_MESSAGE", { text });
      input.value = "";
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  });
}

function render() {
  if (!state.game || !state.scenario) {
    app.innerHTML = `<main class="shell"><section class="panel"><p>Loading mission state…</p></section></main>`;
    return;
  }

  const player = getPlayer();
  if (!player) {
    renderJoinScreen();
    return;
  }

  if (state.game.game_metadata.phase === "game_over") {
    renderScoreboard();
    return;
  }

  if (!state.game.room.hasStarted) {
    renderWaitingRoom();
    return;
  }

  if (player.role === "admin") {
    renderWaitingRoom();
    return;
  }

  if (player.role === "co") {
    renderCOView();
    return;
  }

  renderOfficerView();
}

bootstrap().catch((error) => {
  app.innerHTML = `
    <main class="shell">
      <section class="panel">
        <h2>Bootstrap Failed</h2>
        <p>${escapeHtml(error.message)}</p>
      </section>
    </main>
  `;
});
