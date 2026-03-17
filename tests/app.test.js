const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");

const { io } = require("socket.io-client");

const repoDir = path.resolve(__dirname, "..");
const port = 3100 + Math.floor(Math.random() * 200);
const baseUrl = `http://127.0.0.1:${port}`;

let serverProcess;

async function waitForServer() {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 15_000) {
    try {
      const response = await fetch(`${baseUrl}/healthz`);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Server did not start in time.");
}

async function api(pathname, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };
  const body = options.body;
  const response = await fetch(`${baseUrl}${pathname}`, {
    method: options.method || "GET",
    headers: body instanceof FormData ? headers : { "Content-Type": "application/json", ...headers },
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

function authHeaders(token) {
  return {
    "x-session-token": token,
  };
}

function connectSocket(token) {
  return io(baseUrl, {
    auth: { token },
    transports: ["websocket"],
    forceNew: true,
    reconnection: false,
  });
}

function once(socket, eventName, timeoutMs = 10_000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${eventName}`)), timeoutMs);
    socket.once(eventName, (payload) => {
      clearTimeout(timeout);
      resolve(payload);
    });
  });
}

test.before(async () => {
  serverProcess = spawn("node", ["server.js"], {
    cwd: repoDir,
    env: {
      ...process.env,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitForServer();
});

test.after(async () => {
  if (!serverProcess) {
    return;
  }
  serverProcess.kill("SIGTERM");
  await new Promise((resolve) => serverProcess.once("exit", resolve));
});

test("health and scenario endpoints respond", async () => {
  const health = await api("/healthz");
  assert.equal(health.ok, true);

  const scenario = await api("/api/v1/scenario");
  assert.equal(scenario.turns.length, 10);
  assert.ok(scenario.version);
});

test("role-restricted endpoints require the right session", async () => {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });
  const coJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Captain", role: "co" },
  });

  await assert.rejects(
    api("/api/v1/start_turn", {
      method: "POST",
      headers: authHeaders(adminJoin.session_token),
    }),
    /Chief Officer role required/,
  );

  await assert.rejects(
    api("/api/v1/create_room", {
      method: "POST",
      headers: authHeaders(coJoin.session_token),
      body: { room_code: "blocked" },
    }),
    /Game Admin role required/,
  );
});

test("countdown requires an uploaded scenario", async () => {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });

  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "needs-scenario" },
  });

  await assert.rejects(
    api("/api/v1/start_game_countdown", {
      method: "POST",
      headers: authHeaders(adminJoin.session_token),
    }),
    /Upload a scenario before starting the countdown/,
  );
});

test("synchronized turn flow works over http and websocket", async () => {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });

  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "flow-room" },
  });

  await api("/api/v1/load_scenario", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { path: "./scenario_1.json" },
  });

  const coJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Captain", role: "co" },
  });
  const cyberJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Cy", role: "cyber_officer" },
  });
  const airJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Ari", role: "air_officer" },
  });
  const navalJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Nav", role: "naval_officer" },
  });
  const subJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Sub", role: "submarine_officer" },
  });

  const sockets = [
    connectSocket(adminJoin.session_token),
    connectSocket(coJoin.session_token),
    connectSocket(cyberJoin.session_token),
    connectSocket(airJoin.session_token),
    connectSocket(navalJoin.session_token),
    connectSocket(subJoin.session_token),
  ];

  await Promise.all(sockets.map((socket) => once(socket, "STATE_UPDATE")));

  const briefingReady = once(sockets[1], "BRIEFING_READY", 15_000);
  await api("/api/v1/start_game_countdown", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
  });
  await briefingReady;

  await api("/api/v1/start_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
  });

  const playCard = (socket, cardId) =>
    new Promise((resolve, reject) => {
      socket.emit("PLAY_CARD", { cardId }, (response) => {
        if (!response?.ok) {
          reject(new Error(response?.error || "Play failed"));
          return;
        }
        resolve(undefined);
      });
    });

  await Promise.all([
    playCard(sockets[2], "C1"),
    playCard(sockets[3], "A2"),
    playCard(sockets[4], "N3"),
  ]);

  const resolvedPromise = once(sockets[1], "TURN_RESOLVED");
  await api("/api/v1/commit_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
    body: { card_ids: ["C1", "A2", "N3"] },
  });

  const resolved = await resolvedPromise;
  assert.equal(resolved.outcome, "best");

  const state = await api("/api/v1/state");
  assert.equal(state.game_metadata.mission_score, 300);

  sockets.forEach((socket) => socket.close());
  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "post-flow-reset" },
  });
});

test("officers can arm up to three cards and remove one specific card", async () => {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });

  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "triple-cards" },
  });

  await api("/api/v1/load_scenario", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { path: "./scenario_1.json" },
  });

  const coJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Captain", role: "co" },
  });
  const cyberJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Cy", role: "cyber_officer" },
  });
  await api("/api/v1/join", {
    method: "POST",
    body: { name: "Ari", role: "air_officer" },
  });
  await api("/api/v1/join", {
    method: "POST",
    body: { name: "Nav", role: "naval_officer" },
  });
  await api("/api/v1/join", {
    method: "POST",
    body: { name: "Sub", role: "submarine_officer" },
  });

  const coSocket = connectSocket(coJoin.session_token);
  const cyberSocket = connectSocket(cyberJoin.session_token);
  await Promise.all([once(coSocket, "STATE_UPDATE"), once(cyberSocket, "STATE_UPDATE")]);

  const briefingReady = once(coSocket, "BRIEFING_READY", 15_000);
  await api("/api/v1/start_game_countdown", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
  });
  await briefingReady;

  await api("/api/v1/start_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
  });

  const emitAck = (socket, eventName, payload) =>
    new Promise((resolve, reject) => {
      socket.emit(eventName, payload, (response) => {
        if (!response?.ok) {
          reject(new Error(response?.error || `${eventName} failed`));
          return;
        }
        resolve(undefined);
      });
    });

  await emitAck(cyberSocket, "PLAY_CARD", { cardId: "C1" });
  await emitAck(cyberSocket, "PLAY_CARD", { cardId: "C2" });
  await emitAck(cyberSocket, "PLAY_CARD", { cardId: "C3" });

  let state = await api("/api/v1/state");
  assert.deepEqual(
    state.turn_data.active_cards
      .filter((entry) => entry.role === "cyber_officer")
      .map((entry) => entry.card_id)
      .sort(),
    ["C1", "C2", "C3"],
  );

  await emitAck(cyberSocket, "REMOVE_CARD", { cardId: "C2" });
  state = await api("/api/v1/state");
  assert.deepEqual(
    state.turn_data.active_cards
      .filter((entry) => entry.role === "cyber_officer")
      .map((entry) => entry.card_id)
      .sort(),
    ["C1", "C3"],
  );

  cyberSocket.close();
  coSocket.close();
  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "post-triple-cards-reset" },
  });
});

test("wrong card timer penalty scales with stress level", async () => {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });

  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "stress-penalty-room" },
  });

  await api("/api/v1/load_scenario", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { path: "./scenario_1.json" },
  });

  const coJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Captain", role: "co" },
  });
  const cyberJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Cy", role: "cyber_officer" },
  });
  const airJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Ari", role: "air_officer" },
  });
  const navalJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Nav", role: "naval_officer" },
  });
  const subJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Sub", role: "submarine_officer" },
  });

  const sockets = [
    connectSocket(coJoin.session_token),
    connectSocket(cyberJoin.session_token),
    connectSocket(airJoin.session_token),
    connectSocket(navalJoin.session_token),
    connectSocket(subJoin.session_token),
  ];

  await Promise.all(sockets.map((socket) => once(socket, "STATE_UPDATE")));

  const briefingReady = once(sockets[0], "BRIEFING_READY", 20_000);
  await api("/api/v1/start_game_countdown", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
  });
  await briefingReady;

  await api("/api/v1/start_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
  });

  const playCard = (socket, cardId) =>
    new Promise((resolve, reject) => {
      socket.emit("PLAY_CARD", { cardId }, (response) => {
        if (!response?.ok) {
          reject(new Error(response?.error || "Play failed"));
          return;
        }
        resolve(undefined);
      });
    });

  await Promise.all([
    playCard(sockets[1], "C1"),
    playCard(sockets[2], "A2"),
    playCard(sockets[3], "N3"),
  ]);

  await api("/api/v1/commit_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
    body: { card_ids: ["C1", "A2"] },
  });

  await once(sockets[0], "BRIEFING_READY", 20_000);

  let state = await api("/api/v1/state");
  assert.equal(state.game_metadata.current_turn, 2);
  assert.equal(state.game_metadata.stress_level, 1);
  assert.equal(state.turn_data.timer_remaining, 300);

  await api("/api/v1/start_turn", {
    method: "POST",
    headers: authHeaders(coJoin.session_token),
  });

  await playCard(sockets[1], "C5");

  state = await api("/api/v1/state");
  assert.equal(state.game_metadata.stress_level, 1);
  assert.equal(state.turn_data.timer_remaining, 285);

  sockets.forEach((socket) => socket.close());
  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminJoin.session_token),
    body: { room_code: "post-stress-penalty-reset" },
  });
});
