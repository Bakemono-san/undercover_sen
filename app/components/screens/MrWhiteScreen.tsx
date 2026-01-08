"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Crown } from "lucide-react";
import { GridContainer } from "../layout/Container";

export const MrWhiteScreen: React.FC = () => {
  const { currentGame, mrWhiteGuess } = useGame();

  if (!currentGame) return null;

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <div className="text-center mb-6 md:mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
            <Crown className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            Mr White éliminé !
          </h2>
          <p className="text-purple-600 text-sm md:text-base font-semibold">
            Il a une dernière chance...
          </p>
        </div>

        <Card variant="default" padding="lg" className="mb-6 md:mb-8 shadow-lg">
          <div className="text-center mb-4 md:mb-6">
            <p className="text-base md:text-lg mb-4 md:mb-6">
              Mr White peut deviner le mot des citoyens pour gagner la partie !
            </p>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-purple-200">
              <div className="text-xs md:text-sm text-purple-700 mb-1 md:mb-2 font-semibold">
                Mot des citoyens :
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-600">
                {currentGame.citizenWord}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-center text-gray-600">
            Mr White a-t-il correctement deviné le mot ?
          </p>
        </Card>

        <GridContainer columns={2} gap="md">
          <Button
            variant="success"
            size="lg"
            onClick={() => mrWhiteGuess(true)}
            className="py-6 md:py-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">✓ Oui</div>
              <div className="text-xs md:text-sm font-normal opacity-80">
                Mr White gagne
              </div>
            </div>
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={() => mrWhiteGuess(false)}
            className="py-6 md:py-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-1">✗ Non</div>
              <div className="text-xs md:text-sm font-normal opacity-80">
                Citoyens gagnent
              </div>
            </div>
          </Button>
        </GridContainer>
      </Container>
    </PageContainer>
  );
};

export default MrWhiteScreen;
