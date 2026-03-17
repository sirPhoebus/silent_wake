const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const express = require("express");
const multer = require("multer");
const { Server } = require("socket.io");

const { Persistence } = require("./lib/persistence");

const PORT = Number(process.env.PORT || 3000);
const TRANSITION_SECONDS = 10;
const DEFAULT_SCENARIO_FILE = process.env.DEFAULT_SCENARIO_FILE || "short_scenario.json";
const MAX_CHAT_HISTORY = 200;
const MAX_CHAT_MESSAGE_LENGTH = 400;
const MAX_NAME_LENGTH = 40;
const MAX_ROOM_CODE_LENGTH = 40;
const MAX_ACTIVE_CARDS_PER_PLAYER = 3;
const SYSTEM_KEYS = [
  "NAV_RADAR",
  "NAV_CONSOLE",
  "NAV_SENSORS",
  "ASUW_TRACKING",
  "COMMS",
  "AAW_RADAR",
];
const SYSTEM_STEPS = ["GREEN", "ORANGE", "RED"];
const VALID_ROLES = [
  "admin",
  "co",
  "cyber_officer",
  "air_officer",
  "naval_officer",
  "submarine_officer",
];
const SERVER_ROLE_LABELS = {
  admin: "Game Admin",
  co: "Chief Officer",
  cyber_officer: "Cyber Officer",
  air_officer: "Air Officer",
  naval_officer: "Naval Officer",
  submarine_officer: "Submarine Officer",
};
const HTTP_RATE_LIMITS = {
  windowMs: 60_000,
  max: Number(process.env.HTTP_RATE_LIMIT_MAX || 180),
};
const SOCKET_RATE_LIMITS = {
  PLAY_CARD: { windowMs: 10_000, max: 20 },
  REMOVE_CARD: { windowMs: 10_000, max: 20 },
  CHAT_MESSAGE: { windowMs: 60_000, max: 30 },
};
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
});

function roleLabel(role) {
  return SERVER_ROLE_LABELS[role] || role;
}

