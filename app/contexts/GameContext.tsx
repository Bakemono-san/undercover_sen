"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GameContextType,
  Player,
  GameConfig,
  CurrentGame,
  ScreenType,
  VoteResults,
  RoundHistoryItem,
  PlayerRole,
} from "../types/game";
import { useSavedPlayers } from "../hooks/useLocalStorage";
import {
  getRandomPair,
  shuffleArray,
  getActivePlayers,
  getPlayersByRole,
  checkCitizensWin,
  checkUndercoversWin,
  getPlayerWithMostVotes,
  generatePlayerName,
} from "../utils/gameHelpers";
import { GAME_CONSTANTS } from "../utils/constants";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // Screen state
  const [screen, setScreen] = useState<ScreenType>("home");
  const [showMenu, setShowMenu] = useState(false);

  // Player state
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(
    GAME_CONSTANTS.DEFAULT_PLAYER_COUNT,
  );
  const [editingPlayers, setEditingPlayers] = useState(false);

  // Saved players
  const { savedPlayers, savePlayers: savePlayersToStorage } = useSavedPlayers();
  const [savedPlayersState, setSavedPlayersState] = useState<string[]>([]);

  // Sync saved players state
  useEffect(() => {
    setSavedPlayersState(savedPlayers);
  }, [savedPlayers]);

  // Game configuration
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    undercoverCount: 1,
    hasMrWhite: true,
    theme: "all",
  });

  // Current game state
  const [currentGame, setCurrentGame] = useState<CurrentGame | null>(null);
  const [revealedPlayer, setRevealedPlayer] = useState<number | null>(null);
  const [discussionTimer, setDiscussionTimer] = useState(0);
  const [voteResults, setVoteResults] = useState<VoteResults>({});
  const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());
  const [roundHistory, setRoundHistory] = useState<RoundHistoryItem[]>([]);

  // Save players to localStorage
  const savePlayers = () => {
    if (players.length > 0) {
      const playerNames = players.map((p) => p.name);
      savePlayersToStorage(playerNames);
      setSavedPlayersState(playerNames);
      alert("✅ Joueurs sauvegardés !");
    }
  };

  // Load saved players
  const loadSavedPlayers = () => {
    if (savedPlayersState.length > 0) {
      const loadedPlayers: Player[] = savedPlayersState.map((name, i) => ({
        id: i + 1,
        name: name,
        eliminated: false,
      }));
      setPlayers(loadedPlayers);
      setPlayerCount(loadedPlayers.length);
      setEditingPlayers(true);
      setScreen("players");
    }
  };

  // Update player name
  const updatePlayerName = (id: number, newName: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name: newName } : p)));
  };

  // Delete player
  const deletePlayer = (id: number) => {
    const newPlayers = players
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, id: i + 1 }));
    setPlayers(newPlayers);
    setPlayerCount(newPlayers.length);
  };

  // Add player
  const addPlayer = () => {
    const newPlayer: Player = {
      id: players.length + 1,
      name: generatePlayerName(players.length),
      eliminated: false,
    };
    setPlayers([...players, newPlayer]);
    setPlayerCount(players.length + 1);
  };

  // Start game
  const startGame = () => {
    if (players.length > 0) {
      setScreen("players");
      setEditingPlayers(true);
    } else {
      const newPlayers: Player[] = Array.from(
        { length: playerCount },
        (_, i) => ({
          id: i + 1,
          name: generatePlayerName(i),
          eliminated: false,
        }),
      );
      setPlayers(newPlayers);
      setScreen("players");
      setEditingPlayers(true);
    }
  };

  // Continue to config
  const continueToConfig = () => {
    setEditingPlayers(false);
    setScreen("config");
  };

  // Launch game
  const launchGame = () => {
    const pair = getRandomPair();
    const [citizenWord, undercoverWord] = pair;

    const roles: { role: PlayerRole; word: string }[] = [];

    // Assign roles
    for (let i = 0; i < playerCount; i++) {
      if (i < gameConfig.undercoverCount) {
        roles.push({ role: "undercover", word: undercoverWord });
      } else if (i === gameConfig.undercoverCount && gameConfig.hasMrWhite) {
        roles.push({ role: "mrwhite", word: "" });
      } else {
        roles.push({ role: "citizen", word: citizenWord });
      }
    }

    // Shuffle roles
    const shuffledRoles = shuffleArray(roles);

    // Create game players
    const gamePlayers: Player[] = players.map((p, i) => ({
      ...p,
      ...shuffledRoles[i],
      votes: 0,
    }));

    setCurrentGame({
      players: gamePlayers,
      citizenWord,
      undercoverWord,
      round: 1,
      phase: "reveal",
    });
    setRoundHistory([]);
    setScreen("reveal");
    setRevealedPlayer(null);
  };

  // Next reveal
  const nextReveal = () => {
    if (!currentGame) return;

    if (revealedPlayer === null) {
      setRevealedPlayer(0);
    } else if (revealedPlayer < currentGame.players.length - 1) {
      setRevealedPlayer(revealedPlayer + 1);
    } else {
      setRevealedPlayer(null);
      setScreen("discussion");
      setDiscussionTimer(0);
    }
  };

  // Start voting
  const startVoting = () => {
    setScreen("vote");
    setVoteResults({});
    setVotedPlayers(new Set());
  };

  // Vote for a player (each player can vote once)
  const vote = (playerId: number, voterId: number) => {
    // Check if this voter has already voted
    if (votedPlayers.has(voterId)) {
      return; // Already voted, ignore
    }

    const newResults = { ...voteResults };
    newResults[playerId] = (newResults[playerId] || 0) + 1;
    setVoteResults(newResults);

    // Mark this voter as having voted
    const newVotedPlayers = new Set(votedPlayers);
    newVotedPlayers.add(voterId);
    setVotedPlayers(newVotedPlayers);
  };

  // End voting
  const endVoting = () => {
    if (!currentGame) return;

    const eliminatedId = getPlayerWithMostVotes(voteResults);
    if (!eliminatedId) return;

    const eliminatedPlayer = currentGame.players.find(
      (p) => p.id === parseInt(eliminatedId),
    );
    if (!eliminatedPlayer) return;

    const newPlayers = currentGame.players.map((p) =>
      p.id === parseInt(eliminatedId) ? { ...p, eliminated: true } : p,
    );

    setRoundHistory([
      ...roundHistory,
      {
        round: currentGame.round,
        eliminated: eliminatedPlayer.name,
        role: eliminatedPlayer.role!,
      },
    ]);

    const updatedGame = { ...currentGame, players: newPlayers };

    // Check win conditions
    if (checkCitizensWin(updatedGame)) {
      setCurrentGame({
        ...updatedGame,
        winner: "citizens",
        phase: "end",
      });
      setScreen("results");
    } else if (checkUndercoversWin(updatedGame)) {
      setCurrentGame({
        ...updatedGame,
        winner: "undercover",
        phase: "end",
      });
      setScreen("results");
    } else if (eliminatedPlayer.role === "mrwhite") {
      setCurrentGame({
        ...updatedGame,
        phase: "mrwhite_guess",
      });
      setScreen("mrwhite");
    } else {
      setCurrentGame({
        ...updatedGame,
        round: currentGame.round + 1,
        phase: "discussion",
      });
      setScreen("discussion");
      setDiscussionTimer(0);
    }
  };

  // Mr White guess
  const mrWhiteGuess = (correct: boolean) => {
    if (!currentGame) return;

    if (correct) {
      setCurrentGame({
        ...currentGame,
        winner: "mrwhite",
        phase: "end",
      });
    } else {
      const activePlayers = getActivePlayers(currentGame.players);
      const undercoversLeft = getPlayersByRole(
        activePlayers,
        "undercover",
      ).length;
      const citizensLeft = getPlayersByRole(activePlayers, "citizen").length;

      const winner =
        undercoversLeft === 0
          ? "citizens"
          : undercoversLeft >= citizensLeft
            ? "undercover"
            : "citizens";

      setCurrentGame({
        ...currentGame,
        winner,
        phase: "end",
      });
    }
    setScreen("results");
  };

  // Reset game
  const resetGame = () => {
    setCurrentGame(null);
    setPlayers([]);
    setRevealedPlayer(null);
    setDiscussionTimer(0);
    setVoteResults({});
    setRoundHistory([]);
    setScreen("home");
  };

  const value: GameContextType = {
    screen,
    setScreen,
    showMenu,
    setShowMenu,
    players,
    setPlayers,
    playerCount,
    setPlayerCount,
    editingPlayers,
    setEditingPlayers,
    savedPlayers: savedPlayersState,
    setSavedPlayers: setSavedPlayersState,
    gameConfig,
    setGameConfig,
    currentGame,
    setCurrentGame,
    revealedPlayer,
    setRevealedPlayer,
    discussionTimer,
    setDiscussionTimer,
    voteResults,
    setVoteResults,
    roundHistory,
    setRoundHistory,
    savePlayers,
    loadSavedPlayers,
    updatePlayerName,
    deletePlayer,
    addPlayer,
    startGame,
    continueToConfig,
    launchGame,
    nextReveal,
    startVoting,
    vote,
    endVoting,
    mrWhiteGuess,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameContext;
