"use client";

import React from "react";
import { useGame } from "../contexts/GameContext";
import { HomeScreen } from "./screens/HomeScreen";
import { PlayersScreen } from "./screens/PlayersScreen";
import { ConfigScreen } from "./screens/ConfigScreen";
import { RulesScreen } from "./screens/RulesScreen";
import { SavedPlayersScreen } from "./screens/SavedPlayersScreen";
import { RevealScreen } from "./screens/RevealScreen";
import { DiscussionScreen } from "./screens/DiscussionScreen";
import { VoteScreen } from "./screens/VoteScreen";
import { MrWhiteScreen } from "./screens/MrWhiteScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { WordShopScreen } from "./screens/WordShopScreen";
import { ThemeBuilderScreen } from "./screens/ThemeBuilderScreen";

export const GameContainer: React.FC = () => {
  const { screen } = useGame();

  // Route to appropriate screen based on state
  switch (screen) {
    case "home":
      return <HomeScreen />;
    case "saved":
      return <SavedPlayersScreen />;
    case "rules":
      return <RulesScreen />;
    case "players":
      return <PlayersScreen />;
    case "config":
      return <ConfigScreen />;
    case "reveal":
      return <RevealScreen />;
    case "discussion":
      return <DiscussionScreen />;
    case "vote":
      return <VoteScreen />;
    case "mrwhite":
      return <MrWhiteScreen />;
    case "results":
      return <ResultsScreen />;
    case "wordshop":
      return <WordShopScreen />;
    case "themebuilder":
      return <ThemeBuilderScreen />;
    default:
      return <HomeScreen />;
  }
};

export default GameContainer;
