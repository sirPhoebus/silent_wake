import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { io, Socket } from "socket.io-client";
import * as THREE from "three";

type Session = {
  player: Player;
  token: string;
};

type Player = {
  id: number;
  name: string;
  role: string;
  socketId?: string | null;
  connected?: boolean;
};

type Card = {
  id: string;
  name: string;
  desc: string;
  role?: string;
};

type ActiveCard = {
  player_id: number;
  player_name: string;
  role: string;
  card_id: string;
  played_at: number;
};

type Turn = {
  turn_index: number;
  title: string;
  context: string;
  resolution: {
    best_cards: string[];
    fail_system: string;
    fail_status: string;
  };
  cards: Record<string, Card[]>;
};

type Scenario = {
  mission_metadata: {
    title: string;
    description: string;
  };
  roles: string[];
  turns: Turn[];
  version: string;
};

type GameState = {
  room: {
    code: string;
    startCountdownEndsAt: number | null;
    hasStarted: boolean;
  };
  systems: Record<string, string>;
  players: Player[];
  chat: Array<{
    id: string;
    player_id: number;
    player_name: string;
    role: string;
    text: string;
    sent_at: number;
  }>;
  game_metadata: {
    current_turn: number;
    mission_score: number;
    stress_level: number;
    tide_window_minutes: number;
    is_paused: boolean;
    phase: string;
    final_rating: string | null;
    scenario_uploaded: boolean;
  };
  turn_data: {
    active_cards: ActiveCard[];
    timer_remaining: number;
    committed_cards: string[];
    current_briefing_acknowledged: boolean;
    briefing_started_at: number | null;
    turn_title: string | null;
    turn_context: string | null;
  };
  turn_history: Array<{
    turn_index: number;
    outcome: string;
    score_delta: number;
    matched: string[];
    missed: string[];
    bad_cards: string[];
    summary: {
      played_cards: Array<{
        player_id: number;
        card_id: string;
      }>;
    };
  }>;
  scenario_meta: {
    title: string;
    description: string;
  };
  scenario_version: string;
  transition_remaining: number;
};

type TransitionQuote = {
  text: string;
  author: string;
  role: string;
};

type TurnHistoryEntry = GameState["turn_history"][number];

type AdminGameRunSummary = {
  run_id: string;
  room_code: string;
  scenario_title: string;
  phase: string;
  mission: string;
  mission_score: number;
  started_at: string | null;
  finished_at: string | null;
  updated_at: string | null;
};

