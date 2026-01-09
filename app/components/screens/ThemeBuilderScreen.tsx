"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { PageContainer, Container } from "../layout/Container";
import { SimpleHeader } from "../layout/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Download,
  Upload,
  Palette,
  Folder,
  FileText,
} from "lucide-react";
import { STORAGE_KEYS, THEME_PACK_ICONS, CATEGORY_ICONS } from "../../utils/constants";
import { CustomThemePack } from "../../types/game";

interface CategoryWithPairs {
  name: string;
  icon: string;
  pairs: [string, string][];
}

/**
 * Generate a unique ID using timestamp and random string
 */
const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Normalize category key (lowercase, replace spaces with underscores)
 */
const normalizeCategoryKey = (key: string): string => {
  return key.toLowerCase().replace(/\s+/g, "_");
};

export const ThemeBuilderScreen: React.FC = () => {
  const { setScreen } = useGame();
  const [customThemePacks, setCustomThemePacks] = useState<CustomThemePack[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEME_PACKS);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryKey, setEditingCategoryKey] = useState<string | null>(null);

  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    icon: "🎨",
  });

  const [newCategory, setNewCategory] = useState({
    key: "",
    name: "",
    icon: "📁",
  });

  const [newPair, setNewPair] = useState({
    word1: "",
    word2: "",
  });

  const iconOptions = [...THEME_PACK_ICONS];
  const categoryIconOptions = [...CATEGORY_ICONS];

  useEffect(() => {
    saveToLocalStorage(customThemePacks);
  }, [customThemePacks]);

  const saveToLocalStorage = (packs: CustomThemePack[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_THEME_PACKS, JSON.stringify(packs));
    }
  };

  const handleCreateTheme = () => {
    if (!newTheme.name.trim()) {
      alert("Veuillez entrer un nom pour le thème");
      return;
    }

    const theme: CustomThemePack = {
      id: generateUniqueId(),
      name: newTheme.name.trim(),
      description: newTheme.description.trim(),
      icon: newTheme.icon,
      categories: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCustomThemePacks([...customThemePacks, theme]);
    setNewTheme({ name: "", description: "", icon: "🎨" });
    setIsCreatingTheme(false);
    setSelectedThemeId(theme.id);
  };

  const handleDeleteTheme = (id: string) => {
    if (confirm("Supprimer ce pack de thème ?")) {
      setCustomThemePacks(customThemePacks.filter((t) => t.id !== id));
      if (selectedThemeId === id) {
        setSelectedThemeId(null);
      }
    }
  };

  const handleAddCategory = () => {
    if (!selectedThemeId) return;
    if (!newCategory.name.trim() || !newCategory.key.trim()) {
      alert("Veuillez remplir le nom et la clé de la catégorie");
      return;
    }

    const updatedPacks = customThemePacks.map((pack) => {
      if (pack.id === selectedThemeId) {
        if (pack.categories[newCategory.key]) {
          alert("Cette clé de catégorie existe déjà");
          return pack;
        }
        return {
          ...pack,
          categories: {
            ...pack.categories,
            [newCategory.key]: {
              name: `${newCategory.icon} ${newCategory.name}`,
              pairs: [],
            },
          },
          updatedAt: new Date().toISOString(),
        };
      }
      return pack;
    });

    setCustomThemePacks(updatedPacks);
    setNewCategory({ key: "", name: "", icon: "📁" });
    setIsEditingCategory(false);
  };

  const handleDeleteCategory = (categoryKey: string) => {
    if (!selectedThemeId) return;
    if (confirm("Supprimer cette catégorie ?")) {
      const updatedPacks = customThemePacks.map((pack) => {
        if (pack.id === selectedThemeId) {
          const { [categoryKey]: _, ...restCategories } = pack.categories;
          return {
            ...pack,
            categories: restCategories,
            updatedAt: new Date().toISOString(),
          };
        }
        return pack;
      });
      setCustomThemePacks(updatedPacks);
    }
  };

  const handleAddPair = (categoryKey: string) => {
    if (!selectedThemeId) return;
    if (!newPair.word1.trim() || !newPair.word2.trim()) {
      alert("Veuillez entrer les deux mots");
      return;
    }

    const updatedPacks = customThemePacks.map((pack) => {
      if (pack.id === selectedThemeId) {
        const category = pack.categories[categoryKey];
        if (!category) return pack;

        // Check for duplicates
        const isDuplicate = category.pairs.some(
          (pair) =>
            (pair[0] === newPair.word1.trim() && pair[1] === newPair.word2.trim()) ||
            (pair[0] === newPair.word2.trim() && pair[1] === newPair.word1.trim())
        );

        if (isDuplicate) {
          alert("Cette paire existe déjà dans cette catégorie");
          return pack;
        }

        return {
          ...pack,
          categories: {
            ...pack.categories,
            [categoryKey]: {
              ...category,
              pairs: [...category.pairs, [newPair.word1.trim(), newPair.word2.trim()] as [string, string]],
            },
          },
          updatedAt: new Date().toISOString(),
        };
      }
      return pack;
    });

    setCustomThemePacks(updatedPacks);
    setNewPair({ word1: "", word2: "" });
  };

  const handleDeletePair = (categoryKey: string, pairIndex: number) => {
    if (!selectedThemeId) return;
    if (confirm("Supprimer cette paire ?")) {
      const updatedPacks = customThemePacks.map((pack) => {
        if (pack.id === selectedThemeId) {
          const category = pack.categories[categoryKey];
          if (!category) return pack;

          return {
            ...pack,
            categories: {
              ...pack.categories,
              [categoryKey]: {
                ...category,
                pairs: category.pairs.filter((_, i) => i !== pairIndex),
              },
            },
            updatedAt: new Date().toISOString(),
          };
        }
        return pack;
      });
      setCustomThemePacks(updatedPacks);
    }
  };

  const handleExportTheme = (themeId: string) => {
    const theme = customThemePacks.find((t) => t.id === themeId);
    if (!theme) return;

    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `theme-${theme.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as CustomThemePack;
        // Generate new ID to avoid conflicts
        imported.id = generateUniqueId();
        imported.createdAt = new Date().toISOString();
        imported.updatedAt = new Date().toISOString();
        setCustomThemePacks([...customThemePacks, imported]);
        alert("Thème importé avec succès !");
      } catch (error) {
        alert("Erreur lors de l'importation du thème");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const selectedTheme = customThemePacks.find((t) => t.id === selectedThemeId);

  const getTotalPairs = (theme: CustomThemePack) => {
    return Object.values(theme.categories).reduce((sum, cat) => sum + cat.pairs.length, 0);
  };

  return (
    <PageContainer background="gradient-warm" className="wax-print-bg">
      <Container>
        <SimpleHeader title="🎨 Créateur de Thèmes" onBack={() => setScreen("home")} />

        {/* Theme List View */}
        {!selectedThemeId && (
          <>
            {/* Create New Theme Button */}
            {!isCreatingTheme && (
              <Card variant="default" padding="md" className="mb-6">
                <Button
                  variant="primary"
                  size="md"
                  icon={Plus}
                  fullWidth
                  onClick={() => setIsCreatingTheme(true)}
                >
                  Créer un nouveau pack de thème
                </Button>
              </Card>
            )}

            {/* Create Theme Form */}
            {isCreatingTheme && (
              <Card variant="bordered" padding="md" className="mb-6 border-purple-300 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">✨ Nouveau Pack de Thème</h3>
                  <button
                    onClick={() => {
                      setIsCreatingTheme(false);
                      setNewTheme({ name: "", description: "", icon: "🎨" });
                    }}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du pack</label>
                    <input
                      type="text"
                      value={newTheme.name}
                      onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                      className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 font-medium focus:border-purple-400 focus:outline-none text-gray-900"
                      placeholder="Ex: Cuisine Mondiale"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newTheme.description}
                      onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                      className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 font-medium focus:border-purple-400 focus:outline-none text-gray-900"
                      placeholder="Décrivez votre pack de thème..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icône</label>
                    <div className="grid grid-cols-5 gap-2">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setNewTheme({ ...newTheme, icon })}
                          className={`p-3 rounded-xl text-2xl transition-all ${
                            newTheme.icon === icon
                              ? "bg-purple-500 scale-110 shadow-lg"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="success"
                    size="md"
                    icon={Save}
                    fullWidth
                    onClick={handleCreateTheme}
                    disabled={!newTheme.name.trim()}
                  >
                    Créer le pack
                  </Button>
                </div>
              </Card>
            )}

            {/* Import Theme */}
            <Card variant="default" padding="md" className="mb-6">
              <label className="cursor-pointer">
                <Button variant="ghost" size="md" icon={Upload} fullWidth>
                  Importer un pack de thème
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportTheme}
                  className="hidden"
                />
              </label>
            </Card>

            {/* Theme Packs List */}
            <Card variant="default" padding="md" className="mb-6">
              <h3 className="font-bold text-lg md:text-xl mb-4 text-gray-900">
                Mes Packs de Thèmes
              </h3>

              {customThemePacks.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
                  </div>
                  <p className="text-gray-500 mb-2 text-sm md:text-base">
                    Aucun pack de thème personnalisé
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    Créez votre premier pack pour commencer !
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customThemePacks.map((theme) => (
                    <div
                      key={theme.id}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedThemeId(theme.id)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{theme.icon}</span>
                            <h4 className="font-bold text-gray-900">{theme.name}</h4>
                          </div>
                          {theme.description && (
                            <p className="text-sm text-gray-600 mb-2">{theme.description}</p>
                          )}
                          <div className="flex gap-2 text-xs">
                            <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                              {Object.keys(theme.categories).length} catégories
                            </span>
                            <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full font-bold">
                              {getTotalPairs(theme)} paires
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleExportTheme(theme.id)}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                            title="Exporter"
                          >
                            <Download className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteTheme(theme.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        {/* Theme Detail View */}
        {selectedThemeId && selectedTheme && (
          <>
            <Card variant="gradient" padding="md" className="mb-6 bg-senegal-gradient text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedTheme.icon}</span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black">{selectedTheme.name}</h2>
                    {selectedTheme.description && (
                      <p className="text-sm opacity-90">{selectedTheme.description}</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedThemeId(null)}>
                  Retour
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm mt-4">
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                  <div className="font-bold">{Object.keys(selectedTheme.categories).length}</div>
                  <div className="opacity-90">Catégories</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                  <div className="font-bold">{getTotalPairs(selectedTheme)}</div>
                  <div className="opacity-90">Paires</div>
                </div>
              </div>
            </Card>

            {/* Add Category Form */}
            {isEditingCategory && (
              <Card variant="bordered" padding="md" className="mb-6 border-blue-300 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">➕ Nouvelle Catégorie</h3>
                  <button
                    onClick={() => {
                      setIsEditingCategory(false);
                      setNewCategory({ key: "", name: "", icon: "📁" });
                    }}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Clé (identifiant unique)
                    </label>
                    <input
                      type="text"
                      value={newCategory.key}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, key: normalizeCategoryKey(e.target.value) })
                      }
                      className="w-full bg-white border-2 border-blue-200 rounded-xl px-4 py-3 font-medium focus:border-blue-400 focus:outline-none text-gray-900"
                      placeholder="Ex: plats_principaux"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full bg-white border-2 border-blue-200 rounded-xl px-4 py-3 font-medium focus:border-blue-400 focus:outline-none text-gray-900"
                      placeholder="Ex: Plats Principaux"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icône</label>
                    <div className="grid grid-cols-5 gap-2">
                      {categoryIconOptions.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setNewCategory({ ...newCategory, icon })}
                          className={`p-3 rounded-xl text-2xl transition-all ${
                            newCategory.icon === icon
                              ? "bg-blue-500 text-white scale-110 shadow-lg"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="success"
                    size="md"
                    icon={Save}
                    fullWidth
                    onClick={handleAddCategory}
                    disabled={!newCategory.key.trim() || !newCategory.name.trim()}
                  >
                    Ajouter la catégorie
                  </Button>
                </div>
              </Card>
            )}

            {/* Add Category Button */}
            {!isEditingCategory && (
              <Card variant="default" padding="md" className="mb-6">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Folder}
                  fullWidth
                  onClick={() => setIsEditingCategory(true)}
                >
                  Ajouter une catégorie
                </Button>
              </Card>
            )}

            {/* Categories List */}
            {Object.keys(selectedTheme.categories).length === 0 ? (
              <Card variant="default" padding="md" className="mb-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-gray-500 mb-2">Aucune catégorie</p>
                  <p className="text-xs text-gray-400">
                    Ajoutez des catégories pour organiser vos mots
                  </p>
                </div>
              </Card>
            ) : (
              Object.entries(selectedTheme.categories).map(([key, category]) => (
                <Card key={key} variant="default" padding="md" className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                    <button
                      onClick={() => handleDeleteCategory(key)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  {/* Add Pair Form */}
                  <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={newPair.word1}
                        onChange={(e) => setNewPair({ ...newPair, word1: e.target.value })}
                        className="bg-white border-2 border-blue-200 rounded-xl px-4 py-2 font-medium focus:border-blue-400 focus:outline-none text-gray-900"
                        placeholder="Premier mot"
                      />
                      <input
                        type="text"
                        value={newPair.word2}
                        onChange={(e) => setNewPair({ ...newPair, word2: e.target.value })}
                        className="bg-white border-2 border-blue-200 rounded-xl px-4 py-2 font-medium focus:border-blue-400 focus:outline-none text-gray-900"
                        placeholder="Deuxième mot"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Plus}
                      fullWidth
                      onClick={() => handleAddPair(key)}
                      disabled={!newPair.word1.trim() || !newPair.word2.trim()}
                    >
                      Ajouter une paire
                    </Button>
                  </div>

                  {/* Pairs List */}
                  {category.pairs.length === 0 ? (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      Aucune paire de mots
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {category.pairs.map((pair, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3"
                        >
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <div className="bg-white/60 rounded-lg px-3 py-2">
                              <p className="font-bold text-gray-900 text-sm truncate">{pair[0]}</p>
                            </div>
                            <div className="bg-white/60 rounded-lg px-3 py-2">
                              <p className="font-bold text-gray-900 text-sm truncate">{pair[1]}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeletePair(key, index)}
                            className="ml-2 p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                      {category.pairs.length} paire{category.pairs.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </>
        )}

        {/* Info Card */}
        <Card variant="glass" padding="md" className="bg-blue-50/60 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-blue-900">
                <strong>Astuce :</strong> Créez des packs de thèmes complets avec plusieurs catégories.
                Vous pourrez les exporter et les partager avec d&apos;autres joueurs !
              </p>
            </div>
          </div>
        </Card>

        <div className="h-8" />
      </Container>
    </PageContainer>
  );
};

export default ThemeBuilderScreen;
