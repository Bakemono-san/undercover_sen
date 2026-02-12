"use client";

import React, { useState } from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Header } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { GridContainer } from "../layout/Container";
import { Vote, User } from "lucide-react";
import { getActivePlayers } from "../../utils/gameHelpers";

export const VoteScreen: React.FC = () => {
  const { currentGame, voteResults, vote, endVoting, setScreen } = useGame();
  const [selectedVoter, setSelectedVoter] = useState<number | null>(null);
  const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());

  if (!currentGame) return null;

  const activePlayers = getActivePlayers(currentGame.players);
  const votedPlayersCount = Object.keys(voteResults).length;

  const handleVote = (targetId: number) => {
    if (!selectedVoter || votedPlayers.has(selectedVoter)) {
      return;
    }

    vote(targetId, selectedVoter);

    const newVotedPlayers = new Set(votedPlayers);
    newVotedPlayers.add(selectedVoter);
    setVotedPlayers(newVotedPlayers);
    setSelectedVoter(null);
  };

  const getPlayerWithMostVotes = () => {
    if (votedPlayersCount === 0) return null;
    const maxVotes = Math.max(...Object.values(voteResults));
    const eliminatedId = Object.keys(voteResults).find(
      (id) => voteResults[id] === maxVotes,
    );
    return activePlayers.find((p) => p.id === parseInt(eliminatedId || "0"));
  };

  const topVotedPlayer = getPlayerWithMostVotes();

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <Header
          title="PHASE DE VOTE"
          showBack
          onBack={() => setScreen("discussion")}
          variant="dark"
          className="bg-senegal-gradient rounded-xl shadow-lg mb-6 text-white"
          
        />

        {/* Voter Selection */}
        <Card
          variant="default"
          padding="md"
          className="mb-4 shadow-lg border-2 border-yellow-300"
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-base md:text-lg text-gray-900">
              1. Qui vote maintenant ?
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {activePlayers.map((player) => {
              const hasVoted = votedPlayers.has(player.id);
              const isSelected = selectedVoter === player.id;
              return (
                <button
                  key={player.id}
                  onClick={() => !hasVoted && setSelectedVoter(player.id)}
                  disabled={hasVoted}
                  className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                    hasVoted
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : isSelected
                        ? "bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 text-white shadow-lg scale-105 border-2 border-white/30"
                        : "bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 text-gray-700 hover:from-green-100 hover:via-yellow-100 hover:to-red-100 border-2 border-yellow-300"
                  }`}
                >
                  {hasVoted ? "✓" : ""} {player.name}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center">
            {votedPlayers.size} / {activePlayers.length} joueurs ont voté
          </p>
        </Card>

        <Card variant="default" padding="md" className="mb-6 shadow-lg border-2 border-orange-300">
          <div className="flex items-center gap-2 mb-3">
            <Vote className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-base md:text-lg text-gray-900">
              2. Voter contre qui ?
            </h3>
          </div>
          <div className="text-sm md:text-base text-orange-600 font-semibold text-center mb-2">
            Qui est l&apos;Undercover ?
          </div>
        </Card>

        <GridContainer columns={2} gap="md" className="mb-6">
          {activePlayers.map((player) => {
            const votes = voteResults[player.id] || 0;
            const canVote =
              selectedVoter !== null && !votedPlayers.has(selectedVoter);
            return (
              <button
                key={player.id}
                onClick={() => handleVote(player.id)}
                disabled={!canVote}
                className={`rounded-2xl p-4 md:p-5 text-center transition-all ${
                  canVote
                    ? "bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 border-2 border-yellow-300 hover:border-orange-400 hover:shadow-lg active:scale-95 cursor-pointer"
                    : "bg-gray-100 border-2 border-gray-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-full mx-auto mb-2 md:mb-3 shadow-lg relative border-2 border-white/30">
                  {votes > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-red-600 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-lg border-2 border-white">
                      {votes}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-sm md:text-base truncate text-gray-900">
                  {player.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {votes > 0 ? `${votes} vote${votes > 1 ? "s" : ""}` : "VOTE"}
                </div>
              </button>
            );
          })}
        </GridContainer>

        <Button
          variant="primary"
          size="lg"
          icon={Vote}
          fullWidth
          onClick={endVoting}
          disabled={votedPlayers.size < activePlayers.length}
        >
          {votedPlayers.size < activePlayers.length
            ? `En attente (${votedPlayers.size}/${activePlayers.length} votes)`
            : topVotedPlayer
              ? `Éliminer ${topVotedPlayer.name}`
              : "Finaliser le vote"}
        </Button>
      </Container>
    </PageContainer>
  );
};

export default VoteScreen;