type AdminGameRunDetail = AdminGameRunSummary & {
  current_turn: number;
  stress_level: number;
  tide_window_minutes: number;
  systems: Record<string, string>;
  summary: {
    room?: {
      code?: string;
    };
    game_metadata?: {
      phase?: string;
      mission_score?: number;
      final_rating?: string | null;
    };
    turn_data?: {
      timer_remaining?: number;
    };
  };
  turn_history: TurnHistoryEntry[];
};

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);
  private readonly transitionQuotes: TransitionQuote[] = [
    { text: "England expects that every man will do his duty.", author: "Horatio Nelson", role: "Vice Admiral" },
    { text: "I have not yet begun to fight!", author: "John Paul Jones", role: "Naval Captain" },
    { text: "Damn the torpedoes, full speed ahead!", author: "David Farragut", role: "Admiral" },
    { text: "Uncommon valor was a common virtue.", author: "Chester W. Nimitz", role: "Fleet Admiral" },
    { text: "We have met the enemy and they are ours.", author: "Oliver Hazard Perry", role: "Commodore" },
    { text: "A ship without Marines is like a garment without buttons.", author: "David Dixon Porter", role: "Admiral" },
    { text: "Those who seek death shall live, and those who seek life shall die.", author: "Yi Sun-sin", role: "Admiral" },
    { text: "It takes the Navy three years to build a ship; it will take three hundred to build a tradition.", author: "Andrew Cunningham", role: "Admiral" },
    { text: "There are no great people in this world, only great challenges which ordinary people rise to meet.", author: "William Halsey Jr.", role: "Fleet Admiral" },
    { text: "We're surrounded. That simplifies the problem.", author: "Chesty Puller", role: "Lieutenant General, USMC" },
    { text: "War is a racket.", author: "Smedley Butler", role: "Major General, USMC" },
    { text: "The deadliest weapon in the world is a Marine and his rifle.", author: "John A. Lejeune", role: "Lieutenant General, USMC" },
    { text: "The bended knee is not a tradition of our Corps.", author: "Alexander Vandegrift", role: "General, USMC" },
    { text: "War is merely the continuation of policy by other means.", author: "Carl von Clausewitz", role: "General" },
    { text: "No plan of operations extends with certainty beyond the first encounter with the enemy's main strength.", author: "Helmuth von Moltke the Elder", role: "Field Marshal" },
    { text: "In war, the moral is to the physical as three is to one.", author: "Napoleon Bonaparte", role: "General" },
    { text: "An army marches on its stomach.", author: "Napoleon Bonaparte", role: "General" },
    { text: "Never interrupt your enemy when he is making a mistake.", author: "Napoleon Bonaparte", role: "General" },
    { text: "Lead me, follow me, or get out of my way.", author: "George S. Patton", role: "General" },
    { text: "A good plan violently executed now is better than a perfect plan next week.", author: "George S. Patton", role: "General" },
    { text: "Courage is fear holding on a minute longer.", author: "George S. Patton", role: "General" },
    { text: "Never tell people how to do things. Tell them what to do and they will surprise you.", author: "George S. Patton", role: "General" },
    { text: "Old soldiers never die; they just fade away.", author: "Douglas MacArthur", role: "General of the Army" },
    { text: "There is no substitute for victory.", author: "Douglas MacArthur", role: "General of the Army" },
    { text: "It is fatal to enter any war without the will to win it.", author: "Douglas MacArthur", role: "General of the Army" },
    { text: "Plans are worthless, but planning is everything.", author: "Dwight D. Eisenhower", role: "General of the Army" },
    { text: "The supreme quality for leadership is unquestionably integrity.", author: "Dwight D. Eisenhower", role: "General of the Army" },
    { text: "The art of war is simple enough. Find out where your enemy is. Get at him as soon as you can.", author: "Ulysses S. Grant", role: "General" },
    { text: "War is cruelty, and you cannot refine it.", author: "William T. Sherman", role: "General" },
    { text: "War is hell.", author: "William T. Sherman", role: "General" },
    { text: "Nothing except a battle lost can be half so melancholy as a battle won.", author: "Arthur Wellesley", role: "Field Marshal" },
    { text: "The most powerful weapon on earth is the human soul on fire.", author: "Ferdinand Foch", role: "Marshal" },
    { text: "Don't fight a battle if you don't gain anything by winning.", author: "Erwin Rommel", role: "Field Marshal" },
    { text: "The best form of welfare for the troops is first-class training.", author: "Erwin Rommel", role: "Field Marshal" },
    { text: "Discipline is the soul of an army.", author: "George Washington", role: "General" },
    { text: "To be prepared for war is one of the most effective means of preserving peace.", author: "George Washington", role: "General" },
    { text: "Train hard, fight easy.", author: "Alexander Suvorov", role: "Generalissimo" },
    { text: "The bullet is a fool, the bayonet is a fine chap.", author: "Alexander Suvorov", role: "Generalissimo" },
    { text: "Know your enemy and know yourself, and you can fight a hundred battles without disaster.", author: "Sun Tzu", role: "General and Strategist" },
    { text: "To subdue the enemy without fighting is the acme of skill.", author: "Sun Tzu", role: "General and Strategist" },
    { text: "Victorious warriors win first and then go to war.", author: "Sun Tzu", role: "General and Strategist" },
    { text: "He will win who knows when to fight and when not to fight.", author: "Sun Tzu", role: "General and Strategist" },
    { text: "Attack him where he is unprepared, appear where you are not expected.", author: "Sun Tzu", role: "General and Strategist" },
    { text: "If a man says he is not afraid of dying, he is either lying or is a Gurkha.", author: "Sam Manekshaw", role: "Field Marshal" },
    { text: "There will be no withdrawal without written orders, and these orders shall never be issued.", author: "Sam Manekshaw", role: "Field Marshal" },
    { text: "The only thing harder than getting a new idea into the military mind is to get an old one out.", author: "B. H. Liddell Hart", role: "Captain and Military Historian" },
    { text: "The soldier's heart, the soldier's spirit, the soldier's soul are everything.", author: "George C. Marshall", role: "General of the Army" },
    { text: "When placed in command, take charge.", author: "Norman Schwarzkopf", role: "General" },
    { text: "The truth of the matter is that you always know the right thing to do. The hard part is doing it.", author: "Norman Schwarzkopf", role: "General" },
    { text: "If we come to a minefield, our infantry attacks exactly as if it were not there.", author: "Georgy Zhukov", role: "Marshal" },
    { text: "Leadership is intangible, and therefore no weapon ever designed can replace it.", author: "Omar Bradley", role: "General of the Army" },
    { text: "A leader is a dealer in hope.", author: "Napoleon Bonaparte", role: "General" },
  ];
  private readonly systemMeta: Record<string, { label: string; icon: string }> = {
    NAV_RADAR: { label: "Nav Radar", icon: "◎" },
    NAV_CONSOLE: { label: "Console", icon: "⌘" },
    NAV_SENSORS: { label: "Sensors", icon: "◉" },
    ASUW_TRACKING: { label: "Tracking", icon: "⌖" },
    COMMS: { label: "Comms", icon: "⌁" },
    AAW_RADAR: { label: "AAW Radar", icon: "✦" },
  };
  protected readonly roleLabels: Record<string, string> = {
    admin: "Game Admin",
    co: "Chief Officer",
    cyber_officer: "Cyber Officer",
    air_officer: "Air Officer",
    naval_officer: "Naval Officer",
    submarine_officer: "Submarine Officer",
  };
  protected readonly validRoles = Object.keys(this.roleLabels);

  protected scenario: Scenario | null = null;
  protected game: GameState | null = null;
  protected session: Session | null = this.loadSession();
  protected selectedCommitIds: string[] = [];
  protected noticeText = "";
  protected flashMessage = "";
  protected connectionStatus = "offline";
  protected joinName = "";
  protected joinRole = "admin";
  protected chatDraft = "";
  protected selectedScenarioFile: File | null = null;
  protected chatPanelOpen = false;
  protected currentTransitionQuote: TransitionQuote | null = null;
  protected chatHandlePulse = false;
  protected selectedTurnHistoryEntry: TurnHistoryEntry | null = null;
  protected adminGameRuns: AdminGameRunSummary[] = [];
  protected selectedAdminGameRun: AdminGameRunDetail | null = null;
  protected draggedHandCardId: string | null = null;
  protected draggedSlotCardId: string | null = null;

  private socket: Socket | null = null;
  private flashTimeout: ReturnType<typeof setTimeout> | null = null;
  private chatPulseTimeout: ReturnType<typeof setTimeout> | null = null;
  private viewTicker: ReturnType<typeof setInterval> | null = null;
  private launchingCardIds = new Set<string>();
  private transferCanvas: HTMLCanvasElement | null = null;
  private transferRenderer: THREE.WebGLRenderer | null = null;
  private transferScene: THREE.Scene | null = null;
  private transferCamera: THREE.OrthographicCamera | null = null;
  private transferFrame: number | null = null;
  private lastTransitionQuoteKey: string | null = null;

  protected get player(): Player | null {
    return this.session?.player || null;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.startViewTicker();
      await this.refreshScenario();
      await this.refreshState();
      await this.restoreSession();
      if (this.session?.token) {
        this.connectSocket();
      }
      this.renderNow();
    } catch (error) {
      this.noticeText = this.errorMessage(error);
      this.renderNow();
    }
  }

  ngOnDestroy(): void {
    if (this.viewTicker) {
      clearInterval(this.viewTicker);
      this.viewTicker = null;
    }
    if (this.chatPulseTimeout) {
      clearTimeout(this.chatPulseTimeout);
      this.chatPulseTimeout = null;
    }
    this.disposeTransferEffect();
    this.disconnectSocket();
  }

  protected fmtSeconds(total: number): string {
    const mins = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.max(0, total % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  protected fmtDateTime(value: string | null): string {
    if (!value) {
      return "—";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString();
  }

  protected fmtDate(value: string | null): string {
    if (!value) {
      return "—";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString();
  }

  protected fmtTime(value: string | null): string {
    if (!value) {
      return "—";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleTimeString();
  }

  protected csv(values: string[]): string {
    return values.length ? values.join(", ") : "none";
  }

  protected currentTurn(): Turn | null {
    if (!this.scenario || !this.game) {
      return null;
    }
    return this.scenario.turns.find((turn) => turn.turn_index === this.game!.game_metadata.current_turn) || null;
  }

  protected totalTurns(): number {
    return this.scenario?.turns.length || 0;
  }

  protected heatScale(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  protected systemEntries(): Array<{ key: string; value: string }> {
    return Object.entries(this.game?.systems || {}).map(([key, value]) => ({ key, value }));
  }

  protected systemTiles(): Array<{ key: string; value: string; label: string; icon: string }> {
    return this.systemEntries().map((entry) => ({
      ...entry,
      label: this.systemMeta[entry.key]?.label || entry.key,
      icon: this.systemMeta[entry.key]?.icon || "●",
    }));
  }

  protected reversedHistory() {
    return [...(this.game?.turn_history || [])].reverse();
  }

  protected openTurnHistoryDetail(entry: TurnHistoryEntry): void {
    this.selectedTurnHistoryEntry = entry;
    this.renderNow();
  }

  protected closeTurnHistoryDetail(): void {
    this.selectedTurnHistoryEntry = null;
    this.renderNow();
  }

  protected async openAdminGameRun(runId: string): Promise<void> {
    await this.run(async () => {
      const response = await this.api<{ ok: true; run: AdminGameRunDetail }>(`/api/v1/admin/game_runs/${runId}`);
      this.selectedAdminGameRun = response.run;
      this.renderNow();
    });
  }

  protected async deleteAdminGameRun(runId: string): Promise<void> {
    await this.run(async () => {
      await this.api(`/api/v1/admin/game_runs/${runId}`, { method: "DELETE" });
      if (this.selectedAdminGameRun?.run_id === runId) {
        this.selectedAdminGameRun = null;
      }
      await this.refreshAdminGameRuns();
      this.flash("Game deleted.");
    });
  }

  protected closeAdminGameRun(): void {
    this.selectedAdminGameRun = null;
    this.renderNow();
  }

  protected isAdmin(): boolean {
    return this.player?.role === "admin";
  }

  protected countdownRemaining(): number {
    if (!this.game?.room.startCountdownEndsAt) {
      return 0;
    }
    return Math.max(0, Math.ceil((this.game.room.startCountdownEndsAt - Date.now()) / 1000));
  }

  protected briefingCountdownRemaining(): number {
    const startedAt = this.game?.turn_data.briefing_started_at;
    if (!startedAt) {
      return 0;
    }
    return Math.max(0, Math.ceil((startedAt + 10_000 - Date.now()) / 1000));
  }

  protected actionCountdownRemaining(): number {
    if (this.game?.game_metadata.phase !== "action") {
      return 0;
    }
    return Math.max(0, this.game.turn_data.timer_remaining);
  }

  protected showBriefingOverlay(): boolean {
    return (
      this.player?.role !== "admin" &&
      this.game?.game_metadata.phase === "briefing" &&
      this.briefingCountdownRemaining() > 0
    );
  }

  protected showActionCountdownOverlay(): boolean {
    return (
      this.player?.role !== "admin" &&
      this.player?.role !== "co" &&
      this.game?.game_metadata.phase === "action" &&
      this.actionCountdownRemaining() > 0 &&
      this.actionCountdownRemaining() <= 10
    );
  }

  private syncTransitionQuote(nextGame: GameState): void {
    if (nextGame.game_metadata.phase !== "transition") {
      this.currentTransitionQuote = null;
      this.lastTransitionQuoteKey = null;
      return;
    }

    const quoteKey = String(nextGame.game_metadata.current_turn);
    if (this.lastTransitionQuoteKey === quoteKey && this.currentTransitionQuote) {
      return;
    }

    this.lastTransitionQuoteKey = quoteKey;
    this.currentTransitionQuote =
      this.transitionQuotes[Math.floor(Math.random() * this.transitionQuotes.length)] || null;
  }

  protected scenarioUploaded(): boolean {
    return Boolean(this.game?.game_metadata.scenario_uploaded);
  }

  protected requiredRoles(): string[] {
    if (!this.scenario) {
      return [];
    }
    return ["admin", "co", ...this.scenario.roles];
  }

  protected missingRequiredRoles(): string[] {
    const present = new Set((this.game?.players || []).map((player) => player.role));
    return this.requiredRoles().filter((role) => !present.has(role));
  }

  protected canStartCountdown(): boolean {
    return this.scenarioUploaded() && this.missingRequiredRoles().length === 0;
  }

  protected countdownBlockerMessage(): string {
    if (!this.scenarioUploaded()) {
      return "Upload a scenario before starting the countdown.";
    }
    const missing = this.missingRequiredRoles();
    if (missing.length > 0) {
      return `Missing required roles: ${missing.map((role) => this.roleLabels[role] || role).join(", ")}.`;
    }
    return "";
  }

  protected playerCards(): Card[] {
    const turn = this.currentTurn();
    if (!turn || !this.player) {
      return [];
    }
    return turn.cards[this.player.role] || [];
  }

  protected availablePlayerCards(): Card[] {
    return this.playerCards().filter((card) => !this.hasActiveCard(card.id));
  }

  protected activeSelections(): ActiveCard[] {
    return (this.game?.turn_data.active_cards || [])
      .filter((entry) => entry.player_id === this.player?.id)
      .sort((a, b) => a.played_at - b.played_at);
  }

  protected activeSelectionCards(): Card[] {
    return this.activeSelections()
      .map((entry) => this.resolveCardById(entry.card_id))
      .filter((entry): entry is Card => Boolean(entry));
  }

  protected hasActiveCard(cardId: string): boolean {
    return this.activeSelections().some((entry) => entry.card_id === cardId);
  }

  protected canPlayCard(cardId: string): boolean {
    return this.canInteract() && !this.hasActiveCard(cardId);
  }

  protected canDropIntoPlayField(): boolean {
    return this.canInteract() && Boolean(this.draggedHandCardId);
  }

  protected canDropIntoHand(): boolean {
    return this.canInteract() && Boolean(this.draggedSlotCardId);
  }

  protected isLaunchingCard(cardId: string): boolean {
    return this.launchingCardIds.has(cardId);
  }

  protected canInteract(): boolean {
    return this.game?.game_metadata.phase === "action" && this.connectionStatus === "online";
  }

  protected activeCardsForCo() {
    return (this.game?.turn_data.active_cards || [])
      .map((entry) => ({ ...entry, card: this.resolveCardById(entry.card_id) }))
      .sort((a, b) => a.played_at - b.played_at);
  }

  protected activeCardGroupsForCo(): Array<{
    playerId: number;
    playerName: string;
    role: string;
    cards: Array<ReturnType<AppComponent["activeCardsForCo"]>[number]>;
  }> {
    const groups = new Map<
      number,
      {
        playerId: number;
        playerName: string;
        role: string;
        cards: Array<ReturnType<AppComponent["activeCardsForCo"]>[number]>;
      }
    >();

    for (const entry of this.activeCardsForCo()) {
      const existing = groups.get(entry.player_id);
      if (existing) {
        existing.cards.push(entry);
        continue;
      }
      groups.set(entry.player_id, {
        playerId: entry.player_id,
        playerName: entry.player_name,
        role: entry.role,
        cards: [entry],
      });
    }

    return [...groups.values()].sort((a, b) => a.role.localeCompare(b.role) || a.playerName.localeCompare(b.playerName));
  }

  protected playerStatistics() {
    const players = (this.game?.players || []).filter((player) => player.role !== "admin");
    return players.map((player) => {
      let correct = 0;
      let incorrect = 0;
      for (const turnEntry of this.game?.turn_history || []) {
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
  }

  protected turnHistoryPlayedCards(entry: TurnHistoryEntry): Array<{ playerName: string; cardName: string; role: string }> {
    const turn = this.scenario?.turns.find((candidate) => candidate.turn_index === entry.turn_index);
    if (!turn) {
      return [];
    }

    return entry.summary.played_cards.map((played) => {
      const player = (this.game?.players || []).find((candidate) => candidate.id === played.player_id);
      let cardName = played.card_id;
      for (const cards of Object.values(turn.cards)) {
        const matchedCard = cards.find((candidate) => candidate.id === played.card_id);
        if (matchedCard) {
          cardName = matchedCard.name;
          break;
        }
      }

      return {
        playerName: player?.name || `Player ${played.player_id}`,
        cardName,
        role: this.roleLabels[player?.role || ""] || player?.role || "Unknown Role",
      };
    });
  }

  protected adminRunTurnHistory(run: AdminGameRunDetail | null): TurnHistoryEntry[] {
    return [...(run?.turn_history || [])].reverse();
  }

  protected isCommittedCard(cardId: string): boolean {
    return this.selectedCommitIds.includes(cardId);
  }

  protected toggleCommitCard(cardId: string): void {
    this.selectedCommitIds = this.isCommittedCard(cardId)
      ? this.selectedCommitIds.filter((entry) => entry !== cardId)
      : [...new Set([...this.selectedCommitIds, cardId])];
  }

  protected toggleChatPanel(): void {
    this.chatPanelOpen = !this.chatPanelOpen;
    if (this.chatPanelOpen) {
      this.chatHandlePulse = false;
      if (this.chatPulseTimeout) {
        clearTimeout(this.chatPulseTimeout);
        this.chatPulseTimeout = null;
      }
    }
    this.renderNow();
  }

  private syncChatHandlePulse(previousGame: GameState | null, nextGame: GameState): void {
    const previousLastMessageId = previousGame?.chat.at(-1)?.id || null;
    const nextLastMessageId = nextGame.chat.at(-1)?.id || null;
    if (!nextLastMessageId || previousLastMessageId === nextLastMessageId || this.chatPanelOpen) {
      return;
    }

    this.chatHandlePulse = true;
    if (this.chatPulseTimeout) {
      clearTimeout(this.chatPulseTimeout);
    }
    this.chatPulseTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.chatHandlePulse = false;
        this.chatPulseTimeout = null;
        this.renderNow();
      });
    }, 4000);
  }

  protected onScenarioSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedScenarioFile = target.files?.[0] || null;
  }

  protected async join(): Promise<void> {
    try {
      this.noticeText = "";
      const data = await this.api<{ player: Player; session_token: string }>("/api/v1/join", {
        method: "POST",
        body: {
          name: this.joinName,
          role: this.joinRole,
        },
      });
      this.session = {
        player: data.player,
        token: data.session_token,
      };
      this.saveSession();
      if (data.player.role === "admin") {
        await this.refreshAdminGameRuns();
      }
      this.connectSocket();
      this.flash(`Joined as ${this.roleLabels[data.player.role]}.`);
    } catch (error) {
      this.zone.run(() => {
        this.noticeText = this.errorMessage(error);
      });
      this.renderNow();
    }
  }

  protected async resetRoom(): Promise<void> {
    await this.run(async () => {
      await this.api("/api/v1/create_room", {
        method: "POST",
        body: { room_code: this.game?.room.code || "alpha-room" },
      });
      this.selectedCommitIds = [];
      this.flash("Room reset.");
    });
  }

  protected async startCountdown(): Promise<void> {
    await this.run(async () => {
      if (!this.canStartCountdown()) {
        throw new Error(this.countdownBlockerMessage());
      }
      await this.api("/api/v1/start_game_countdown", { method: "POST" });
      this.flash("Briefing started.");
    });
  }

  protected async refresh(): Promise<void> {
    await this.run(async () => {
      await this.refreshScenario();
      await this.refreshState();
      this.flash("State refreshed.");
    });
  }

  protected async uploadScenario(): Promise<void> {
    await this.run(async () => {
      if (!this.selectedScenarioFile) {
        throw new Error("Choose a scenario file first.");
      }
      const payload = new FormData();
      payload.append("scenario", this.selectedScenarioFile);
      await this.api("/api/v1/load_scenario", {
        method: "POST",
        body: payload,
      });
      await this.refreshScenario();
      await this.refreshState();
      this.flash("Scenario loaded.");
      this.selectedScenarioFile = null;
    });
  }

  protected async startTurn(): Promise<void> {
    await this.run(async () => {
      await this.api("/api/v1/start_turn", { method: "POST" });
    });
  }

  protected async commitTurn(): Promise<void> {
    await this.run(async () => {
      await this.api("/api/v1/commit_turn", {
        method: "POST",
        body: { card_ids: this.selectedCommitIds },
      });
      this.selectedCommitIds = [];
    });
  }

  protected async playCard(cardId: string, targetSelector = "[data-play-field='officer']"): Promise<void> {
    await this.run(async () => {
      const snapshot = this.createCardSnapshot(`[data-hand-card-id="${cardId}"]`);
      this.launchingCardIds.add(cardId);
      this.renderNow();
      try {
        await this.emitSocket("PLAY_CARD", { cardId });
        await this.animateSnapshotTo(snapshot, targetSelector);
      } catch (error) {
        this.launchingCardIds.delete(cardId);
        this.renderNow();
        throw error;
      }
    });
  }

  protected async removeCard(cardId?: string): Promise<void> {
    await this.run(async () => {
      await this.emitSocket("REMOVE_CARD", cardId ? { cardId } : {});
    });
  }

  protected onHandCardDragStart(event: DragEvent, cardId: string): void {
    if (!this.canPlayCard(cardId)) {
      event.preventDefault();
      return;
    }
    this.draggedHandCardId = cardId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", cardId);
    }
    this.renderNow();
  }

  protected onSlotCardDragStart(event: DragEvent, cardId: string): void {
    if (!this.canInteract()) {
      event.preventDefault();
      return;
    }
    this.draggedSlotCardId = cardId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", cardId);
    }
    this.renderNow();
  }

  protected onCardDragEnd(): void {
    this.draggedHandCardId = null;
    this.draggedSlotCardId = null;
    this.renderNow();
  }

  protected onPlayFieldDragOver(event: DragEvent): void {
    if (!this.canDropIntoPlayField()) {
      return;
    }
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  protected async onPlayFieldDrop(event: DragEvent): Promise<void> {
    if (!this.draggedHandCardId || !this.canDropIntoPlayField()) {
      return;
    }
    event.preventDefault();
    const cardId = this.draggedHandCardId;
    this.draggedHandCardId = null;
    await this.playCard(cardId);
  }

  protected onHandDropZoneOver(event: DragEvent): void {
    if (!this.canDropIntoHand()) {
      return;
    }
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  protected async onHandDrop(event: DragEvent): Promise<void> {
    if (!this.draggedSlotCardId) {
      return;
    }
    event.preventDefault();
    const cardId = this.draggedSlotCardId;
    const snapshot = this.createCardSnapshot(`[data-slot-card-id="${cardId}"]`);
    this.draggedSlotCardId = null;
    await this.run(async () => {
      await this.emitSocket("REMOVE_CARD", { cardId });
      await this.animateSnapshotTo(snapshot, "[data-hand-dropzone='true']");
    });
  }

  protected async sendChat(): Promise<void> {
    await this.run(async () => {
      const text = this.chatDraft.trim();
      if (!text) {
        return;
      }
      await this.emitSocket("CHAT_MESSAGE", { text });
      this.chatDraft = "";
    });
  }

  protected clearSession(): void {
    this.session = null;
    localStorage.removeItem("silent-wake-session");
    this.disconnectSocket();
    this.selectedCommitIds = [];
    this.adminGameRuns = [];
    this.selectedAdminGameRun = null;
    this.zone.run(() => {
      this.noticeText = "";
      this.flashMessage = "";
    });
  }

  private resolveCardById(cardId: string): Card | null {
    const turn = this.currentTurn();
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

  private loadSession(): Session | null {
    try {
      const raw = localStorage.getItem("silent-wake-session");
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  }

  private saveSession(): void {
    if (this.session) {
      localStorage.setItem("silent-wake-session", JSON.stringify(this.session));
    }
  }

  private async restoreSession(): Promise<void> {
    if (!this.session?.token) {
      return;
    }
    try {
      const data = await this.api<{ player: Player }>("/api/v1/resume_session", { method: "POST" });
      this.session = {
        player: data.player,
        token: this.session.token,
      };
      this.saveSession();
      if (data.player.role === "admin") {
        await this.refreshAdminGameRuns();
      }
    } catch {
      this.clearSession();
    }
  }

  private connectSocket(): void {
    if (!this.session?.token) {
      return;
    }
    this.disconnectSocket();
    this.socket = io({
      auth: { token: this.session.token },
      transports: ["websocket"],
      timeout: 2000,
    });

    this.socket.on("connect", () => {
      this.zone.run(() => {
        this.connectionStatus = "online";
        this.zone.run(() => {
          this.noticeText = "";
        });
        this.renderNow();
      });
    });
    this.socket.on("disconnect", () => {
      this.zone.run(() => {
        this.connectionStatus = "offline";
        this.renderNow();
      });
    });
    this.socket.on("connect_error", (error: Error) => {
      this.zone.run(() => {
        this.connectionStatus = "offline";
        this.noticeText = error.message || "Socket connection failed.";
        this.renderNow();
      });
    });
    this.socket.on("STATE_UPDATE", async (payload: GameState) => {
      await this.zone.run(async () => {
        this.syncChatHandlePulse(this.game, payload);
        this.syncTransitionQuote(payload);
        this.game = payload;
        if (
          this.player?.role === "admin" &&
          ["waiting_room", "briefing", "game_over"].includes(payload.game_metadata.phase)
        ) {
          await this.refreshAdminGameRuns();
        }
        for (const activeCard of payload.turn_data.active_cards) {
          this.launchingCardIds.delete(activeCard.card_id);
        }
        if (payload.game_metadata.phase !== "action") {
          this.launchingCardIds.clear();
        }
        if (this.scenario?.version !== payload.scenario_version) {
          await this.refreshScenario();
        }
        this.renderNow();
      });
    });
    this.socket.on("SCENARIO_UPDATED", (payload: Scenario) => {
      this.zone.run(() => {
        this.scenario = payload;
        this.renderNow();
      });
    });
    this.socket.on("TURN_RESOLVED", () => {
      this.zone.run(() => {
        this.selectedCommitIds = [];
        this.renderNow();
      });
    });
    this.socket.on("SERVER_ERROR", (payload: { message: string }) => {
      this.zone.run(() => {
        this.noticeText = payload.message;
        this.renderNow();
      });
    });
  }

  private disconnectSocket(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.connectionStatus = "offline";
  }

  private async emitSocket(eventName: string, payload: Record<string, unknown>): Promise<void> {
    if (!this.socket || !this.socket.connected) {
      throw new Error("Socket is not connected.");
    }
    await new Promise<void>((resolve, reject) => {
      this.socket!.timeout(2000).emit(
        eventName,
        payload,
        (error: Error | null, response: { ok?: boolean; error?: string }) => {
          if (error) {
            reject(new Error("Socket request timed out."));
            return;
          }
          if (!response?.ok) {
            reject(new Error(response?.error || "Socket request failed."));
            return;
          }
          resolve();
        },
      );
    });
  }

  private async refreshScenario(): Promise<void> {
    this.scenario = await this.api<Scenario>("/api/v1/scenario");
  }

  private async refreshState(): Promise<void> {
    const nextGame = await this.api<GameState>("/api/v1/state");
    this.syncChatHandlePulse(this.game, nextGame);
    this.syncTransitionQuote(nextGame);
    this.game = nextGame;
    if (this.player?.role === "admin") {
      await this.refreshAdminGameRuns();
    }
  }

  private async refreshAdminGameRuns(): Promise<void> {
    if (this.player?.role !== "admin" || !this.session?.token) {
      return;
    }
    const response = await this.api<{ ok: true; runs: AdminGameRunSummary[] }>("/api/v1/admin/game_runs");
    this.adminGameRuns = response.runs;
  }

  private async api<T>(path: string, options: { method?: string; body?: FormData | object } = {}): Promise<T> {
    const headers: Record<string, string> = {};
    const isFormData = options.body instanceof FormData;
    let requestBody: BodyInit | undefined;
    if (options.body !== undefined) {
      requestBody = isFormData ? (options.body as FormData) : JSON.stringify(options.body);
    }
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    if (this.session?.token) {
      headers["x-session-token"] = this.session.token;
    }

    const response = await fetch(path, {
      method: options.method || "GET",
      headers,
      body: requestBody,
    });

    let data: any;
    try {
      data = await response.json();
    } catch {
      data = { error: `HTTP ${response.status}: ${response.statusText}` };
    }

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }
    return data as T;
  }

  private flash(message: string): void {
    this.flashMessage = message;
    this.renderNow();
    if (this.flashTimeout) {
      clearTimeout(this.flashTimeout);
    }
    this.flashTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.flashMessage = "";
      });
      this.renderNow();
    }, 3000);
  }

  private async run(task: () => Promise<void>): Promise<void> {
    try {
      this.noticeText = "";
      await task();
    } catch (error) {
      this.noticeText = this.errorMessage(error);
      this.renderNow();
    }
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Request failed";
  }

  private renderNow(): void {
    this.cdr.detectChanges();
  }

  private startViewTicker(): void {
    if (this.viewTicker) {
      clearInterval(this.viewTicker);
    }
    this.viewTicker = setInterval(() => {
      if (
        this.game?.game_metadata.phase === "briefing" ||
        this.game?.room.startCountdownEndsAt ||
        this.showActionCountdownOverlay()
      ) {
        this.renderNow();
      }
    }, 1000);
  }

  private createCardSnapshot(selector: string): HTMLElement | null {
    const source = document.querySelector<HTMLElement>(selector);
    return source ? (source.cloneNode(true) as HTMLElement) : null;
  }

  private async animateSnapshotTo(snapshot: HTMLElement | null, targetSelector: string): Promise<void> {
    if (!snapshot) {
      return;
    }
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) {
      return;
    }

    const sourceCardId = snapshot.getAttribute("data-card-id");
    const sourceElement = sourceCardId
      ? document.querySelector<HTMLElement>(`[data-card-id="${sourceCardId}"]`)
      : null;
    if (!sourceElement) {
      return;
    }

    const startRect = sourceElement.getBoundingClientRect();
    const endRect = target.getBoundingClientRect();
    await this.animateThreeCardTransfer(snapshot, startRect, endRect);
  }

  private async animateThreeCardTransfer(
    snapshot: HTMLElement,
    startRect: DOMRect,
    endRect: DOMRect,
  ): Promise<void> {
    this.ensureTransferEffect();
    if (!this.transferRenderer || !this.transferScene || !this.transferCamera) {
      return;
    }

    if (this.transferFrame !== null) {
      cancelAnimationFrame(this.transferFrame);
      this.transferFrame = null;
    }
    this.transferScene.clear();

    const cardTitle =
      snapshot.querySelector("h4")?.textContent?.trim() ||
      snapshot.querySelector("strong")?.textContent?.trim() ||
      "Card";
    const roleText = snapshot.querySelector(".role-label")?.textContent?.trim() || "";
    const texture = this.buildTransferTexture(cardTitle, roleText);
    const group = new THREE.Group();
    const cardWidth = startRect.width;
    const cardHeight = startRect.height;

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(cardWidth * 0.92, cardHeight * 0.92),
      new THREE.MeshBasicMaterial({
        color: 0x02070b,
        transparent: true,
        opacity: 0.28,
      }),
    );
    shadow.position.set(10, -14, -6);
    group.add(shadow);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(cardWidth * 1.12, cardHeight * 1.12),
      new THREE.MeshBasicMaterial({
        color: 0x7fd7ff,
        transparent: true,
        opacity: 0.14,
      }),
    );
    glow.position.z = -4;
    group.add(glow);

    const cardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(cardWidth, cardHeight),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      }),
    );
    group.add(cardMesh);
    this.transferScene.add(group);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const startX = startRect.left + startRect.width / 2 - viewportWidth / 2;
    const startY = viewportHeight / 2 - (startRect.top + startRect.height / 2);
    const endX = endRect.left + endRect.width / 2 - viewportWidth / 2;
    const endY = viewportHeight / 2 - (endRect.top + endRect.height / 2);
    const durationMs = 900;
    const startedAt = performance.now();

    await new Promise<void>((resolve) => {
      const tick = (now: number) => {
        if (!this.transferRenderer || !this.transferScene || !this.transferCamera) {
          resolve();
          return;
        }

        const linear = Math.min(1, (now - startedAt) / durationMs);
        const eased = 1 - Math.pow(1 - linear, 3);
        const lift = Math.sin(eased * Math.PI) * 92;
        group.position.x = startX + (endX - startX) * eased;
        group.position.y = startY + (endY - startY) * eased + lift;
        group.position.z = Math.sin(eased * Math.PI) * 30;

        group.scale.set(1, 1, 1);
        group.rotation.x = 0.38 - eased * 0.28;
        group.rotation.y = -0.34 + eased * 0.34;
        group.rotation.z = 0.045 * Math.sin(eased * Math.PI * 1.2);
        (shadow.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(eased * Math.PI) * 0.08;
        (glow.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(eased * Math.PI) * 0.12;

        this.transferRenderer.render(this.transferScene, this.transferCamera);

        if (linear < 1) {
          this.transferFrame = requestAnimationFrame(tick);
          return;
        }

        texture.dispose();
        (cardMesh.material as THREE.Material).dispose();
        (shadow.material as THREE.Material).dispose();
        (glow.material as THREE.Material).dispose();
        cardMesh.geometry.dispose();
        shadow.geometry.dispose();
        glow.geometry.dispose();
        this.transferScene.clear();
        this.transferRenderer.render(this.transferScene, this.transferCamera);
        this.transferFrame = null;
        resolve();
      };

      this.transferFrame = requestAnimationFrame(tick);
    });
  }

  private ensureTransferEffect(): void {
    if (this.transferRenderer && this.transferScene && this.transferCamera && this.transferCanvas) {
      return;
    }

    this.transferCanvas = document.createElement("canvas");
    this.transferCanvas.className = "floating-card-transfer";
    document.body.appendChild(this.transferCanvas);

    this.transferRenderer = new THREE.WebGLRenderer({
      canvas: this.transferCanvas,
      alpha: true,
      antialias: true,
    });
    this.transferRenderer.setPixelRatio(window.devicePixelRatio || 1);
    this.transferScene = new THREE.Scene();
    this.transferCamera = new THREE.OrthographicCamera();
    this.resizeTransferEffect();
    window.addEventListener("resize", this.handleTransferResize);
  }

  private buildTransferTexture(cardTitle: string, roleText: string): THREE.CanvasTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 720;
    const context = canvas.getContext("2d");
    if (!context) {
      return new THREE.CanvasTexture(canvas);
    }

    const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, "#2d7fb8");
    background.addColorStop(0.55, "#13314b");
    background.addColorStop(1, "#09141f");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const shine = context.createLinearGradient(0, 0, canvas.width * 0.68, canvas.height * 0.4);
    shine.addColorStop(0, "rgba(255,255,255,0.24)");
    shine.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = shine;
    context.fillRect(0, 0, canvas.width, canvas.height * 0.45);

    context.strokeStyle = "rgba(225,245,255,0.18)";
    context.lineWidth = 8;
    context.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    context.fillStyle = "#9ed8ff";
    context.font = "700 26px Trebuchet MS";
    context.fillText(roleText.toUpperCase(), 44, 64);

    context.fillStyle = "#eef9ff";
    context.font = "700 54px Trebuchet MS";
    const words = cardTitle.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (context.measureText(next).width > canvas.width - 88) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) {
      lines.push(current);
    }
    lines.slice(0, 3).forEach((line, index) => {
      context.fillText(line, 44, 184 + index * 68);
    });

    context.fillStyle = "rgba(255,255,255,0.08)";
    context.fillRect(44, canvas.height - 180, canvas.width - 88, 2);
    context.fillRect(44, canvas.height - 142, canvas.width - 148, 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private resizeTransferEffect(): void {
    if (!this.transferRenderer || !this.transferCamera) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.transferRenderer.setSize(width, height, false);
    this.transferCamera.left = -width / 2;
    this.transferCamera.right = width / 2;
    this.transferCamera.top = height / 2;
    this.transferCamera.bottom = -height / 2;
    this.transferCamera.near = -1000;
    this.transferCamera.far = 1000;
    this.transferCamera.position.set(0, 0, 20);
    this.transferCamera.updateProjectionMatrix();
  }

  private readonly handleTransferResize = () => {
    this.resizeTransferEffect();
  };

  private disposeTransferEffect(): void {
    if (this.transferFrame !== null) {
      cancelAnimationFrame(this.transferFrame);
      this.transferFrame = null;
    }
    window.removeEventListener("resize", this.handleTransferResize);
    this.transferRenderer?.dispose();
    this.transferCanvas?.remove();
    this.transferRenderer = null;
    this.transferScene = null;
    this.transferCamera = null;
    this.transferCanvas = null;
  }
}
