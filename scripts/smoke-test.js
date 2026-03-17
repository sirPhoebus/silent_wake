const { io } = require("socket.io-client");

const BASE = process.env.BASE_URL || "http://localhost:3000";

async function api(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };
  const body = options.body;
  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${path}`);
  }
  return data;
}

function authHeaders(token) {
  return {
    "x-session-token": token,
  };
}

function waitFor(socket, eventName, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timed out waiting for ${eventName}`));
    }, timeoutMs);

    socket.once(eventName, (payload) => {
      clearTimeout(timeout);
      resolve(payload);
    });
  });
}

function connectSocket(token) {
  return io(BASE, {
    auth: { token },
    transports: ["websocket"],
    forceNew: true,
    reconnection: false,
  });
}

async function main() {
  const adminJoin = await api("/api/v1/join", {
    method: "POST",
    body: { name: "Admin", role: "admin" },
  });
  const admin = adminJoin.player;
  const adminToken = adminJoin.session_token;

  await api("/api/v1/create_room", {
    method: "POST",
    headers: authHeaders(adminToken),
    body: { room_code: "alpha-room" },
  });

  await api("/api/v1/load_scenario", {
    method: "POST",
    headers: authHeaders(adminToken),
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

  const co = coJoin.player;
  const coToken = coJoin.session_token;
  const cyberToken = cyberJoin.session_token;
  const airToken = airJoin.session_token;
  const navalToken = navalJoin.session_token;
  const subToken = subJoin.session_token;

  const sockets = [
    connectSocket(adminToken),
    connectSocket(coToken),
    connectSocket(cyberToken),
    connectSocket(airToken),
    connectSocket(navalToken),
    connectSocket(subToken),
  ];

  await Promise.all(sockets.map((socket) => waitFor(socket, "STATE_UPDATE", 10000)));

  await api("/api/v1/start_game_countdown", {
    method: "POST",
    headers: authHeaders(adminToken),
  });

  await waitFor(sockets[1], "BRIEFING_READY", 15000);

  await api("/api/v1/start_turn", {
    method: "POST",
    headers: authHeaders(coToken),
  });

  const play = (socket, cardId) =>
    new Promise((resolve, reject) => {
      socket.emit("PLAY_CARD", { cardId }, (response) => {
        if (!response?.ok) {
          reject(new Error(response?.error || "Play failed"));
          return;
        }
        resolve();
      });
    });

  await Promise.all([
    play(sockets[2], "C1"),
    play(sockets[3], "A2"),
    play(sockets[4], "N3"),
    play(sockets[5], "S2"),
  ]);

  const resolvedPromise = waitFor(sockets[1], "TURN_RESOLVED", 10000);

  await api("/api/v1/commit_turn", {
    method: "POST",
    headers: authHeaders(coToken),
    body: { card_ids: ["C1", "A2", "N3"] },
  });

  const resolved = await resolvedPromise;
  const currentState = await api("/api/v1/state");

  let unauthorizedBlocked = false;
  try {
    await api("/api/v1/start_turn", {
      method: "POST",
      headers: authHeaders(adminToken),
    });
  } catch (error) {
    unauthorizedBlocked = /Chief Officer role required|role required/i.test(error.message);
  }

  sockets.forEach((socket) => socket.close());

  if (resolved.outcome !== "best") {
    throw new Error(`Expected best outcome, received ${resolved.outcome}`);
  }

  if (currentState.game_metadata.mission_score < 300) {
    throw new Error(`Unexpected score: ${currentState.game_metadata.mission_score}`);
  }

  if (!unauthorizedBlocked) {
    throw new Error("Expected unauthorized start_turn request to be blocked.");
  }

  process.stdout.write("Smoke test passed.\n");
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
