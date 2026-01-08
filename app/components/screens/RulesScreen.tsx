"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Card } from "../ui/Card";
import { Shield, Eye, Crown } from "lucide-react";

export const RulesScreen: React.FC = () => {
  const { setScreen } = useGame();

  return (
    <PageContainer background="gradient-warm">
      <Container>
        <SimpleHeader title="Règles du jeu" onBack={() => setScreen("home")} />

        <div className="space-y-4 md:space-y-6">
          {/* Objective */}
          <Card variant="default" padding="md">
            <h3 className="font-bold text-lg md:text-xl mb-3 text-orange-600">
              🎯 Objectif
            </h3>
            <p className="text-gray-700 text-sm md:text-base">
              Les Citoyens doivent découvrir qui sont les Undercovers. Les
              Undercovers doivent rester cachés.
            </p>
          </Card>

          {/* Roles */}
          <Card variant="default" padding="md">
            <h3 className="font-bold text-lg md:text-xl mb-3 text-green-600">
              👥 Les Rôles
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base">
                    Citoyens
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Reçoivent le même mot
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base">
                    Undercovers
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Reçoivent un mot similaire
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base">
                    Mr White
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Ne reçoit aucun mot
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Gameplay */}
          <Card variant="default" padding="md">
            <h3 className="font-bold text-lg md:text-xl mb-3 text-blue-600">
              🎮 Déroulement
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-gray-700 text-sm md:text-base">
              <li>Chaque joueur reçoit secrètement son rôle et son mot</li>
              <li>Tour à tour, décrivez votre mot en une phrase</li>
              <li>Votez pour éliminer un suspect</li>
              <li>Le jeu continue jusqu&apos;à la victoire d&apos;un camp</li>
            </ol>
          </Card>

          {/* Victory Conditions */}
          <Card variant="default" padding="md">
            <h3 className="font-bold text-lg md:text-xl mb-3 text-red-600">
              🏆 Conditions de victoire
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
              <li>
                ✓ <strong>Citoyens</strong> : Éliminer tous les Undercovers et
                Mr White
              </li>
              <li>
                ✓ <strong>Undercovers</strong> : Égaler ou dépasser le nombre de
                Citoyens
              </li>
              <li>
                ✓ <strong>Mr White</strong> : Deviner le mot des citoyens après
                élimination
              </li>
            </ul>
          </Card>

          {/* Tips */}
          <Card
            variant="gradient"
            padding="md"
            className="bg-gradient-to-br from-orange-100 to-amber-100"
          >
            <h3 className="font-bold text-lg md:text-xl mb-3 text-orange-800">
              💡 Conseils stratégiques
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
              <li>
                🎯 <strong>Citoyens</strong> : Soyez précis mais pas trop
                évidents
              </li>
              <li>
                🕵️ <strong>Undercovers</strong> : Restez vagues et observez les
                autres
              </li>
              <li>
                👑 <strong>Mr White</strong> : Imitez les autres sans connaître
                le mot
              </li>
              <li>
                📝 <strong>Tous</strong> : Écoutez attentivement les
                descriptions
              </li>
            </ul>
          </Card>
        </div>

        <div className="h-8" />
      </Container>
    </PageContainer>
  );
};

export default RulesScreen;