function normalizeString(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function generateToken() {
  return crypto.randomBytes(24).toString("hex");
}

function loadScenarioFromDisk(filePath) {
  const absolutePath = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function getTurnDurationSeconds(turnIndex) {
  if (turnIndex <= 5) {
    return 300;
  }
  if (turnIndex === 6) {
    return 240;
  }
  if (turnIndex === 7 || turnIndex === 8) {
    return 210;
  }
  if (turnIndex === 9) {
    return 190;
  }
  return 180;
}

function getStressScaledTimerPenalty(stressLevel) {
  return 10 + Math.max(0, stressLevel) * 5;
}

function createBaseSystems() {
  return {
    NAV_RADAR: "GREEN",
    NAV_CONSOLE: "GREEN",
    NAV_SENSORS: "GREEN",
    ASUW_TRACKING: "GREEN",
    COMMS: "GREEN",
    AAW_RADAR: "GREEN",
  };
}

function nextStatus(current, target) {
  const currentIndex = SYSTEM_STEPS.indexOf(current);
  const targetIndex = SYSTEM_STEPS.indexOf(target);
  if (currentIndex === -1 || targetIndex === -1 || currentIndex >= targetIndex) {
    return current;
  }
  return SYSTEM_STEPS[Math.min(currentIndex + 1, targetIndex)];
}

function validateScenario(scenario) {
  if (!scenario || typeof scenario !== "object") {
    throw new Error("Scenario must be an object.");
  }
  if (!scenario.mission_metadata || typeof scenario.mission_metadata !== "object") {
    throw new Error("Scenario mission_metadata is required.");
  }
  if (!Array.isArray(scenario.roles) || scenario.roles.length === 0) {
    throw new Error("Scenario roles must be a non-empty array.");
  }
  if (!Array.isArray(scenario.turns) || scenario.turns.length !== 10) {
    throw new Error("Scenario must define exactly 10 turns.");
  }

  const roleSet = new Set(scenario.roles);
  for (const role of roleSet) {
    if (!VALID_ROLES.includes(role) || role === "admin" || role === "co") {
      throw new Error(`Invalid scenario role: ${role}`);
    }
  }

  const seenTurnIndexes = new Set();
  const allCardIds = new Set();
  for (const turn of scenario.turns) {
    if (!Number.isInteger(turn.turn_index) || turn.turn_index < 1 || turn.turn_index > 10) {
      throw new Error("Each turn must have an integer turn_index from 1 to 10.");
    }
    if (seenTurnIndexes.has(turn.turn_index)) {
      throw new Error(`Duplicate turn_index: ${turn.turn_index}`);
    }
    seenTurnIndexes.add(turn.turn_index);

    if (!turn.title || !turn.context || !turn.resolution || !turn.cards) {
      throw new Error(`Turn ${turn.turn_index} is missing required fields.`);
    }

    for (const role of roleSet) {
      if (!Array.isArray(turn.cards[role]) || turn.cards[role].length === 0) {
        throw new Error(`Turn ${turn.turn_index} is missing cards for role ${role}.`);
      }
      for (const card of turn.cards[role]) {
        if (!card.id || !card.name || !card.desc) {
          throw new Error(`Turn ${turn.turn_index} contains an invalid card for role ${role}.`);
        }
        if (allCardIds.has(card.id)) {
          throw new Error(`Duplicate card id detected: ${card.id}`);
        }
        allCardIds.add(card.id);
      }
    }

    if (!Array.isArray(turn.resolution.best_cards) || turn.resolution.best_cards.length === 0) {
      throw new Error(`Turn ${turn.turn_index} must define best_cards.`);
    }
    for (const cardId of turn.resolution.best_cards) {
      if (!allCardIds.has(cardId)) {
        throw new Error(`Turn ${turn.turn_index} references missing best card ${cardId}.`);
      }
    }

    if (
      turn.resolution.fail_system !== "GLOBAL" &&
      !SYSTEM_KEYS.includes(turn.resolution.fail_system)
    ) {
      throw new Error(`Turn ${turn.turn_index} has invalid fail_system.`);
    }
    if (!SYSTEM_STEPS.includes(turn.resolution.fail_status)) {
      throw new Error(`Turn ${turn.turn_index} has invalid fail_status.`);
    }
  }

  for (let turnIndex = 1; turnIndex <= 10; turnIndex += 1) {
    if (!seenTurnIndexes.has(turnIndex)) {
      throw new Error(`Scenario is missing turn ${turnIndex}.`);
    }
  }
}

function buildCardIndex(scenario) {
  const byTurn = {};
  for (const turn of scenario.turns) {
    const cardMap = new Map();
    for (const [role, cards] of Object.entries(turn.cards)) {
      for (const card of cards) {
        cardMap.set(card.id, { ...card, role });
      }
    }
    byTurn[turn.turn_index] = cardMap;
  }
  return byTurn;
}

function summarizeTurn(turn, cardMap, playedCards, committedIds) {
  return {
    title: turn.title,
    context: turn.context,
    played_cards: playedCards.map((entry) => ({
      ...entry,
      card: cardMap.get(entry.card_id) || null,
    })),
    committed_cards: committedIds.map((id) => cardMap.get(id)).filter(Boolean),
  };
}

function createGameState(scenario, options = {}) {
  validateScenario(scenario);
  return {
    run_id: generateToken(),
    scenario,
    scenario_version: generateToken(),
    card_index: buildCardIndex(scenario),
    room: {
      code: "alpha-room",
      startCountdownEndsAt: null,
      hasStarted: false,
    },
    players: [],
    chat: [],
    systems: createBaseSystems(),
    game_metadata: {
      current_turn: 1,
      mission_score: 0,
      stress_level: 0,
      tide_window_minutes: 30,
      is_paused: true,
      phase: "waiting_room",
      final_rating: null,
      scenario_uploaded: Boolean(options.scenarioUploaded),
    },
    turn_data: {
      active_cards: [],
      timer_remaining: getTurnDurationSeconds(1),
      committed_cards: [],
      current_briefing_acknowledged: false,
      briefing_started_at: null,
    },
    turn_history: [],
    selections: {},
    transition_remaining: TRANSITION_SECONDS,
  };
}

function serializeGame(game) {
  return {
    run_id: game.run_id,
    scenario: game.scenario,
    scenario_version: game.scenario_version,
    room: game.room,
    players: game.players,
    chat: game.chat,
    systems: game.systems,
    game_metadata: game.game_metadata,
    turn_data: game.turn_data,
    turn_history: game.turn_history,
    selections: game.selections,
    transition_remaining: game.transition_remaining,
  };
}

function hydrateGame(rawGame) {
  validateScenario(rawGame.scenario);
  return {
    run_id: rawGame.run_id || generateToken(),
    scenario: rawGame.scenario,
    scenario_version: rawGame.scenario_version || generateToken(),
    card_index: buildCardIndex(rawGame.scenario),
    room: rawGame.room || { code: "alpha-room", startCountdownEndsAt: null, hasStarted: false },
    players: Array.isArray(rawGame.players) ? rawGame.players : [],
    chat: Array.isArray(rawGame.chat) ? rawGame.chat : [],
    systems: rawGame.systems || createBaseSystems(),
    game_metadata: {
      ...rawGame.game_metadata,
      scenario_uploaded: Boolean(rawGame.game_metadata?.scenario_uploaded),
    },
    turn_data: rawGame.turn_data,
    turn_history: Array.isArray(rawGame.turn_history) ? rawGame.turn_history : [],
    selections: rawGame.selections || {},
    transition_remaining:
      typeof rawGame.transition_remaining === "number"
        ? rawGame.transition_remaining
        : TRANSITION_SECONDS,
  };
}

function createWindowLimiter() {
  const buckets = new Map();
  return function consume(key, windowMs, max) {
    const now = Date.now();
    const current = buckets.get(key);
    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (current.count >= max) {
      return false;
    }
    current.count += 1;
    return true;
  };
}

function background(task) {
  task.catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
  });
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});
const persistence = new Persistence({
  connectionString: process.env.DATABASE_URL,
});
const httpRateConsume = createWindowLimiter();
const socketRateConsume = createWindowLimiter();

