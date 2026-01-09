// Player types
export interface Player {
  id: number;
  name: string;
  eliminated: boolean;
  role?: PlayerRole;
  word?: string;
  votes?: number;
}

export type PlayerRole = "citizen" | "undercover" | "mrwhite";

// Game configuration
export interface GameConfig {
  undercoverCount: number;
  hasMrWhite: boolean;
  theme: ThemeType;
}

export type ThemeType = "all" | "food" | "transport" | "places" | "culture" | string;

// Theme structure
export interface Theme {
  name: string;
  pairs: [string, string][];
}

export interface Themes {
  food: Theme;
  transport: Theme;
  places: Theme;
  culture: Theme;
}

// Custom Theme Pack structure
export interface CustomThemePack {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: {
    [key: string]: Theme;
  };
  createdAt: string;
  updatedAt: string;
}

// Game state
export type GamePhase =
  | "reveal"
  | "discussion"
  | "vote"
  | "mrwhite_guess"
  | "end";

export interface CurrentGame {
  players: Player[];
  citizenWord: string;
  undercoverWord: string;
  round: number;
  phase: GamePhase;
  winner?: WinnerType;
}

export type WinnerType = "citizens" | "undercover" | "mrwhite";

// Round history
export interface RoundHistoryItem {
  round: number;
  eliminated: string;
  role: PlayerRole;
}

// Screen types
export type ScreenType =
  | "home"
  | "saved"
  | "rules"
  | "players"
  | "config"
  | "reveal"
  | "discussion"
  | "vote"
  | "mrwhite"
  | "results"
  | "wordshop"
  | "themebuilder";

// Vote results
export interface VoteResults {
  [playerId: string]: number;
}

// Game context type
export interface GameContextType {
  // Screen state
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;

  // Player state
  players: Player[];
  setPlayers: (players: Player[]) => void;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  editingPlayers: boolean;
  setEditingPlayers: (editing: boolean) => void;
  savedPlayers: string[];
  setSavedPlayers: (players: string[]) => void;

  // Game configuration
  gameConfig: GameConfig;
  setGameConfig: (config: GameConfig) => void;

  // Current game state
  currentGame: CurrentGame | null;
  setCurrentGame: (game: CurrentGame | null) => void;
  revealedPlayer: number | null;
  setRevealedPlayer: (index: number | null) => void;
  discussionTimer: number;
  setDiscussionTimer: (time: number) => void;
  voteResults: VoteResults;
  setVoteResults: (results: VoteResults) => void;
  roundHistory: RoundHistoryItem[];
  setRoundHistory: (history: RoundHistoryItem[]) => void;

  // Actions
  savePlayers: () => void;
  loadSavedPlayers: () => void;
  updatePlayerName: (id: number, name: string) => void;
  deletePlayer: (id: number) => void;
  addPlayer: () => void;
  startGame: () => void;
  continueToConfig: () => void;
  launchGame: () => void;
  nextReveal: () => void;
  startVoting: () => void;
  vote: (playerId: number, voterId: number) => void;
  endVoting: () => void;
  mrWhiteGuess: (correct: boolean) => void;
  resetGame: () => void;
}
