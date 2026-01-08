"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ChevronRight, UserPlus, Save, Trash2 } from "lucide-react";
import { GAME_CONSTANTS } from "../../utils/constants";

export const PlayersScreen: React.FC = () => {
  const {
    players,
    updatePlayerName,
    deletePlayer,
    addPlayer,
    savePlayers,
    continueToConfig,
    setScreen,
  } = useGame();

  const canContinue = players.length >= GAME_CONSTANTS.MIN_PLAYERS;

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <SimpleHeader title="👥 Joueurs" onBack={() => setScreen("home")} />

        <Card variant="default" padding="md" className="mb-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                {players.length} joueur{players.length > 1 ? "s" : ""}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Personnalisez les noms des joueurs
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="success"
                size="sm"
                icon={Save}
                onClick={savePlayers}
              >
                <span className="hidden sm:inline text-sm">Sauvegarder</span>
                <span className="sm:hidden">💾</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={UserPlus}
                onClick={addPlayer}
              >
                <span className="hidden sm:inline text-sm">Ajouter</span>
                <span className="sm:hidden">➕</span>
              </Button>
            </div>
          </div>

          {/* Grid Layout for Web, Stack for Mobile */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="bg-gradient-to-br from-orange-50 to-amber-50 w-full rounded-lg p-3 border-2 border-orange-200 hover:border-orange-400 hover:shadow-md transition-all group"
              >
                <div className="flex w-fit items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-nowrap text-orange-600 font-semibold uppercase tracking-wide">
                      Joueur {index + 1}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePlayer(player.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group/delete"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500 group-hover/delete:scale-110 transition-transform" />
                  </button>
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="w-full bg-white border-2 border-orange-300 rounded-lg px-3 py-2 font-medium text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200 transition-all"
                  placeholder="Nom du joueur"
                />
              </div>
            ))}
          </div>

          {!canContinue && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-3 rounded-lg shadow-sm">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-bold text-sm text-yellow-800 mb-0.5">
                    Joueurs insuffisants
                  </p>
                  <p className="text-xs text-yellow-700">
                    Il faut au moins {GAME_CONSTANTS.MIN_PLAYERS} joueurs pour
                    commencer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Button
          variant="warning"
          size="md"
          icon={ChevronRight}
          iconPosition="right"
          fullWidth
          onClick={continueToConfig}
          disabled={!canContinue}
          className="shadow-lg text-sm"
        >
          🇸🇳 Continuer vers la Configuration
        </Button>
      </Container>
    </PageContainer>
  );
};

export default PlayersScreen;
