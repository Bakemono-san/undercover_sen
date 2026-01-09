"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Header } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { RoleDescription } from "../ui/RoleBadge";
import { ChevronRight, Users, EyeOff } from "lucide-react";

export const RevealScreen: React.FC = () => {
  const { currentGame, revealedPlayer, nextReveal, setScreen } = useGame();

  if (!currentGame) return null;

  const currentPlayer =
    revealedPlayer !== null ? currentGame.players[revealedPlayer] : null;

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <Header
          title="RÉVÉLATION"
          showBack
          onBack={() => setScreen("config")}
          variant="dark"
        />

        {currentPlayer === null ? (
          <div className="text-center py-8 md:py-12 text-white">
            <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl border-4 border-white/30">
              <Users className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Prêt à découvrir votre rôle ?
            </h3>
            <p className="text-gray-300 mb-8 px-4 md:px-8 text-sm md:text-base">
              Assurez-vous que personne ne regarde votre écran
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={nextReveal}
              className="mx-auto"
            >
              Voir mon rôle
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 md:py-8 text-white">
            <div className="mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-full mx-auto mb-4 shadow-xl border-4 border-white/30" />
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
                {currentPlayer.name}
              </h3>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border-2 border-yellow-400/30">
                <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-semibold">
                  IDENTITÉ RÉVÉLÉE
                </span>
              </div>
            </div>

            <Card
              variant="glass"
              padding="lg"
              className="mb-6 md:mb-8 text-white"
            >
              {currentPlayer.role && (
                <RoleDescription
                  role={currentPlayer.role}
                  word={currentPlayer.word}
                />
              )}
            </Card>

            <Button
              variant="success"
              size="lg"
              icon={ChevronRight}
              iconPosition="right"
              fullWidth
              onClick={nextReveal}
            >
              {revealedPlayer !== null &&
              revealedPlayer < currentGame.players.length - 1
                ? "Joueur suivant"
                : "Commencer la partie"}
            </Button>
          </div>
        )}
      </Container>
    </PageContainer>
  );
};

export default RevealScreen;
