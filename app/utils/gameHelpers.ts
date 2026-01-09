import { PlayerRole, Player, CurrentGame, CustomThemePack, Theme } from "../types/game";
import { ROLE_COLORS, ROLE_LABELS, THEMES } from "./constants";
import { Shield, Eye, Crown } from "lucide-react";

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Get icon component for a role
 */
export const getRoleIcon = (role: PlayerRole) => {
  switch (role) {
    case "citizen":
      return Shield;
    case "undercover":
      return Eye;
    case "mrwhite":
      return Crown;
  }
};

/**
 * Get color class for a role
 */
export const getRoleColor = (role: PlayerRole): string => {
  return ROLE_COLORS[role].bg;
};

/**
 * Get gradient class for a role
 */
export const getRoleGradient = (role: PlayerRole): string => {
  return ROLE_COLORS[role].gradient;
};

/**
 * Get text color class for a role
 */
export const getRoleTextColor = (role: PlayerRole): string => {
  return ROLE_COLORS[role].text;
};

/**
 * Get background light color for a role
 */
export const getRoleLightBg = (role: PlayerRole): string => {
  return ROLE_COLORS[role].bgLight;
};

/**
 * Get label for a role
 */
export const getRoleLabel = (role: PlayerRole): string => {
  return ROLE_LABELS[role];
};

/**
 * Get all word pairs from themes including custom pairs and selected theme
 */
export const getAllPairs = (themeType?: string): [string, string][] => {
  let pairs: [string, string][] = [];

  // Check if it's a custom theme pack
  if (themeType && themeType.startsWith("custom-")) {
    const themeId = themeType.replace("custom-", "");
    if (typeof window !== "undefined") {
      try {
        const customPacksJSON = localStorage.getItem("undercover_custom_theme_packs");
        if (customPacksJSON) {
          const customPacks: CustomThemePack[] = JSON.parse(customPacksJSON);
          const selectedPack = customPacks.find((pack) => pack.id === themeId);
          if (selectedPack) {
            // Get all pairs from all categories in the custom pack
            Object.values(selectedPack.categories).forEach((category: Theme) => {
              pairs.push(...category.pairs);
            });
            return pairs;
          }
        }
      } catch (e) {
        console.error("Failed to load custom theme pack", e);
      }
    }
  }

  // Handle default themes
  if (!themeType || themeType === "all") {
    pairs = Object.values(THEMES).flatMap((theme) => theme.pairs);
  } else if (themeType === "food") {
    pairs = THEMES.food.pairs;
  } else if (themeType === "transport") {
    pairs = THEMES.transport.pairs;
  } else if (themeType === "places") {
    pairs = THEMES.places.pairs;
  } else if (themeType === "culture") {
    pairs = THEMES.culture.pairs;
  }

  // Load custom word pairs from WordShop (legacy feature)
  if (typeof window !== "undefined") {
    try {
      const customPairsJSON = localStorage.getItem("undercover_custom_words");
      if (customPairsJSON) {
        const customPairs = JSON.parse(customPairsJSON);
        const customWordPairs: [string, string][] = customPairs.map(
          (pair: { word1: string; word2: string }) => [pair.word1, pair.word2],
        );
        // Only add custom word pairs if using "all" theme
        if (!themeType || themeType === "all") {
          pairs = [...pairs, ...customWordPairs];
        }
      }
    } catch (e) {
      console.error("Failed to load custom words", e);
    }
  }

  return pairs;
};

/**
 * Get a random word pair based on selected theme
 */
export const getRandomPair = (themeType?: string): [string, string] => {
  const allPairs = getAllPairs(themeType);
  if (allPairs.length === 0) {
    // Fallback to all default themes if no pairs found
    const fallbackPairs = getAllPairs("all");
    return fallbackPairs[Math.floor(Math.random() * fallbackPairs.length)];
  }
  return allPairs[Math.floor(Math.random() * allPairs.length)];
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get active (non-eliminated) players
 */
export const getActivePlayers = (players: Player[]): Player[] => {
  return players.filter((p) => !p.eliminated);
};

/**
 * Get players by role
 */
export const getPlayersByRole = (
  players: Player[],
  role: PlayerRole,
): Player[] => {
  return players.filter((p) => p.role === role);
};

/**
 * Get count of active players by role
 */
export const getActivePlayerCountByRole = (
  players: Player[],
  role: PlayerRole,
): number => {
  return getActivePlayers(players).filter((p) => p.role === role).length;
};

/**
 * Check if citizens won
 */
export const checkCitizensWin = (currentGame: CurrentGame): boolean => {
  const activePlayers = getActivePlayers(currentGame.players);
  const undercoversLeft = getPlayersByRole(activePlayers, "undercover").length;
  const mrWhiteLeft = getPlayersByRole(activePlayers, "mrwhite").length;
  return undercoversLeft === 0 && mrWhiteLeft === 0;
};

/**
 * Check if undercovers won
 */
export const checkUndercoversWin = (currentGame: CurrentGame): boolean => {
  const activePlayers = getActivePlayers(currentGame.players);
  const undercoversLeft = getPlayersByRole(activePlayers, "undercover").length;
  const citizensLeft = getPlayersByRole(activePlayers, "citizen").length;
  return undercoversLeft >= citizensLeft;
};

/**
 * Get player with most votes
 */
export const getPlayerWithMostVotes = (voteResults: {
  [key: string]: number;
}): string | null => {
  const entries = Object.entries(voteResults);
  if (entries.length === 0) return null;

  const maxVotes = Math.max(...Object.values(voteResults));
  const eliminated = entries.find(([_, votes]) => votes === maxVotes);
  return eliminated ? eliminated[0] : null;
};

/**
 * Generate player name
 */
export const generatePlayerName = (index: number): string => {
  return `Joueur ${index + 1}`;
};

/**
 * Validate player count for game start
 */
export const isValidPlayerCount = (count: number): boolean => {
  return count >= 4;
};

/**
 * Calculate recommended undercover count based on player count
 */
export const getRecommendedUndercoverCount = (playerCount: number): number => {
  if (playerCount <= 5) return 1;
  if (playerCount <= 8) return 2;
  return 3;
};

/**
 * Check if device is tablet size
 */
export const isTabletSize = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is mobile size
 */
export const isMobileSize = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

/**
 * Get responsive container class
 */
export const getResponsiveContainer = (): string => {
  if (typeof window === "undefined") return "max-w-md";

  if (window.innerWidth >= 1024) {
    return "max-w-2xl";
  } else if (window.innerWidth >= 768) {
    return "max-w-xl";
  }
  return "max-w-md";
};
