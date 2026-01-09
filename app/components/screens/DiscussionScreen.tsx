"use client";

import React, { useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Timer } from "../ui/Timer";
import { ChevronRight, Users } from "lucide-react";
import { getActivePlayers, getRoleIcon } from "../../utils/gameHelpers";
import { GAME_CONSTANTS } from "../../utils/constants";

export const DiscussionScreen: React.FC = () => {
  const { currentGame, discussionTimer, setDiscussionTimer, startVoting } =
    useGame();

  useEffect(() => {
    if (discussionTimer < GAME_CONSTANTS.DISCUSSION_TIME_LIMIT) {
      const timer = setInterval(() => {
        setDiscussionTimer(discussionTimer + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [discussionTimer, setDiscussionTimer]);

  if (!currentGame) return null;

  const activePlayers = getActivePlayers(currentGame.players);

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Manche {currentGame.round}
          </h2>
          <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold text-white shadow-lg border-2 border-white/30">
            DISCUSSION
          </div>
        </div>

        <Card variant="glass" padding="lg" className="mb-6">
          <Timer time={discussionTimer} size="lg" label="Temps de discussion" />
          <div className="mt-4 text-center text-sm md:text-base text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 py-2 rounded-lg">
            DÉCRIS TON MOT SANS LE DIRE
          </div>
        </Card>

        <Card variant="default" padding="md" className="mb-6 shadow-lg border-2 border-yellow-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
            <span className="font-bold text-base md:text-lg text-gray-900">
              Joueurs actifs
            </span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {activePlayers.map((player) => {
              const Icon = player.role ? getRoleIcon(player.role) : Users;
              return (
                <div key={player.id} className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-full mx-auto mb-2 shadow-lg flex items-center justify-center border-2 border-white/30">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="text-xs md:text-sm truncate text-gray-900">
                    {player.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Button
          variant="primary"
          size="lg"
          icon={ChevronRight}
          iconPosition="right"
          fullWidth
          onClick={startVoting}
        >
          Passer au vote
        </Button>
      </Container>
    </PageContainer>
  );
};

export default DiscussionScreen;