let game = createGameState(loadScenarioFromDisk(path.join(__dirname, DEFAULT_SCENARIO_FILE)));
let actionInterval = null;
let transitionInterval = null;
let countdownTimeout = null;
let nextPlayerId = 1;
let runtimeSaveTimeout = null;

function assert(condition, message, statusCode = 400) {
  if (!condition) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
}

function safeIpFromRequest(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "";
}

function findPlayer(playerId) {
  return game.players.find((player) => player.id === Number(playerId));
}

function findPlayerByToken(token) {
  return game.players.find((player) => player.token === token);
}

function sanitizePlayer(player) {
  return {
    id: player.id,
    name: player.name,
    role: player.role,
    socketId: player.socketId,
    connected: Boolean(player.socketId),
  };
}

function getCurrentTurn() {
  return game.scenario.turns.find((turn) => turn.turn_index === game.game_metadata.current_turn);
}

function getCurrentCardMap() {
  return game.card_index[game.game_metadata.current_turn] || new Map();
}

function publicScenario() {
  return {
    mission_metadata: game.scenario.mission_metadata,
    roles: game.scenario.roles,
    turns: game.scenario.turns,
    version: game.scenario_version,
  };
}

function buildClientState() {
  const turn = getCurrentTurn();
  return {
    room: game.room,
    systems: game.systems,
    players: game.players.map((player) => sanitizePlayer(player)),
    chat: game.chat.slice(-50),
    game_metadata: game.game_metadata,
    turn_data: {
      ...game.turn_data,
      turn_title: turn?.title || null,
      turn_context: turn?.context || null,
    },
    turn_history: game.turn_history,
    scenario_meta: game.scenario.mission_metadata,
    scenario_version: game.scenario_version,
    transition_remaining: game.transition_remaining,
  };
}

function scheduleRuntimeSave() {
  if (runtimeSaveTimeout) {
    clearTimeout(runtimeSaveTimeout);
  }
  runtimeSaveTimeout = setTimeout(() => {
    runtimeSaveTimeout = null;
    background(persistence.saveRuntimeState(serializeGame(game)));
    background(persistence.upsertScenario(game.scenario_version, game.scenario));
    background(persistence.upsertGameRun(game));
  }, 150);
}

function audit(eventType, actor, ipAddress, details = {}) {
  const entry = {
    at: new Date().toISOString(),
    event_type: eventType,
    actor_player_id: actor?.id || null,
    actor_role: actor?.role || null,
    ip_address: ipAddress || null,
    details,
  };
  process.stdout.write(`${JSON.stringify({ audit: entry })}\n`);
  background(
    persistence.insertAuditLog({
      actor_player_id: entry.actor_player_id,
      actor_role: entry.actor_role,
      event_type: entry.event_type,
      ip_address: entry.ip_address,
      details: entry.details,
    }),
  );
}

function emitState() {
  io.emit("STATE_UPDATE", buildClientState());
  scheduleRuntimeSave();
}

function emitRoster() {
  io.emit("PLAYER_LIST", game.players.map((player) => sanitizePlayer(player)));
}

