"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Users } from "lucide-react";

export const SavedPlayersScreen: React.FC = () => {
  const { savedPlayers, loadSavedPlayers, setSavedPlayers, setScreen } =
    useGame();

  const clearAllPlayers = () => {
    if (confirm("Supprimer tous les joueurs sauvegardés ?")) {
      setSavedPlayers([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("undercover_saved_players");
      }
    }
  };

  return (
    <PageContainer background="gradient-warm">
      <Container>
        <SimpleHeader
          title="Joueurs sauvegardés"
          onBack={() => setScreen("home")}
        />

        {savedPlayers.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <Users className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2 text-base md:text-lg">
              Aucun joueur sauvegardé
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Créez une partie et sauvegardez vos joueurs
            </p>
          </div>
        ) : (
          <div>
            <Card variant="default" padding="md" className="mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900 text-base md:text-lg">
                  {savedPlayers.length} joueur
                  {savedPlayers.length > 1 ? "s" : ""}
                </span>
                <button
                  onClick={clearAllPlayers}
                  className="text-red-500 text-sm md:text-base font-semibold hover:text-red-600"
                >
                  Tout supprimer
                </button>
              </div>
              <div className="space-y-2 md:space-y-3">
                {savedPlayers.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-orange-50 rounded-xl p-3 md:p-4"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                      {i + 1}
                    </div>
                    <span className="flex-1 font-medium text-gray-900 text-sm md:text-base">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={loadSavedPlayers}
            >
              Charger ces joueurs
            </Button>
          </div>
        )}
      </Container>
    </PageContainer>
  );
};

export default SavedPlayersScreen;
