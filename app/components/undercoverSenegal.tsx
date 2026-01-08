"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Eye,
  EyeOff,
  Vote,
  Trophy,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
  Shield,
  User,
  Menu,
  X,
  UserPlus,
  Edit2,
  Trash2,
  Save,
} from "lucide-react";

const UndercoverSenegal = () => {
  const [screen, setScreen] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(8);
  const [editingPlayers, setEditingPlayers] = useState(false);
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [gameConfig, setGameConfig] = useState({
    undercoverCount: 1,
    hasMrWhite: true,
    theme: "all",
  });
  const [currentGame, setCurrentGame] = useState(null);
  const [revealedPlayer, setRevealedPlayer] = useState(null);
  const [discussionTimer, setDiscussionTimer] = useState(0);
  const [voteResults, setVoteResults] = useState({});
  const [roundHistory, setRoundHistory] = useState([]);

  // Load saved players on mount
  useEffect(() => {
    const saved = localStorage.getItem("undercover_saved_players");
    if (saved) {
      try {
        setSavedPlayers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved players");
      }
    }
  }, []);

  // Save players to localStorage
  const savePlayers = () => {
    if (players.length > 0) {
      const playerNames = players.map((p) => p.name);
      localStorage.setItem(
        "undercover_saved_players",
        JSON.stringify(playerNames),
      );
      setSavedPlayers(playerNames);
      alert("✅ Joueurs sauvegardés !");
    }
  };

  // Load saved players
  const loadSavedPlayers = () => {
    if (savedPlayers.length > 0) {
      const loadedPlayers = savedPlayers.map((name, i) => ({
        id: i + 1,
        name: name,
        eliminated: false,
      }));
      setPlayers(loadedPlayers);
      setPlayerCount(loadedPlayers.length);
      setEditingPlayers(true);
      setScreen("players");
    }
  };

  // Update player name
  const updatePlayerName = (id, newName) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name: newName } : p)));
  };

  // Delete player
  const deletePlayer = (id) => {
    const newPlayers = players
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, id: i + 1 }));
    setPlayers(newPlayers);
    setPlayerCount(newPlayers.length);
  };

  // Add player
  const addPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      name: `Joueur ${players.length + 1}`,
      eliminated: false,
    };
    setPlayers([...players, newPlayer]);
    setPlayerCount(players.length + 1);
  };

  const themes = {
    food: {
      name: "🍲 Cuisine",
      pairs: [
        ["Thiéboudienne", "Yassa"],
        ["Mafé", "Domoda"],
        ["Pastels", "Fataya"],
        ["Thiéré", "Ngalakh"],
        ["Attiéké", "Couscous"],
        ["Bissap", "Bouye"],
        ["Café Touba", "Thé Attaya"],
        ["Ceebu Jën", "Ceebu Yapp"],
      ],
    },
    transport: {
      name: "🚌 Transport",
      pairs: [
        ["Car Rapide", "Ndiaga Ndiaye"],
        ["Tata", "Clando"],
        ["Bâché", "Sept-place"],
        ["Taxi", "Uber"],
        ["Charrette", "Calèche"],
        ["TER", "Train"],
      ],
    },
    places: {
      name: "📍 Lieux",
      pairs: [
        ["Sandaga", "HLM"],
        ["Plateau", "Almadies"],
        ["Touba", "Tivaouane"],
        ["Lac Rose", "Île de Gorée"],
        ["Marché Kermel", "Marché Tilène"],
        ["AIBD", "LSS"],
      ],
    },
    culture: {
      name: "🎭 Culture",
      pairs: [
        ["Lutte Sénégalaise", "Football"],
        ["Sabar", "Mbalax"],
        ["Tabaski", "Korité"],
        ["Navétanes", "CAN"],
        ["Youssou Ndour", "Baaba Maal"],
        ["Thiossane", "Diourbel"],
        ["Teranga", "Jom"],
        ["Baye Fall", "Mouride"],
      ],
    },
  };

  const allPairs = Object.values(themes).flatMap((t) => t.pairs);

  const startGame = () => {
    if (players.length > 0) {
      setScreen("players");
      setEditingPlayers(true);
    } else {
      const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
        id: i + 1,
        name: `Joueur ${i + 1}`,
        eliminated: false,
      }));
      setPlayers(newPlayers);
      setScreen("players");
      setEditingPlayers(true);
    }
  };

  const continueToConfig = () => {
    setEditingPlayers(false);
    setScreen("config");
  };

  const launchGame = () => {
    const pair = allPairs[Math.floor(Math.random() * allPairs.length)];
    const [citizenWord, undercoverWord] = pair;

    const roles = [];
    for (let i = 0; i < playerCount; i++) {
      if (i < gameConfig.undercoverCount) {
        roles.push({ role: "undercover", word: undercoverWord });
      } else if (i === gameConfig.undercoverCount && gameConfig.hasMrWhite) {
        roles.push({ role: "mrwhite", word: "" });
      } else {
        roles.push({ role: "citizen", word: citizenWord });
      }
    }

    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    const gamePlayers = players.map((p, i) => ({
      ...p,
      ...roles[i],
      votes: 0,
    }));

    setCurrentGame({
      players: gamePlayers,
      citizenWord,
      undercoverWord,
      round: 1,
      phase: "reveal",
    });
    setRoundHistory([]);
    setScreen("reveal");
  };

  const nextReveal = () => {
    if (revealedPlayer === null) {
      setRevealedPlayer(0);
    } else if (revealedPlayer < currentGame.players.length - 1) {
      setRevealedPlayer(revealedPlayer + 1);
    } else {
      setRevealedPlayer(null);
      setScreen("discussion");
      setDiscussionTimer(0);
    }
  };

  const startVoting = () => {
    setScreen("vote");
    setVoteResults({});
  };

  const vote = (playerId) => {
    const newResults = { ...voteResults };
    newResults[playerId] = (newResults[playerId] || 0) + 1;
    setVoteResults(newResults);
  };

  const endVoting = () => {
    const maxVotes = Math.max(...Object.values(voteResults));
    const eliminated = Object.keys(voteResults).find(
      (id) => voteResults[id] === maxVotes,
    );

    if (eliminated) {
      const eliminatedPlayer = currentGame.players.find(
        (p) => p.id === parseInt(eliminated),
      );
      const newPlayers = currentGame.players.map((p) =>
        p.id === parseInt(eliminated) ? { ...p, eliminated: true } : p,
      );

      setRoundHistory([
        ...roundHistory,
        {
          round: currentGame.round,
          eliminated: eliminatedPlayer.name,
          role: eliminatedPlayer.role,
        },
      ]);

      const activePlayers = newPlayers.filter((p) => !p.eliminated);
      const undercoversLeft = activePlayers.filter(
        (p) => p.role === "undercover",
      ).length;
      const citizensLeft = activePlayers.filter(
        (p) => p.role === "citizen",
      ).length;
      const mrWhiteLeft = activePlayers.filter(
        (p) => p.role === "mrwhite",
      ).length;

      if (undercoversLeft === 0 && mrWhiteLeft === 0) {
        setCurrentGame({
          ...currentGame,
          players: newPlayers,
          winner: "citizens",
          phase: "end",
        });
        setScreen("results");
      } else if (undercoversLeft >= citizensLeft) {
        setCurrentGame({
          ...currentGame,
          players: newPlayers,
          winner: "undercover",
          phase: "end",
        });
        setScreen("results");
      } else if (eliminatedPlayer.role === "mrwhite") {
        setCurrentGame({
          ...currentGame,
          players: newPlayers,
          phase: "mrwhite_guess",
        });
        setScreen("mrwhite");
      } else {
        setCurrentGame({
          ...currentGame,
          players: newPlayers,
          round: currentGame.round + 1,
          phase: "discussion",
        });
        setScreen("discussion");
        setDiscussionTimer(0);
      }
    }
  };

  const mrWhiteGuess = (correct) => {
    if (correct) {
      setCurrentGame({
        ...currentGame,
        winner: "mrwhite",
        phase: "end",
      });
    } else {
      const undercoversLeft = currentGame.players.filter(
        (p) => !p.eliminated && p.role === "undercover",
      ).length;
      const citizensLeft = currentGame.players.filter(
        (p) => !p.eliminated && p.role === "citizen",
      ).length;

      if (undercoversLeft === 0) {
        setCurrentGame({
          ...currentGame,
          winner: "citizens",
          phase: "end",
        });
      } else {
        setCurrentGame({
          ...currentGame,
          winner: undercoversLeft >= citizensLeft ? "undercover" : "citizens",
          phase: "end",
        });
      }
    }
    setScreen("results");
  };

  useEffect(() => {
    if (screen === "discussion" && discussionTimer < 180) {
      const timer = setInterval(() => {
        setDiscussionTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen, discussionTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getRoleIcon = (role) => {
    if (role === "citizen") return <Shield className="w-5 h-5" />;
    if (role === "undercover") return <Eye className="w-5 h-5" />;
    return <Crown className="w-5 h-5" />;
  };

  const getRoleColor = (role) => {
    if (role === "citizen") return "bg-green-500";
    if (role === "undercover") return "bg-orange-500";
    return "bg-purple-500";
  };

  const getRoleLabel = (role) => {
    if (role === "citizen") return "Citoyen";
    if (role === "undercover") return "Undercover";
    return "Mr White";
  };

  if (screen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Top Menu Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-orange-600 font-bold text-lg">🇸🇳 Teranga</div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
            >
              {showMenu ? (
                <X className="w-6 h-6 text-orange-600" />
              ) : (
                <Menu className="w-6 h-6 text-orange-600" />
              )}
            </button>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setScreen("saved");
                }}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-50 transition-colors border-b border-gray-100"
              >
                <Users className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Joueurs sauvegardés
                  </div>
                  <div className="text-xs text-gray-500">
                    {savedPlayers.length} joueurs
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  setScreen("rules");
                }}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-50 transition-colors border-b border-gray-100"
              >
                <Settings className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Règles du jeu
                  </div>
                  <div className="text-xs text-gray-500">Comment jouer</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-50 transition-colors">
                <Trophy className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Statistiques
                  </div>
                  <div className="text-xs text-gray-500">Vos performances</div>
                </div>
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <User className="w-6 h-6 text-orange-600" />
              <span className="text-orange-600 font-semibold text-sm tracking-wider">
                ÉDITION SPÉCIALE
              </span>
              <User className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl mb-6">
            <div className="bg-amber-900/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-24 h-24 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Eye className="w-12 h-12 text-amber-300" />
              </div>
              <h1 className="text-4xl font-black text-white text-center mb-2">
                Undercover
                <br />
                Sénégal
              </h1>
              <p className="text-amber-100 text-center text-sm">
                Le jeu de l'intrus - Version 2.0
              </p>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all mb-4"
          >
            <Play className="w-6 h-6" />
            NOUVELLE PARTIE
          </button>

          {savedPlayers.length > 0 && (
            <button
              onClick={loadSavedPlayers}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all mb-4"
            >
              <Users className="w-6 h-6" />
              CHARGER MES JOUEURS ({savedPlayers.length})
            </button>
          )}

          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-xl">📖</span>
              </div>
              <span className="font-bold text-amber-900">Boutique de mots</span>
            </div>
            <p className="text-sm text-amber-800">
              Thèmes disponibles : Cuisine, Transport, Lieux, Culture
              sénégalaise
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "saved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setScreen("home")}
              className="p-2 hover:bg-orange-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              Joueurs sauvegardés
            </h2>
            <div className="w-10" />
          </div>

          {savedPlayers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Aucun joueur sauvegardé</p>
              <p className="text-sm text-gray-400">
                Créez une partie et sauvegardez vos joueurs
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900">
                    {savedPlayers.length} joueurs
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("Supprimer tous les joueurs sauvegardés ?")) {
                        localStorage.removeItem("undercover_saved_players");
                        setSavedPlayers([]);
                      }
                    }}
                    className="text-red-500 text-sm font-semibold"
                  >
                    Tout supprimer
                  </button>
                </div>
                <div className="space-y-2">
                  {savedPlayers.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-orange-50 rounded-xl p-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <span className="flex-1 font-medium text-gray-900">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={loadSavedPlayers}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
              >
                Charger ces joueurs
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "rules") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setScreen("home")}
              className="p-2 hover:bg-orange-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Règles du jeu</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3 text-orange-600">
                🎯 Objectif
              </h3>
              <p className="text-gray-700">
                Les Citoyens doivent découvrir qui sont les Undercovers. Les
                Undercovers doivent rester cachés.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3 text-green-600">
                👥 Les Rôles
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-semibold">Citoyens</div>
                    <div className="text-sm text-gray-600">
                      Reçoivent le même mot
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Undercovers</div>
                    <div className="text-sm text-gray-600">
                      Reçoivent un mot similaire
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Crown className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <div className="font-semibold">Mr White</div>
                    <div className="text-sm text-gray-600">
                      Ne reçoit aucun mot
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3 text-blue-600">
                🎮 Déroulement
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-700">
                <li>Chaque joueur reçoit secrètement son rôle et son mot</li>
                <li>Tour à tour, décrivez votre mot en une phrase</li>
                <li>Votez pour éliminer un suspect</li>
                <li>Le jeu continue jusqu'à la victoire d'un camp</li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3 text-red-600">
                🏆 Conditions de victoire
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  ✓ <strong>Citoyens</strong> : Éliminer tous les Undercovers
                </li>
                <li>
                  ✓ <strong>Undercovers</strong> : Égaler le nombre de Citoyens
                </li>
                <li>
                  ✓ <strong>Mr White</strong> : Deviner le mot après élimination
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "players") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setScreen("home")}
              className="p-2 hover:bg-orange-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Joueurs</h2>
            <button
              onClick={savePlayers}
              className="p-2 hover:bg-orange-100 rounded-lg"
            >
              <Save className="w-6 h-6 text-green-600" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-900">
                {players.length} joueurs
              </span>
              <button
                onClick={addPlayer}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-semibold text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Ajouter
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 bg-orange-50 rounded-xl p-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    {player.id}
                  </div>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) =>
                      updatePlayerName(player.id, e.target.value)
                    }
                    className="flex-1 bg-white border-2 border-orange-200 rounded-lg px-3 py-2 font-medium focus:border-orange-400 focus:outline-none"
                    placeholder="Nom du joueur"
                  />
                  <button
                    onClick={() => deletePlayer(player.id)}
                    className="p-2 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {players.length < 4 && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Il faut au moins 4 joueurs pour commencer
                </p>
              </div>
            )}
          </div>

          <button
            onClick={continueToConfig}
            disabled={players.length < 4}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${
              players.length >= 4
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuer
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  if (screen === "config") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setScreen("players")} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">Configuration</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Nombre de joueurs</h3>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-orange-500 rounded-full text-6xl font-black">
                  {players.length}
                </div>
                <div className="text-sm text-gray-300 mt-2">JOUEURS</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Rôles Spéciaux</h3>
                  <p className="text-xs text-white/80">
                    Personnalise ton expérience
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Undercover</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setGameConfig({
                            ...gameConfig,
                            undercoverCount: Math.max(
                              1,
                              gameConfig.undercoverCount - 1,
                            ),
                          })
                        }
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">
                        {gameConfig.undercoverCount}
                      </span>
                      <button
                        onClick={() =>
                          setGameConfig({
                            ...gameConfig,
                            undercoverCount: Math.min(
                              3,
                              gameConfig.undercoverCount + 1,
                            ),
                          })
                        }
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      1 heure
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      2 heure
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Mr. White</span>
                      <p className="text-xs text-white/70">Rôle mystérieux</p>
                    </div>
                    <button
                      onClick={() =>
                        setGameConfig({
                          ...gameConfig,
                          hasMrWhite: !gameConfig.hasMrWhite,
                        })
                      }
                      className={`w-12 h-6 rounded-full transition-all ${gameConfig.hasMrWhite ? "bg-white" : "bg-white/20"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-orange-500 transition-transform ${gameConfig.hasMrWhite ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={launchGame}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              Lancer la partie
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "reveal" && currentGame) {
    const currentPlayer =
      revealedPlayer !== null ? currentGame.players[revealedPlayer] : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setScreen("config")} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold">RÉVÉLATION</h2>
            <div className="w-10" />
          </div>

          {currentPlayer === null ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Users className="w-16 h-16" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Tour de Fatou</h3>
              <p className="text-gray-300 mb-8 px-8">
                Assure-toi que personne ne regarde ton écran
              </p>
              <button
                onClick={nextReveal}
                className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg"
              >
                CACHER ET PASSER
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mx-auto mb-4 shadow-xl" />
                <h3 className="text-2xl font-bold mb-2">
                  {currentPlayer.name}
                </h3>
                <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full">
                  <EyeOff className="w-4 h-4" />
                  <span className="text-sm">IDENTITÉ RÉVÉLÉE</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2">TON RÔLE</div>
                  <div
                    className={`inline-flex items-center gap-2 ${getRoleColor(currentPlayer.role)} px-6 py-3 rounded-xl text-xl font-bold`}
                  >
                    {getRoleIcon(currentPlayer.role)}
                    <span>{getRoleLabel(currentPlayer.role)}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">
                    TON MOT SECRET
                  </div>
                  <div className="text-4xl font-black text-orange-400 tracking-wider">
                    {currentPlayer.word || "???"}
                  </div>
                  {!currentPlayer.word && (
                    <p className="text-sm text-gray-400 mt-2">
                      Essaye de deviner le mot dans l'ombre...
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={nextReveal}
                className="w-full bg-green-500 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                {revealedPlayer < currentGame.players.length - 1 ? (
                  <>
                    Joueur suivant <ChevronRight className="w-6 h-6" />
                  </>
                ) : (
                  <>
                    Fin du tour <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "discussion" && currentGame) {
    const activePlayers = currentGame.players.filter((p) => !p.eliminated);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Manche {currentGame.round}</h2>
            <div className="bg-green-600 px-4 py-2 rounded-full text-sm font-bold">
              DISCUSSION
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center">
            <div className="text-6xl font-black mb-2">
              {formatTime(discussionTimer)}
            </div>
            <div className="text-sm text-gray-300">
              {discussionTimer < 60 ? "MINUTES" : "SECONDES"}
            </div>
            <div className="mt-4 text-sm text-green-300 font-semibold">
              DÉCRIS TON MOT SANS LE DIRE
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <span className="font-bold">À SUIVRE</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {activePlayers.map((player) => (
                <div key={player.id} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-2 shadow-lg flex items-center justify-center">
                    {getRoleIcon(player.role)}
                  </div>
                  <div className="text-xs truncate">{player.name}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startVoting}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            Fin du tour
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  if (screen === "vote" && currentGame) {
    const activePlayers = currentGame.players.filter((p) => !p.eliminated);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-orange-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setScreen("discussion")} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold">PHASE DE VOTE</h2>
            <div className="w-10" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-black">
                  {Object.values(voteResults).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-gray-300">VOTES</div>
              </div>
              <div>
                <div className="text-3xl font-black">
                  {Object.values(voteResults).length}
                </div>
                <div className="text-sm text-gray-300">PERSONNES</div>
              </div>
            </div>

            <div className="text-sm text-orange-300 font-semibold text-center">
              Qui est l'Undercover ?
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              Observe les réponses. Tape sur un joueur pour voter contre lui.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {activePlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => vote(player.id)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-2 shadow-lg relative">
                  {voteResults[player.id] > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {voteResults[player.id]}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-sm">{player.name}</div>
                <div className="text-xs text-gray-400">VOTE</div>
              </button>
            ))}
          </div>

          <button
            onClick={endVoting}
            disabled={Object.values(voteResults).length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${
              Object.values(voteResults).length > 0
                ? "bg-gradient-to-r from-orange-500 to-red-500"
                : "bg-gray-600 opacity-50"
            }`}
          >
            <Vote className="w-6 h-6" />
            Voter contre{" "}
            {activePlayers.find(
              (p) =>
                p.id ===
                parseInt(
                  Object.keys(voteResults).reduce(
                    (a, b) => (voteResults[a] > voteResults[b] ? a : b),
                    "0",
                  ),
                ),
            )?.name || "..."}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "mrwhite" && currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Crown className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Mr White éliminé !</h2>
            <p className="text-purple-300">Il a une dernière chance...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-lg mb-4">
                Mr White peut deviner le mot des citoyens pour gagner la partie
                !
              </p>
              <div className="bg-purple-500/20 px-4 py-3 rounded-xl">
                <div className="text-sm text-gray-300 mb-1">
                  Mot des citoyens :
                </div>
                <div className="text-3xl font-black text-purple-300">
                  {currentGame.citizenWord}
                </div>
              </div>
            </div>
            <p className="text-sm text-center text-gray-400">
              Mr White a-t-il correctement deviné le mot ?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => mrWhiteGuess(true)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 py-6 rounded-2xl font-bold text-lg shadow-lg"
            >
              ✓ Oui
              <br />
              <span className="text-sm font-normal opacity-80">
                Mr White gagne
              </span>
            </button>
            <button
              onClick={() => mrWhiteGuess(false)}
              className="bg-gradient-to-br from-red-500 to-pink-600 py-6 rounded-2xl font-bold text-lg shadow-lg"
            >
              ✗ Non
              <br />
              <span className="text-sm font-normal opacity-80">
                Citoyens gagnent
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "results" && currentGame) {
    const winnerLabel =
      currentGame.winner === "citizens"
        ? "Citoyens"
        : currentGame.winner === "undercover"
          ? "Undercover"
          : "Mr White";

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-800 to-orange-900 p-4 text-white">
        <div className="max-w-md mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setScreen("home")} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold">Fin de Partie</h2>
            <div className="w-10" />
          </div>

          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Trophy className="w-16 h-16" />
            </div>
            <h3 className="text-4xl font-black mb-2">
              Victoire des
              <br />
              {winnerLabel} !
            </h3>
            <p className="text-orange-300">
              {currentGame.winner === "citizens" &&
                "Les imposteurs ont été démasqués. Le Sénégal est fier de vous !"}
              {currentGame.winner === "undercover" &&
                "Les Undercovers ont infiltré le groupe avec succès !"}
              {currentGame.winner === "mrwhite" &&
                "Mr White a deviné le mot et remporte la victoire !"}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
              <span className="text-gray-300">TOURS</span>
              <span className="text-2xl font-bold">{currentGame.round}</span>
            </div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
              <span className="text-gray-300">ÉLIMINÉS</span>
              <span className="text-2xl font-bold">
                {currentGame.players.filter((p) => p.eliminated).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">VOTES</span>
              <span className="text-2xl font-bold">
                {roundHistory.length * 2}
              </span>
            </div>
          </div>

          <div className="bg-orange-500/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-orange-400" />
              <span className="font-bold">Révélation des Rôles</span>
            </div>
            <div className="space-y-3">
              {currentGame.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-white/10 rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${getRoleColor(player.role)} rounded-full flex items-center justify-center`}
                    >
                      {getRoleIcon(player.role)}
                    </div>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-xs text-gray-400">
                        {player.role === "citizen" &&
                          `Citoyen • Mot: "${currentGame.citizenWord}"`}
                        {player.role === "undercover" &&
                          `Undercover • Mot: "${currentGame.undercoverWord}"`}
                        {player.role === "mrwhite" && `Mr White • Aucun mot`}
                      </div>
                    </div>
                  </div>
                  {player.eliminated && (
                    <span className="text-xs bg-red-500/30 px-2 py-1 rounded">
                      ÉLIMINÉ
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setScreen("home");
              setCurrentGame(null);
              setPlayers([]);
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 py-4 rounded-2xl font-bold text-lg shadow-lg mb-3"
          >
            Rejouer
          </button>

          <button
            onClick={() => setScreen("home")}
            className="w-full bg-white/10 backdrop-blur-sm py-4 rounded-2xl font-semibold text-lg"
          >
            Retour au Menu Principal
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default UndercoverSenegal;