function emitScenarioUpdated() {
  io.emit("SCENARIO_UPDATED", publicScenario());
}

function stopActionTimer() {
  if (actionInterval) {
    clearInterval(actionInterval);
    actionInterval = null;
  }
}

function stopTransitionTimer() {
  if (transitionInterval) {
    clearInterval(transitionInterval);
    transitionInterval = null;
  }
}

function stopCountdown() {
  if (countdownTimeout) {
    clearTimeout(countdownTimeout);
    countdownTimeout = null;
  }
}

function resetTurnState(turnIndex) {
  game.game_metadata.current_turn = turnIndex;
  game.game_metadata.is_paused = true;
  game.game_metadata.phase = "briefing";
  game.turn_data.active_cards = [];
  game.turn_data.committed_cards = [];
  game.turn_data.current_briefing_acknowledged = false;
  game.turn_data.briefing_started_at = Date.now();
  game.turn_data.timer_remaining = getTurnDurationSeconds(turnIndex);
  game.selections = {};
  game.transition_remaining = TRANSITION_SECONDS;
}

function beginBriefing(turnIndex) {
  stopActionTimer();
  stopTransitionTimer();
  resetTurnState(turnIndex);
  io.emit("BRIEFING_READY", {
    turn_index: turnIndex,
    turn: getCurrentTurn(),
  });
  emitState();
}

function finishGame() {
  stopActionTimer();
  stopTransitionTimer();
  game.game_metadata.phase = "game_over";
  game.game_metadata.is_paused = true;
  const score = game.game_metadata.mission_score;
  game.game_metadata.final_rating =
    score >= 3000 ? "Mission Accomplished" : score >= 1800 ? "Pyrrhic Victory" : "Mission Failed";
  io.emit("GAME_OVER", buildClientState());
  emitState();
}

function startTransition() {
  stopActionTimer();
  game.game_metadata.phase = "transition";
  game.game_metadata.is_paused = true;
  game.transition_remaining = TRANSITION_SECONDS;
  emitState();
  transitionInterval = setInterval(() => {
    game.transition_remaining -= 1;
    io.emit("NEXT_TURN_IN_X", { remaining: game.transition_remaining });
    emitState();

    if (game.transition_remaining <= 0) {
      stopTransitionTimer();
      if (game.game_metadata.current_turn >= game.scenario.turns.length) {
        finishGame();
      } else {
        beginBriefing(game.game_metadata.current_turn + 1);
      }
    }
  }, 1000);
}

function degradeSystem(failSystem, failStatus) {
  if (failSystem === "GLOBAL") {
    for (const key of SYSTEM_KEYS) {
      game.systems[key] = nextStatus(game.systems[key], failStatus);
    }
    return;
  }
  if (SYSTEM_KEYS.includes(failSystem)) {
    game.systems[failSystem] = nextStatus(game.systems[failSystem], failStatus);
  }
}

function resolveTurn(committedIds, autoCommit = false) {
  const turn = getCurrentTurn();
  const cardMap = getCurrentCardMap();
  const bestSet = new Set(turn.resolution.best_cards);
  const committedSet = new Set(committedIds);
  const matched = [...committedSet].filter((id) => bestSet.has(id));
  const badCards = [...committedSet].filter((id) => !bestSet.has(id));
  const missed = turn.resolution.best_cards.filter((id) => !committedSet.has(id));
  const fullyMatched = missed.length === 0 && badCards.length === 0;
  const acceptable =
    !fullyMatched &&
    matched.length >= Math.ceil(turn.resolution.best_cards.length / 2) &&
    badCards.length === 0;
  const scoring = game.scenario.mission_metadata.global_scoring;

  let delta = matched.length * scoring.best_match + badCards.length * scoring.bad_match_penalty;
  if (acceptable) {
    delta += scoring.acceptable_match;
  }

  game.game_metadata.mission_score += delta;
  game.game_metadata.stress_level = Math.min(
    10,
    Math.max(
    0,
    game.game_metadata.stress_level + (fullyMatched ? 0 : acceptable ? 1 : 2),
    ),
  );
  game.game_metadata.tide_window_minutes = Math.max(0, game.game_metadata.tide_window_minutes - 3);

  if (!fullyMatched) {
    degradeSystem(turn.resolution.fail_system, turn.resolution.fail_status);
  }

  const playedCards = [...game.turn_data.active_cards];
  game.turn_data.committed_cards = [...committedSet];
  const turnEntry = {
    turn_index: turn.turn_index,
    outcome: fullyMatched ? "best" : acceptable ? "acceptable" : "fail",
    score_delta: delta,
    matched,
    missed,
    bad_cards: badCards,
    auto_commit: autoCommit,
    systems: { ...game.systems },
    summary: summarizeTurn(turn, cardMap, playedCards, [...committedSet]),
  };
  game.turn_history.push(turnEntry);

  background(persistence.upsertTurnHistory(game.run_id, turnEntry));
  io.emit("TURN_RESOLVED", turnEntry);
  emitState();
  startTransition();
}

