const { Pool } = require("pg");

class Persistence {
  constructor(options = {}) {
    this.connectionString = options.connectionString || "";
    this.enabled = Boolean(this.connectionString);
    this.pool = this.enabled ? new Pool({ connectionString: this.connectionString }) : null;
  }

  async init() {
    if (!this.enabled) {
      return false;
    }

    await this.pool.query(`
      create table if not exists runtime_state (
        state_key text primary key,
        state_json jsonb not null,
        updated_at timestamptz not null default now()
      );

      create table if not exists scenarios (
        version text primary key,
        title text not null,
        payload jsonb not null,
        created_at timestamptz not null default now()
      );

      create table if not exists game_runs (
        run_id text primary key,
        room_code text not null,
        scenario_version text not null,
        phase text not null,
        current_turn integer not null,
        mission_score integer not null,
        stress_level integer not null,
        tide_window_minutes integer not null,
        final_rating text,
        systems jsonb not null,
        summary jsonb not null,
        started_at timestamptz not null default now(),
        finished_at timestamptz,
        updated_at timestamptz not null default now()
      );

      create table if not exists turn_history (
        run_id text not null,
        turn_index integer not null,
        payload jsonb not null,
        created_at timestamptz not null default now(),
        primary key (run_id, turn_index)
      );

      create table if not exists player_sessions (
        player_id integer primary key,
        name text not null,
        role_name text not null,
        token text not null unique,
        socket_id text,
        connected boolean not null default false,
        updated_at timestamptz not null default now()
      );

      create table if not exists chat_messages (
        message_id text primary key,
        run_id text not null,
        player_id integer not null,
        player_name text not null,
        role_name text not null,
        text_value text not null,
        sent_at timestamptz not null
      );

      create table if not exists audit_logs (
        id bigserial primary key,
        actor_player_id integer,
        actor_role text,
        event_type text not null,
        ip_address text,
        details jsonb not null,
        created_at timestamptz not null default now()
      );
    `);

    return true;
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async loadRuntimeState() {
    if (!this.enabled) {
      return null;
    }

    const result = await this.pool.query(
      "select state_json from runtime_state where state_key = $1",
      ["primary"],
    );
    return result.rows[0]?.state_json || null;
  }

  async saveRuntimeState(game) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into runtime_state (state_key, state_json, updated_at)
        values ($1, $2::jsonb, now())
        on conflict (state_key)
        do update set state_json = excluded.state_json, updated_at = now()
      `,
      ["primary", JSON.stringify(game)],
    );
  }

  async upsertScenario(version, scenario) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into scenarios (version, title, payload)
        values ($1, $2, $3::jsonb)
        on conflict (version)
        do update set title = excluded.title, payload = excluded.payload
      `,
      [version, scenario.mission_metadata.title, JSON.stringify(scenario)],
    );
  }

  async upsertGameRun(game) {
    if (!this.enabled) {
      return;
    }

    const finishedAt = game.game_metadata.phase === "game_over" ? new Date().toISOString() : null;
    const summary = {
      room: game.room,
      game_metadata: game.game_metadata,
      turn_data: game.turn_data,
    };

    await this.pool.query(
      `
        insert into game_runs (
          run_id,
          room_code,
          scenario_version,
          phase,
          current_turn,
          mission_score,
          stress_level,
          tide_window_minutes,
          final_rating,
          systems,
          summary,
          finished_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11::jsonb, $12, now())
        on conflict (run_id)
        do update set
          room_code = excluded.room_code,
          scenario_version = excluded.scenario_version,
          phase = excluded.phase,
          current_turn = excluded.current_turn,
          mission_score = excluded.mission_score,
          stress_level = excluded.stress_level,
          tide_window_minutes = excluded.tide_window_minutes,
          final_rating = excluded.final_rating,
          systems = excluded.systems,
          summary = excluded.summary,
          finished_at = coalesce(excluded.finished_at, game_runs.finished_at),
          updated_at = now()
      `,
      [
        game.run_id,
        game.room.code,
        game.scenario_version,
        game.game_metadata.phase,
        game.game_metadata.current_turn,
        game.game_metadata.mission_score,
        game.game_metadata.stress_level,
        game.game_metadata.tide_window_minutes,
        game.game_metadata.final_rating,
        JSON.stringify(game.systems),
        JSON.stringify(summary),
        finishedAt,
      ],
    );
  }

  async upsertPlayer(player) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into player_sessions (player_id, name, role_name, token, socket_id, connected, updated_at)
        values ($1, $2, $3, $4, $5, $6, now())
        on conflict (player_id)
        do update set
          name = excluded.name,
          role_name = excluded.role_name,
          token = excluded.token,
          socket_id = excluded.socket_id,
          connected = excluded.connected,
          updated_at = now()
      `,
      [
        player.id,
        player.name,
        player.role,
        player.token,
        player.socketId,
        Boolean(player.socketId),
      ],
    );
  }

  async insertChatMessage(runId, message) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into chat_messages (
          message_id,
          run_id,
          player_id,
          player_name,
          role_name,
          text_value,
          sent_at
        )
        values ($1, $2, $3, $4, $5, $6, to_timestamp($7 / 1000.0))
        on conflict (message_id) do nothing
      `,
      [
        message.id,
        runId,
        message.player_id,
        message.player_name,
        message.role,
        message.text,
        message.sent_at,
      ],
    );
  }

  async upsertTurnHistory(runId, turnEntry) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into turn_history (run_id, turn_index, payload)
        values ($1, $2, $3::jsonb)
        on conflict (run_id, turn_index)
        do update set payload = excluded.payload
      `,
      [runId, turnEntry.turn_index, JSON.stringify(turnEntry)],
    );
  }

  async insertAuditLog(entry) {
    if (!this.enabled) {
      return;
    }

    await this.pool.query(
      `
        insert into audit_logs (actor_player_id, actor_role, event_type, ip_address, details)
        values ($1, $2, $3, $4, $5::jsonb)
      `,
      [
        entry.actor_player_id || null,
        entry.actor_role || null,
        entry.event_type,
        entry.ip_address || null,
        JSON.stringify(entry.details || {}),
      ],
    );
  }
}

module.exports = {
  Persistence,
};
