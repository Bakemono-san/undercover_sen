import { Themes } from "../types/game";

// Game themes with Senegalese cultural content
export const THEMES: Themes = {
  food: {
    name: "🍲 Cuisine",
    pairs: [
      ["Thiéboudienne", "Yassa"],
      ["Mafé", "Domoda"],
      ["Pastels", "Fataya"],
      ["Thiéré", "Ngalakh"],
      ["Attiéké", "Couscous"],
      ["Bissap", "Bouye"],
      ["Café Touba", "Thé Attaya"],
      ["Ceebu Jën", "Ceebu Yapp"],
      ["Ndambé", "Soupou Kanja"],
      ["Mbaxal", "Lakhou Bissap"],
      ["Chakri", "Beignet"],
      ["Accara", "Nems"],
    ],
  },
  transport: {
    name: "🚌 Transport",
    pairs: [
      ["Car Rapide", "Ndiaga Ndiaye"],
      ["Tata", "Clando"],
      ["Bâché", "Sept-place"],
      ["Taxi", "Uber"],
      ["Charrette", "Calèche"],
      ["TER", "Train"],
      ["Diaga Diaga", "Jakartaman"],
      ["Garage Pompiers", "Petersen"],
    ],
  },
  places: {
    name: "📍 Lieux",
    pairs: [
      ["Sandaga", "HLM"],
      ["Plateau", "Almadies"],
      ["Touba", "Tivaouane"],
      ["Lac Rose", "Île de Gorée"],
      ["Marché Kermel", "Marché Tilène"],
      ["AIBD", "LSS"],
      ["Monument Renaissance", "Place Soweto"],
      ["Yoff", "Ouakam"],
      ["Medina", "Parcelles Assainies"],
      ["Dakar Dem Dikk", "Colobane"],
    ],
  },
  culture: {
    name: "🎭 Culture",
    pairs: [
      ["Lutte Sénégalaise", "Football"],
      ["Sabar", "Mbalax"],
      ["Tabaski", "Korité"],
      ["Navétanes", "CAN"],
      ["Youssou Ndour", "Baaba Maal"],
      ["Thiossane", "Diourbel"],
      ["Teranga", "Jom"],
      ["Baye Fall", "Mouride"],
      ["Griot", "Gewel"],
      ["Ndawrabine", "Gamou"],
      ["Xessal", "Tëgg"],
      ["Wolof", "Pulaar"],
    ],
  },
};

// Game constants
export const GAME_CONSTANTS = {
  MIN_PLAYERS: 4,
  DEFAULT_PLAYER_COUNT: 8,
  MAX_UNDERCOVER: 3,
  MIN_UNDERCOVER: 1,
  DISCUSSION_TIME_LIMIT: 180, // 3 minutes in seconds
} as const;

// Storage keys
export const STORAGE_KEYS = {
  SAVED_PLAYERS: "undercover_saved_players",
  CUSTOM_THEME_PACKS: "undercover_custom_theme_packs",
} as const;

// Responsive breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Senegalese flag colors and cultural palette - Professional UI/UX System
export const SENEGAL_COLORS = {
  // Primary Flag Colors (High Visibility)
  green: "#00A86B", // Vibrant jade green
  yellow: "#FFBF00", // Amber yellow (WCAG compliant)
  red: "#E63946", // Vivid red

  // Cultural Accent Colors (Enhanced Visibility)
  teranga: "#FF6B35", // Bright warm orange
  ocean: "#0077BE", // Deep sky blue
  sand: "#E8A87C", // Light sandy brown
  sunset: "#FF6B35", // Coral sunset
  baobab: "#A0522D", // Sienna brown
} as const;

// Color schemes for roles with high visibility
export const ROLE_COLORS = {
  citizen: {
    bg: "bg-green-600",
    bgLight: "bg-green-50",
    text: "text-green-800",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    shadow: "shadow-green-500/60",
    border: "border-green-500",
  },
  undercover: {
    bg: "bg-orange-600",
    bgLight: "bg-orange-50",
    text: "text-orange-800",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadow: "shadow-orange-500/60",
    border: "border-orange-500",
  },
  mrwhite: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-800",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-600",
    shadow: "shadow-purple-500/60",
    border: "border-purple-500",
  },
} as const;

// Role labels
export const ROLE_LABELS = {
  citizen: "Citoyen",
  undercover: "Undercover",
  mrwhite: "Mr White",
} as const;

// Victory messages with Senegalese flair
export const VICTORY_MESSAGES = {
  citizens:
    "Teranga bi dafa nekk! Les imposteurs ont été démasqués. Le Sénégal est fier de vous ! 🇸🇳",
  undercover:
    "Ay lutteur yi gagné! Les Undercovers ont infiltré avec la ruse du lion ! 🦁",
  mrwhite:
    "Comme un vrai Griot, Mr White a deviné le mot et remporte la victoire ! 🎭",
} as const;

// Custom word pairs storage key
export const CUSTOM_WORDS_KEY = "undercover_custom_words";

// Maximum custom word pairs
export const MAX_CUSTOM_PAIRS = 50;

// Icon options for theme packs
export const THEME_PACK_ICONS = ["🎨", "🎭", "🎪", "🎯", "🎲", "🎮", "🏆", "⭐", "🌟", "💎"] as const;

// Icon options for categories
export const CATEGORY_ICONS = ["📁", "🍲", "🚌", "📍", "🎭", "🎪", "🎯", "🎲", "🎮", "⚽"] as const;

// Custom theme prefix for theme IDs
export const CUSTOM_THEME_PREFIX = "custom-" as const;
