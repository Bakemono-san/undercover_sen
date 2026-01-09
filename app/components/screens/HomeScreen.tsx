"use client";

import React from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Menu } from "../layout/Menu";
import { Card } from "../ui/Card";
import {
  Play,
  Users,
  Settings,
  Trophy,
  Eye,
  User,
  Menu as MenuIcon,
  X,
  PackagePlus,
  Palette,
} from "lucide-react";

export const HomeScreen: React.FC = () => {
  const {
    showMenu,
    setShowMenu,
    savedPlayers,
    startGame,
    loadSavedPlayers,
    setScreen,
  } = useGame();

  const menuItems = [
    {
      icon: Palette,
      label: "Créateur de Thèmes",
      description: "Créer des packs personnalisés",
      onClick: () => setScreen("themebuilder"),
      color: "text-pink-600",
    },
    {
      icon: PackagePlus,
      label: "Boutique de Mots",
      description: "Ajouter vos propres mots",
      onClick: () => setScreen("wordshop"),
      color: "text-purple-600",
    },
    {
      icon: Users,
      label: "Joueurs sauvegardés",
      description: `${savedPlayers.length} joueurs`,
      onClick: () => setScreen("saved"),
      badge: savedPlayers.length,
      color: "text-orange-600",
    },
    {
      icon: Settings,
      label: "Règles du jeu",
      description: "Comment jouer",
      onClick: () => setScreen("rules"),
      color: "text-emerald-600",
    },
    {
      icon: Trophy,
      label: "Statistiques",
      description: "Vos performances",
      onClick: () => {},
      color: "text-red-600",
    },
  ];

  return (
    <PageContainer background="gradient-warm">
      <Container>
        {/* Top Menu Bar */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🇸🇳</div>
            <div className="font-black text-lg md:text-xl bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
              TERANGA
            </div>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 md:p-3 hover:bg-orange-100 rounded-lg transition-all hover:scale-110 cursor-pointer"
            aria-label={showMenu ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {showMenu ? (
              <X className="w-6 h-6 md:w-7 md:h-7 text-orange-600" />
            ) : (
              <MenuIcon className="w-6 h-6 md:w-7 md:h-7 text-orange-600" />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        <Menu
          items={menuItems}
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
        />

        {/* Edition Badge */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2">
            <User className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
            <span className="text-orange-600 font-semibold text-xs md:text-sm tracking-wider">
              ÉDITION SPÉCIALE
            </span>
            <User className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
          </div>
        </div>

        {/* Hero Card */}
        <Card
          variant="gradient"
          padding="lg"
          className="bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 shadow-2xl mb-6 md:mb-8 hover-glow-senegal"
        >
          <div className="bg-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm african-pattern">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl animate-pulse">
              <Eye className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center mb-2">
              Undercover
              <br />
              Sénégal
            </h1>
            <p className="text-white/90 text-center text-sm md:text-base font-semibold">
              Le jeu de l&apos;intrus - Version 2.0 🇸🇳
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="warning"
            size="lg"
            icon={Play}
            fullWidth
            onClick={startGame}
          >
            NOUVELLE PARTIE
          </Button>

          {savedPlayers.length > 0 && (
            <Button
              variant="success"
              size="lg"
              icon={Users}
              fullWidth
              onClick={loadSavedPlayers}
            >
              CHARGER MES JOUEURS ({savedPlayers.length})
            </Button>
          )}
        </div>

        {/* Info Card */}
        <button
          onClick={() => setScreen("wordshop")}
          className="w-full mt-6 md:mt-8 cursor-pointer"
        >
          <Card
            variant="glass"
            padding="md"
            className="bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm border-l-4 border-purple-500 hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <PackagePlus className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="font-bold text-purple-900 text-sm md:text-base">
                Boutique de Mots
              </span>
            </div>
            <p className="text-xs md:text-sm text-purple-800 pl-11 md:pl-13">
              Thèmes sénégalais + Créez vos propres paires de mots ! ✨
            </p>
          </Card>
        </button>

        {/* Responsive spacing */}
        <div className="h-8 md:h-12" />
      </Container>
    </PageContainer>
  );
};

export default HomeScreen;