function beginActionPhase() {
  const turn = getCurrentTurn();
  assert(turn, "No active turn is available.");

  stopActionTimer();
  game.game_metadata.phase = "action";
  game.game_metadata.is_paused = false;
  game.turn_data.current_briefing_acknowledged = true;
  io.emit("START_TURN", {
    turn_index: turn.turn_index,
    duration: game.turn_data.timer_remaining,
  });
  emitState();

  actionInterval = setInterval(() => {
    game.turn_data.timer_remaining = Math.max(0, game.turn_data.timer_remaining - 1);
    emitState();

    if (game.turn_data.timer_remaining <= 0) {
      stopActionTimer();
      resolveTurn(game.turn_data.committed_cards, true);
    }
  }, 1000);
}

function replaceGameState(nextScenario, options = {}) {
  const preservedPlayers = options.preservePlayers ? game.players.map((player) => ({ ...player })) : [];
  const nextGame = createGameState(nextScenario, {
    scenarioUploaded: options.scenarioUploaded ?? game.game_metadata.scenario_uploaded,
  });
  nextGame.players = preservedPlayers;
  nextGame.room.code = options.roomCode || game.room.code;
  game = nextGame;
}

function requireSession(req) {
  const token = normalizeString(req.header("x-session-token"), 128);
  assert(token, "Session token is required.", 401);
  const player = findPlayerByToken(token);
  assert(player, "Session is invalid or expired.", 401);
  return player;
}

function requireRole(req, role) {
  const player = requireSession(req);
  assert(player.role === role, `${roleLabel(role)} role required.`, 403);
  return player;
}

function requireSocketPlayer(socket) {
  const token = normalizeString(socket.handshake.auth?.token, 128);
  assert(token, "Socket session token is required.", 401);
  const player = findPlayerByToken(token);
  assert(player, "Socket session is invalid or expired.", 401);
  return player;
}

function ensureReadyToStart() {
  const missingRoles = ["admin", "co", ...game.scenario.roles].filter(
    (role) => !game.players.some((player) => player.role === role),
  );
  assert(missingRoles.length === 0, `Missing required roles: ${missingRoles.join(", ")}`, 400);
}

function validateCommittedCards(cardIds) {
  const uniqueIds = [...new Set(cardIds.map((id) => String(id)))];
  const activeCardIds = new Set(game.turn_data.active_cards.map((entry) => entry.card_id));
  for (const id of uniqueIds) {
    assert(activeCardIds.has(id), `Card ${id} is not currently in the played pool.`, 400);
  }
  return uniqueIds;
}

function sendSocketError(socket, message) {
  socket.emit("SERVER_ERROR", { message });
}

function enforceHttpRateLimit(req, res, next) {
  const key = `${safeIpFromRequest(req)}:${req.method}:${req.path}`;
  if (!httpRateConsume(key, HTTP_RATE_LIMITS.windowMs, HTTP_RATE_LIMITS.max)) {
    res.status(429).json({ error: "Too many requests." });
    return;
  }
  next();
}

function enforceSocketRateLimit(socket, eventName) {
  const config = SOCKET_RATE_LIMITS[eventName];
  if (!config) {
    return true;
  }
  return socketRateConsume(`${socket.data.playerId}:${eventName}`, config.windowMs, config.max);
}

app.set("trust proxy", true);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use(express.json({ limit: "1mb" }));
app.use(enforceHttpRateLimit);

app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    phase: game.game_metadata.phase,
    persistence: persistence.enabled,
  });
});

app.get("/api/v1/state", (req, res) => {
  res.json(buildClientState());
});

app.get("/api/v1/scenario", (req, res) => {
  res.json(publicScenario());
});

