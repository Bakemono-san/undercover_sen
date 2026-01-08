"use client";

import React, { useState } from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Plus, Trash2, Edit2, Save, X, PackagePlus } from "lucide-react";
import { THEMES, MAX_CUSTOM_PAIRS, CUSTOM_WORDS_KEY } from "../../utils/constants";

interface CustomWordPair {
  id: string;
  word1: string;
  word2: string;
  category: string;
}

export const WordShopScreen: React.FC = () => {
  const { setScreen } = useGame();
  const [customPairs, setCustomPairs] = useState<CustomWordPair[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CUSTOM_WORDS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPair, setNewPair] = useState({
    word1: "",
    word2: "",
    category: "custom",
  });

  const saveToLocalStorage = (pairs: CustomWordPair[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(pairs));
    }
  };

  const handleAddPair = () => {
    if (newPair.word1.trim() && newPair.word2.trim()) {
      const pair: CustomWordPair = {
        id: Date.now().toString(),
        word1: newPair.word1.trim(),
        word2: newPair.word2.trim(),
        category: newPair.category,
      };
      const updated = [...customPairs, pair];
      setCustomPairs(updated);
      saveToLocalStorage(updated);
      setNewPair({ word1: "", word2: "", category: "custom" });
      setIsAdding(false);
    }
  };

  const handleUpdatePair = () => {
    if (editingId && newPair.word1.trim() && newPair.word2.trim()) {
      const updated = customPairs.map((pair) =>
        pair.id === editingId
          ? { ...pair, word1: newPair.word1.trim(), word2: newPair.word2.trim(), category: newPair.category }
          : pair
      );
      setCustomPairs(updated);
      saveToLocalStorage(updated);
      setEditingId(null);
      setNewPair({ word1: "", word2: "", category: "custom" });
    }
  };

  const handleDeletePair = (id: string) => {
    if (confirm("Supprimer cette paire de mots ?")) {
      const updated = customPairs.filter((pair) => pair.id !== id);
      setCustomPairs(updated);
      saveToLocalStorage(updated);
    }
  };

  const handleEditPair = (pair: CustomWordPair) => {
    setEditingId(pair.id);
    setNewPair({
      word1: pair.word1,
      word2: pair.word2,
      category: pair.category,
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewPair({ word1: "", word2: "", category: "custom" });
  };

  const categories = [
    { id: "custom", name: "🎨 Personnalisé", color: "bg-purple-500" },
    { id: "food", name: "🍲 Cuisine", color: "bg-orange-500" },
    { id: "transport", name: "🚌 Transport", color: "bg-blue-500" },
    { id: "places", name: "📍 Lieux", color: "bg-green-500" },
    { id: "culture", name: "🎭 Culture", color: "bg-red-500" },
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.color || "bg-purple-500";
  };

  const getCategoryName = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.name || "🎨 Personnalisé";
  };

  // Get default themes statistics
  const defaultThemeStats = Object.entries(THEMES).map(([key, theme]) => ({
    name: theme.name,
    count: theme.pairs.length,
    key,
  }));

  const totalDefaultPairs = defaultThemeStats.reduce((sum, t) => sum + t.count, 0);

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <SimpleHeader title="Boutique de Mots" onBack={() => setScreen("home")} />

        {/* Statistics Card */}
        <Card variant="gradient" padding="md" className="mb-6 bg-senegal-gradient text-white hover-glow-senegal">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-1">
                {totalDefaultPairs + customPairs.length}
              </h3>
              <p className="text-xs md:text-sm opacity-90">Paires de mots disponibles</p>
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <PackagePlus className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="font-bold">{totalDefaultPairs}</div>
              <div className="opacity-90">Par défaut</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="font-bold">{customPairs.length}</div>
              <div className="opacity-90">Personnalisés</div>
            </div>
          </div>
        </Card>

        {/* Default Themes Overview */}
        <Card variant="default" padding="md" className="mb-6">
          <h3 className="font-bold text-lg md:text-xl mb-4 text-gray-900">
            🇸🇳 Thèmes Sénégalais
          </h3>
          <div className="space-y-2">
            {defaultThemeStats.map((theme) => (
              <div
                key={theme.key}
                className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3"
              >
                <span className="font-medium text-sm md:text-base text-gray-900">
                  {theme.name}
                </span>
                <span className="bg-emerald-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full">
                  {theme.count} paires
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <Card variant="bordered" padding="md" className="mb-6 border-orange-300 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? "✏️ Modifier la paire" : "➕ Nouvelle paire"}
              </h3>
              <button
                onClick={cancelEdit}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setNewPair({ ...newPair, category: cat.id })}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        newPair.category === cat.id
                          ? `${cat.color} text-white shadow-lg scale-105`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Word inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Premier mot
                  </label>
                  <input
                    type="text"
                    value={newPair.word1}
                    onChange={(e) => setNewPair({ ...newPair, word1: e.target.value })}
                    className="w-full bg-white border-2 border-orange-200 rounded-xl px-4 py-3 font-medium focus:border-orange-400 focus:outline-none text-gray-900"
                    placeholder="Ex: Thiéboudienne"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deuxième mot
                  </label>
                  <input
                    type="text"
                    value={newPair.word2}
                    onChange={(e) => setNewPair({ ...newPair, word2: e.target.value })}
                    className="w-full bg-white border-2 border-orange-200 rounded-xl px-4 py-3 font-medium focus:border-orange-400 focus:outline-none text-gray-900"
                    placeholder="Ex: Yassa"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="success"
                  size="md"
                  icon={Save}
                  fullWidth
                  onClick={editingId ? handleUpdatePair : handleAddPair}
                  disabled={!newPair.word1.trim() || !newPair.word2.trim()}
                >
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </Button>
                <Button variant="ghost" size="md" onClick={cancelEdit}>
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Custom Pairs List */}
        <Card variant="default" padding="md" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg md:text-xl text-gray-900">
              🎨 Mes paires personnalisées
            </h3>
            {!isAdding && !editingId && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setIsAdding(true)}
                disabled={customPairs.length >= MAX_CUSTOM_PAIRS}
              >
                Ajouter
              </Button>
            )}
          </div>

          {customPairs.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackagePlus className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
              </div>
              <p className="text-gray-500 mb-2 text-sm md:text-base">
                Aucune paire personnalisée
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Créez vos propres paires de mots pour enrichir le jeu !
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {customPairs.map((pair) => (
                <div
                  key={pair.id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${getCategoryColor(pair.category)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          {getCategoryName(pair.category).split(" ")[0]}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-white/60 rounded-lg px-3 py-2">
                          <p className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {pair.word1}
                          </p>
                        </div>
                        <div className="bg-white/60 rounded-lg px-3 py-2">
                          <p className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {pair.word2}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditPair(pair)}
                        className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleDeletePair(pair.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {customPairs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs md:text-sm text-gray-600 text-center">
                {customPairs.length} / {MAX_CUSTOM_PAIRS} paires personnalisées
              </p>
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card variant="glass" padding="md" className="bg-blue-50/60 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-blue-900">
                <strong>Astuce :</strong> Créez des paires de mots similaires mais différents pour rendre le jeu plus intéressant. Vos paires personnalisées seront automatiquement incluses dans les parties !
              </p>
            </div>
          </div>
        </Card>

        <div className="h-8" />
      </Container>
    </PageContainer>
  );
};

export default WordShopScreen;
