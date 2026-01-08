"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Header } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Trophy, Eye } from "lucide-react";
import {
  getRoleIcon,
  getRoleColor,
  getRoleLabel,
} from "../../utils/gameHelpers";
import { VICTORY_MESSAGES } from "../../utils/constants";

export const ResultsScreen: React.FC = () => {
  const { currentGame, roundHistory, resetGame, setScreen } = useGame();

  if (!currentGame || !currentGame.winner) return null;

  const winnerLabel =
    currentGame.winner === "citizens"
      ? "Citoyens"
      : currentGame.winner === "undercover"
        ? "Undercovers"
        : "Mr White";

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <Header
          title="🏆 Fin de Partie"
          showBack
          onBack={() => setScreen("home")}
          variant="transparent"
        />

        <div className="text-center mb-6 md:mb-8">
          <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl glow-senegal animate-pulse">
            <Trophy className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Victoire des
            <br />
            {winnerLabel} ! 🇸🇳
          </h3>
          <p className="text-gray-700 text-sm md:text-base px-4 font-semibold">
            {VICTORY_MESSAGES[currentGame.winner]}
          </p>
        </div>

        <Card variant="default" padding="md" className="mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-700 text-sm md:text-base font-bold">
              🔄 TOURS
            </span>
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-2 rounded-full">
              {currentGame.round}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-700 text-sm md:text-base font-bold">
              ❌ ÉLIMINÉS
            </span>
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-full">
              {currentGame.players.filter((p) => p.eliminated).length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm md:text-base font-bold">
              🗳️ VOTES
            </span>
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2 rounded-full">
              {roundHistory.length}
            </span>
          </div>
        </Card>

        <Card
          variant="default"
          padding="md"
          className="mb-6 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            <span className="font-bold text-base md:text-lg text-purple-900">
              🎭 Révélation des Rôles
            </span>
          </div>
          <div className="space-y-3">
            {currentGame.players.map((player) => {
              const Icon = player.role ? getRoleIcon(player.role) : null;
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 ${player.role ? getRoleColor(player.role) : "bg-gray-500"} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm md:text-base truncate text-gray-900">
                        {player.name}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 truncate">
                        {player.role === "citizen" &&
                          `Citoyen • Mot: "${currentGame.citizenWord}"`}
                        {player.role === "undercover" &&
                          `Undercover • Mot: "${currentGame.undercoverWord}"`}
                        {player.role === "mrwhite" && `Mr White • Aucun mot`}
                      </div>
                    </div>
                  </div>
                  {player.eliminated && (
                    <span className="text-xs bg-red-500/30 px-2 py-1 rounded font-semibold flex-shrink-0 ml-2">
                      ÉLIMINÉ
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-3 md:space-y-4">
          <Button
            variant="warning"
            size="lg"
            fullWidth
            onClick={resetGame}
            className="glow-senegal"
          >
            🔄 Rejouer
          </Button>

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={() => setScreen("home")}
          >
            🏠 Retour au Menu Principal
          </Button>
        </div>

        <div className="h-8" />
      </Container>
    </PageContainer>
  );
};

export default ResultsScreen;