app.post("/api/v1/join", (req, res, next) => {
  try {
    const name = normalizeString(req.body?.name, MAX_NAME_LENGTH);
    const role = normalizeString(req.body?.role, 64);
    assert(name, "Name is required.");
    assert(role && VALID_ROLES.includes(role), "A valid role is required.");
    assert(
      role === "admin" || role === "co" || game.scenario.roles.includes(role),
      `${roleLabel(role)} is not enabled in this scenario.`,
    );
    assert(
      game.game_metadata.phase === "waiting_room" || game.game_metadata.phase === "briefing",
      "Joining is closed after the match is underway.",
      409,
    );

    const existing = game.players.find(
      (player) => player.name.toLowerCase() === name.toLowerCase() && player.role === role,
    );
    if (existing) {
      audit("session.resume_existing", existing, safeIpFromRequest(req), { role });
      return res.json({
        ok: true,
        player: sanitizePlayer(existing),
        session_token: existing.token,
      });
    }

    const roleTaken = game.players.find((player) => player.role === role);
    assert(!roleTaken, `${roleLabel(role)} is already assigned.`, 409);

    const player = {
      id: nextPlayerId,
      name,
      role,
      token: generateToken(),
      socketId: null,
    };
    nextPlayerId += 1;
    game.players.push(player);
    background(persistence.upsertPlayer(player));
    audit("player.joined", player, safeIpFromRequest(req), { room_code: game.room.code });
    emitRoster();
    emitState();
    res.json({
      ok: true,
      player: sanitizePlayer(player),
      session_token: player.token,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/resume_session", (req, res, next) => {
  try {
    const player = requireSession(req);
    res.json({ ok: true, player: sanitizePlayer(player) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/create_room", (req, res, next) => {
  try {
    const admin = requireRole(req, "admin");
    const roomCode = normalizeString(req.body?.room_code || "alpha-room", MAX_ROOM_CODE_LENGTH) || "alpha-room";
    replaceGameState(game.scenario, {
      preservePlayers: true,
      roomCode,
      scenarioUploaded: game.game_metadata.scenario_uploaded,
    });
    stopCountdown();
    stopActionTimer();
    stopTransitionTimer();
    audit("room.reset", admin, safeIpFromRequest(req), { room_code: roomCode });
    emitRoster();
    emitState();
    res.json({ ok: true, room_code: roomCode });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/load_scenario", upload.single("scenario"), (req, res, next) => {
  try {
    const admin = requireRole(req, "admin");
    let parsed;
    if (req.file) {
      parsed = JSON.parse(req.file.buffer.toString("utf8"));
    } else if (req.body?.scenario) {
      parsed = typeof req.body.scenario === "string" ? JSON.parse(req.body.scenario) : req.body.scenario;
    } else if (req.body?.path) {
      parsed = loadScenarioFromDisk(req.body.path);
    } else {
      assert(false, "No scenario payload provided.");
    }

    replaceGameState(parsed, {
      preservePlayers: true,
      scenarioUploaded: true,
    });
    stopCountdown();
    stopActionTimer();
    stopTransitionTimer();
    audit("scenario.loaded", admin, safeIpFromRequest(req), {
      title: parsed.mission_metadata.title,
      turn_count: parsed.turns.length,
    });
    emitRoster();
    emitScenarioUpdated();
    emitState();
    res.json({ ok: true, turns: parsed.turns.length, version: game.scenario_version });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/start_game_countdown", (req, res, next) => {
  try {
    const admin = requireRole(req, "admin");
    assert(game.game_metadata.phase === "waiting_room", "Countdown can only start from the waiting room.");
    assert(game.game_metadata.scenario_uploaded, "Upload a scenario before starting the countdown.");
    ensureReadyToStart();

    stopCountdown();
    game.room.startCountdownEndsAt = Date.now() + 10_000;
    io.emit("GAME_START_COUNTDOWN", { remaining: 10 });
    audit("game.countdown_started", admin, safeIpFromRequest(req), {
      room_code: game.room.code,
      run_id: game.run_id,
    });
    emitState();

    let remaining = 10;
    const tick = () => {
      remaining -= 1;
      if (remaining > 0) {
        io.emit("GAME_START_COUNTDOWN", { remaining });
        emitState();
        countdownTimeout = setTimeout(tick, 1000);
        return;
      }

      game.room.hasStarted = true;
      game.room.startCountdownEndsAt = null;
      game.game_metadata.phase = "briefing";
      game.game_metadata.current_turn = 1;
      game.game_metadata.is_paused = true;
      game.turn_data.timer_remaining = getTurnDurationSeconds(1);
      io.emit("GAME_START", buildClientState());
      beginBriefing(1);
    };

    countdownTimeout = setTimeout(tick, 1000);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/start_turn", (req, res, next) => {
  try {
    const co = requireRole(req, "co");
    assert(game.room.hasStarted, "Game has not started yet.");
    assert(game.game_metadata.phase === "briefing", "Turn is not in briefing.");
    audit("turn.started", co, safeIpFromRequest(req), {
      run_id: game.run_id,
      turn_index: game.game_metadata.current_turn,
    });
    beginActionPhase();
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/commit_turn", (req, res, next) => {
  try {
    const co = requireRole(req, "co");
    assert(game.game_metadata.phase === "action", "Turn is not active.");
    const committedIds = validateCommittedCards(Array.isArray(req.body?.card_ids) ? req.body.card_ids : []);
    audit("turn.committed", co, safeIpFromRequest(req), {
      run_id: game.run_id,
      turn_index: game.game_metadata.current_turn,
      card_ids: committedIds,
    });
    resolveTurn(committedIds, false);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

io.use((socket, next) => {
  try {
    const player = requireSocketPlayer(socket);
    socket.data.playerId = player.id;
    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  const player = findPlayer(socket.data.playerId);
  if (!player) {
    socket.disconnect(true);
    return;
  }

  player.socketId = socket.id;
  background(persistence.upsertPlayer(player));
  audit("socket.connected", player, socket.handshake.address, { socket_id: socket.id });
  socket.emit("STATE_UPDATE", buildClientState());
  socket.emit("SCENARIO_UPDATED", publicScenario());
  emitRoster();
  emitState();

  socket.on("PLAY_CARD", (payload = {}, ack) => {
    try {
      assert(enforceSocketRateLimit(socket, "PLAY_CARD"), "Too many play-card actions.", 429);
      const actingPlayer = findPlayer(socket.data.playerId);
      assert(actingPlayer, "Player not found.", 404);
      assert(game.game_metadata.phase === "action", "Cards can only be played during the action phase.");
      assert(!["admin", "co"].includes(actingPlayer.role), "This role cannot play cards.", 403);
      const cardId = normalizeString(payload.cardId, 64);
      assert(cardId, "cardId is required.");

      const turn = getCurrentTurn();
      const roleCards = turn.cards[actingPlayer.role] || [];
      const card = roleCards.find((entry) => entry.id === cardId);
      assert(card, `Card ${cardId} is not valid for ${roleLabel(actingPlayer.role)}.`, 400);
      const playerActiveCards = game.turn_data.active_cards.filter((entry) => entry.player_id === actingPlayer.id);
      if (playerActiveCards.some((entry) => entry.card_id === card.id)) {
        if (typeof ack === "function") {
          ack({ ok: true });
        }
        return;
      }
      assert(playerActiveCards.length < MAX_ACTIVE_CARDS_PER_PLAYER, `You can arm up to ${MAX_ACTIVE_CARDS_PER_PLAYER} cards.`, 400);

      const active = {
        player_id: actingPlayer.id,
        player_name: actingPlayer.name,
        role: actingPlayer.role,
        card_id: card.id,
        played_at: Date.now(),
      };
      game.turn_data.active_cards.push(active);
      game.selections[actingPlayer.role] = game.turn_data.active_cards
        .filter((entry) => entry.player_id === actingPlayer.id)
        .map((entry) => entry.card_id);
      if (!turn.resolution.best_cards.includes(card.id)) {
        game.turn_data.timer_remaining = Math.max(
          0,
          game.turn_data.timer_remaining - getStressScaledTimerPenalty(game.game_metadata.stress_level),
        );
      }

      audit("card.played", actingPlayer, socket.handshake.address, {
        run_id: game.run_id,
        turn_index: game.game_metadata.current_turn,
        card_id: card.id,
      });
      io.emit("CARD_PLAYED", active);
      emitState();
      if (typeof ack === "function") {
        ack({ ok: true });
      }
    } catch (error) {
      if (typeof ack === "function") {
        ack({ ok: false, error: error.message });
      } else {
        sendSocketError(socket, error.message);
      }
    }
  });

  socket.on("REMOVE_CARD", (payload, ack) => {
    try {
      assert(enforceSocketRateLimit(socket, "REMOVE_CARD"), "Too many remove-card actions.", 429);
      const actingPlayer = findPlayer(socket.data.playerId);
      assert(actingPlayer, "Player not found.", 404);
      assert(game.game_metadata.phase === "action", "Cards can only be removed during the action phase.");
      const cardId = normalizeString(payload?.cardId, 64);
      game.turn_data.active_cards = game.turn_data.active_cards.filter((entry) => {
        if (entry.player_id !== actingPlayer.id) {
          return true;
        }
        return cardId ? entry.card_id !== cardId : false;
      });
      const remainingCards = game.turn_data.active_cards
        .filter((entry) => entry.player_id === actingPlayer.id)
        .map((entry) => entry.card_id);
      if (remainingCards.length > 0) {
        game.selections[actingPlayer.role] = remainingCards;
      } else {
        delete game.selections[actingPlayer.role];
      }
      audit("card.removed", actingPlayer, socket.handshake.address, {
        run_id: game.run_id,
        turn_index: game.game_metadata.current_turn,
        card_id: cardId || null,
      });
      emitState();
      if (typeof ack === "function") {
        ack({ ok: true });
      }
    } catch (error) {
      if (typeof ack === "function") {
        ack({ ok: false, error: error.message });
      } else {
        sendSocketError(socket, error.message);
      }
    }
  });

  socket.on("CHAT_MESSAGE", (payload = {}, ack) => {
    try {
      assert(enforceSocketRateLimit(socket, "CHAT_MESSAGE"), "Too many chat messages.", 429);
      const actingPlayer = findPlayer(socket.data.playerId);
      assert(actingPlayer, "Player not found.", 404);
      const text = normalizeString(payload.text, MAX_CHAT_MESSAGE_LENGTH);
      assert(text, "Message is empty.");

      const chatEntry = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        player_id: actingPlayer.id,
        player_name: actingPlayer.name,
        role: actingPlayer.role,
        text,
        sent_at: Date.now(),
      };
      game.chat.push(chatEntry);
      game.chat = game.chat.slice(-MAX_CHAT_HISTORY);
      background(persistence.insertChatMessage(game.run_id, chatEntry));
      audit("chat.sent", actingPlayer, socket.handshake.address, {
        run_id: game.run_id,
        message_id: chatEntry.id,
      });
      io.emit("CHAT_MESSAGE", chatEntry);
      emitState();
      if (typeof ack === "function") {
        ack({ ok: true });
      }
    } catch (error) {
      if (typeof ack === "function") {
        ack({ ok: false, error: error.message });
      } else {
        sendSocketError(socket, error.message);
      }
    }
  });

  socket.on("disconnect", () => {
    const disconnectedPlayer = findPlayer(socket.data.playerId);
    if (disconnectedPlayer && disconnectedPlayer.socketId === socket.id) {
      disconnectedPlayer.socketId = null;
      background(persistence.upsertPlayer(disconnectedPlayer));
      audit("socket.disconnected", disconnectedPlayer, socket.handshake.address, {
        socket_id: socket.id,
      });
      emitRoster();
      emitState();
    }
  });
});

const browserDist = path.join(__dirname, "dist", "silent-wake", "browser");
const staticDir = fs.existsSync(browserDist) ? browserDist : path.join(__dirname, "public");
app.use(express.static(staticDir));
app.get(/^\/(?!api\/|socket\.io\/|healthz$).*/, (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  if (!error.statusCode || error.statusCode >= 500) {
    process.stderr.write(`${error.stack || error.message}\n`);
  }
  res.status(error.statusCode || 500).json({
    error: error.statusCode && error.statusCode < 500 ? error.message : "Internal server error.",
  });
});

async function bootstrap() {
  await persistence.init();
  const stored = await persistence.loadRuntimeState();
  if (stored) {
    game = hydrateGame(stored);
    nextPlayerId = Math.max(0, ...game.players.map((player) => player.id)) + 1;
  } else {
    await persistence.upsertScenario(game.scenario_version, game.scenario);
    await persistence.upsertGameRun(game);
    await persistence.saveRuntimeState(serializeGame(game));
  }

  const listeningServer = server.listen(PORT, () => {
    process.stdout.write(`Silent Wake listening on http://localhost:${PORT}\n`);
  });

  const shutdown = async () => {
    stopCountdown();
    stopActionTimer();
    stopTransitionTimer();
    if (runtimeSaveTimeout) {
      clearTimeout(runtimeSaveTimeout);
      runtimeSaveTimeout = null;
    }
    try {
      await persistence.saveRuntimeState(serializeGame(game));
      await persistence.upsertGameRun(game);
      await persistence.close();
    } finally {
      listeningServer.close(() => process.exit(0));
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
