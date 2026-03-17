## Game Specification: Silent Wake

### 1. Core Game Loop & Temporal Logic
**Silent Wake** is a turn-based card game spanning **10 turns**. Each turn consists of a Briefing Phase, an Action Phase (timed), and a Transition Phase.

#### Variable Turn Duration (Stress Scaling)
The base time for a turn is 5 minutes, but it decays based on the turn index and player performance.
* **Turns 0–5:** 300s (5 min). *Penalty:* Each "Bad Solution" card played subtracts 10s from the remaining time in that specific turn.
* **Turn 6:** 240s (4 min)
* **Turn 7:** 210s (3.5 min)
* **Turn 8:** 210s (3.5 min)
* **Turn 9:** 190s (3.1 min)
* **Turn 10:** 180s (3 min)

#### Turn Lifecycle
1.  **Briefing:** Modal window displays context. Timer is paused.
2.  **Action:** Upon "OK" click, the WebSocket broadcasts `START_TURN`; the countdown begins.
3.  **Resolution:** Timer hits 0 or CO commits.
4.  **Transition:** 10s cooldown with a 60% black opacity overlay and `NEXT_TURN_IN_X` countdown.

---

### 2. System Architecture & State
The Global State must be synchronized across all clients via WebSockets.

#### Global State Schema
```json
{
  "systems": {
    "NAV_RADAR": "GREEN", 
    "NAV_CONSOLE": "GREEN",
    "NAV_SENSORS": "GREEN",
    "ASUW_TRACKING": "GREEN",
    "COMMS": "GREEN",
    "AAW_RADAR": "GREEN"
  },
  "game_metadata": {
    "current_turn": 1,
    "mission_score": 0,
    "stress_level": 0,
    "tide_window_minutes": 30,
    "is_paused": false
  },
  "turn_data": {
    "active_cards": [],
    "timer_remaining": 300
  }
}
```
* **System Status Levels:** `GREEN`, `ORANGE`, `RED`.

---

### 3. Role-Based Views & Logic

#### A. Chief Officer (CO) View
* **Manual Trigger:** Must manually initiate Turn 1.
* **Real-time Oversight:** Receives `CARD_PLAYED` events via WebSocket including `player_name` and `card_id`.
* **Selection Logic:** The CO selects specific cards from the pool of played cards to form the **Final Answer**.
* **Commit Authority:** Exclusive access to the `POST /api/v1/commit_turn` endpoint.
* **Engine Calculation:** Upon commit, the engine evaluates cards against "Best/Acceptable/Fail" logic to update `system_status` and `mission_score`.

#### B. Officer View
* **Zoned Interface:** UI is segmented based on the specific Officer role assigned.
* **Card Interaction:** * Click "Play" (Bottom-right of card).
    * Card migrates to a **Visual Placeholder**.
    * **Hot-Swapping:** Players can remove or switch cards within the placeholder as long as the timer is active.
* **UI Sync:** Displays the global Stress Level and Timer at the top of the dashboard.

#### C. Game Admin View
* **Scenario Management:** Upload/Load JSON scenario files.
* **Session Control:** Create Waiting Rooms and trigger the global 10s game start countdown.

#### D. Waiting Room
* **Connectivity:** Real-time list of joined players.
* **Communication:** Integrated Chat module.
* **Redirection:** Upon game start, the server pushes a `GAME_START` event, redirecting clients to their respective role-based routes.

---

### 4. Technical Stack Requirements
* **Backend:** Python (FastAPI/Flask) or Node.js (Express) implementing a Finite State Machine (FSM).
* **Database:** PostgreSQL (for scenario persistence and historical scoring).
* **Frontend:** **Angular 21**. 
    * **Graphics:** Three.js for 3D card animations and environmental "stress" effects.
    * **Styling:** Implementation of `card.html` blueprints.
* **Communication:** **WebSockets (Socket.io or WS)** for real-time card updates and timer synchronization.

---

### 5. Post-Game & Scoring
* **Scoring Dashboard:** Triggered automatically after Turn 10.
* **Metrics:** Detailed statistics per player (Correct vs. Incorrect cards), system stability over time, and final mission success rating.


### 6. Example mission:

10-Turn Campaign example: see scenario_1.json