# Silent Wake

Silent Wake is a multiplayer naval command game with a Node.js + Socket.IO backend and an Angular 21 frontend. One player acts as `admin`, one as `co` (Chief Officer), and the remaining players act as officers who submit cards during timed turns.

## Stack

- Backend: Node.js, Express, Socket.IO
- Frontend: Angular 21, Three.js
- Persistence: PostgreSQL via `DATABASE_URL` when enabled
- Realtime: WebSockets for state sync, chat, card play, turn flow

## Roles

- `admin`: creates/resets rooms, uploads scenarios, starts countdowns
- `co`: starts turns and commits the final card set
- `cyber_officer`
- `air_officer`
- `naval_officer`
- `submarine_officer`

## Game Flow

Each run is a 10-turn scenario.

1. Players join the waiting room.
2. Admin uploads a scenario and starts the countdown.
3. Each turn enters `briefing`.
4. The CO starts the turn, moving the game into `action`.
5. Officers play up to 3 cards.
6. The CO commits the final answer, or the turn auto-resolves at timer expiry.
7. The game enters a 10-second `transition`.
8. After turn 10, the game enters `game_over`.

## Timer Rules

- Base turn time is determined by turn index in `server.js`.
- Wrong card plays reduce the current turn timer.
- That penalty now scales with stress: `10 + 5 * stress_level` seconds per wrong card.

## Scenarios

Sample scenarios are included:

- `short_scenario.json`
- `scenario_1.json`

The backend validates that a scenario:

- defines exactly 10 turns
- includes valid officer roles only
- provides mission metadata and turn card sets

## Local Development

Requirements:

- Node.js 20+ recommended
- npm
- PostgreSQL optional

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm start
```

The app starts on `http://localhost:3000` by default.

Important note:

- If `dist/silent-wake/browser` exists, the server serves the built Angular app from `dist`.
- Otherwise it falls back to `public/`.

So if you change Angular UI files under `src/`, rebuild before testing served output:

```bash
npm run build
```

## Scripts

```bash
npm start
npm run build
npm test
npm run smoke
```

## Environment Variables

- `PORT`: HTTP server port, default `3000`
- `DATABASE_URL`: enables PostgreSQL persistence when set
- `DEFAULT_SCENARIO_FILE`: default scenario file, default `short_scenario.json`
- `HTTP_RATE_LIMIT_MAX`: HTTP rate limit ceiling, default `180`

If `DATABASE_URL` is not set, the game still runs, but persistence is disabled.

## Docker

Run the full stack with Docker Compose:

```bash
docker compose up --build
```

This starts:

- `silent-wake-app`
- `silent-wake-postgres`

Default app URL:

- `http://localhost:3000`

Default Postgres connection:

- `postgres://silentwake:silentwake@localhost:5432/silentwake`

## Testing

Run the automated test suite:

```bash
npm test
```

This covers:

- health/scenario endpoints
- role restrictions
- countdown preconditions
- synchronized websocket turn flow
- multi-card arming/removal
- stress-scaled timer penalties

## Project Layout

```text
src/                  Angular source
public/               Static fallback frontend assets
dist/                 Built Angular output
server.js             Main backend + realtime game engine
lib/persistence.js    PostgreSQL persistence layer
tests/                Automated tests
scripts/              Smoke test utilities
```

## Current Notes

- Chat is realtime and the drawer handle pulses on unread activity.
- Officers can hot-swap cards during the action phase.
- The transition overlay shows a rotating historical military quote.
- The built client is not auto-regenerated; run `npm run build` after frontend changes.
