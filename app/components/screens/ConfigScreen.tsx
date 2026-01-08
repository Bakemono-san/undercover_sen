"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ChevronRight, Eye } from "lucide-react";
import { GAME_CONSTANTS } from "../../utils/constants";

export const ConfigScreen: React.FC = () => {
  const { players, gameConfig, setGameConfig, launchGame, setScreen } =
    useGame();

  const incrementUndercover = () => {
    setGameConfig({
      ...gameConfig,
      undercoverCount: Math.min(
        GAME_CONSTANTS.MAX_UNDERCOVER,
        gameConfig.undercoverCount + 1,
      ),
    });
  };

  const decrementUndercover = () => {
    setGameConfig({
      ...gameConfig,
      undercoverCount: Math.max(
        GAME_CONSTANTS.MIN_UNDERCOVER,
        gameConfig.undercoverCount - 1,
      ),
    });
  };

  const toggleMrWhite = () => {
    setGameConfig({
      ...gameConfig,
      hasMrWhite: !gameConfig.hasMrWhite,
    });
  };

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <SimpleHeader
          title="⚙️ Configuration"
          onBack={() => setScreen("players")}
        />

        <div className="space-y-4 md:space-y-5">
          {/* Player Count Display */}
          <Card
            variant="gradient"
            padding="md"
            className="bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 text-white shadow-2xl border-4 border-white/30"
          >
            <h3 className="text-base md:text-lg font-bold mb-1 text-center text-white drop-shadow-lg">
              Nombre de joueurs
            </h3>
            <p className="text-center text-white/90 text-xs mb-3 font-medium">
              Équipe prête pour la Teranga ! 🇸🇳
            </p>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white rounded-full text-4xl md:text-5xl font-black shadow-2xl border-4 border-yellow-400 text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700">
                {players.length}
              </div>
              <div className="text-xs text-white mt-2 font-bold uppercase tracking-wide bg-white/30 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg border-2 border-white/40">
                🇸🇳 JOUEURS
              </div>
            </div>
          </Card>

          {/* Special Roles Configuration */}
          <Card
            variant="default"
            padding="md"
            className="bg-white shadow-2xl border-3 border-orange-300"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-orange-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-pink-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg text-gray-900">
                  🎭 Rôles Spéciaux
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                  Personnalise ton expérience Teranga
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Undercover Count */}
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4 border-3 border-orange-400 hover:border-orange-600 hover:shadow-xl transition-all">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shadow-md border-2 border-orange-700/30">
                      <span className="text-base">🕵️</span>
                    </div>
                    <div>
                      <span className="font-bold text-sm md:text-base text-gray-900 block drop-shadow-sm">
                        Undercover
                      </span>
                      <p className="text-xs text-gray-800 font-medium">
                        Nombre d&apos;imposteurs
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementUndercover}
                      disabled={
                        gameConfig.undercoverCount ===
                        GAME_CONSTANTS.MIN_UNDERCOVER
                      }
                      className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale rounded-lg flex items-center justify-center text-xl font-black transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-white border-2 border-red-700/30"
                    >
                      −
                    </button>
                    <div className="w-12 text-center">
                      <div className="text-3xl font-black bg-gradient-to-br from-orange-700 to-red-700 bg-clip-text text-transparent drop-shadow-sm">
                        {gameConfig.undercoverCount}
                      </div>
                    </div>
                    <button
                      onClick={incrementUndercover}
                      disabled={
                        gameConfig.undercoverCount ===
                        GAME_CONSTANTS.MAX_UNDERCOVER
                      }
                      className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale rounded-lg flex items-center justify-center text-xl font-black transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-white border-2 border-green-700/30"
                    >
                      +
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full font-bold shadow-md border border-purple-700/30">
                      ⭐ Recommandé
                    </span>
                  </div>
                </div>
              </div>

              {/* Mr. White Toggle */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-3 border-purple-400 hover:border-purple-600 hover:shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md border-2 border-purple-700/30">
                      <span className="text-base">👑</span>
                    </div>
                    <div>
                      <span className="font-bold text-sm md:text-base text-gray-900 block drop-shadow-sm">
                        Mr. White
                      </span>
                      <p className="text-xs text-gray-800 font-medium">
                        Rôle mystérieux sans mot
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMrWhite}
                    className={`relative w-14 h-8 rounded-full transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95 border-3 ${
                      gameConfig.hasMrWhite
                        ? "bg-gradient-to-r from-green-600 to-emerald-700 border-green-500"
                        : "bg-gray-400 border-gray-500"
                    }`}
                    aria-label={
                      gameConfig.hasMrWhite
                        ? "Désactiver Mr White"
                        : "Activer Mr White"
                    }
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
                        gameConfig.hasMrWhite
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    >
                      <span className="text-xs">
                        {gameConfig.hasMrWhite ? "✓" : "✕"}
                      </span>
                    </div>
                  </button>
                </div>
                {gameConfig.hasMrWhite && (
                  <div className="mt-3 pt-3 border-t-2 border-purple-300">
                    <p className="text-[10px] text-purple-800 font-bold bg-purple-200 px-2 py-1.5 rounded-lg border border-purple-400">
                      💡 Mr. White ne connaît pas le mot mais peut gagner en le
                      devinant !
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Launch Button */}
          <Button
            variant="warning"
            size="md"
            icon={ChevronRight}
            iconPosition="right"
            fullWidth
            onClick={launchGame}
            className="shadow-2xl text-sm font-black"
          >
            🇸🇳 Lancer la partie
          </Button>
        </div>

        <div className="h-8" />
      </Container>
    </PageContainer>
  );
};

export default ConfigScreen;
