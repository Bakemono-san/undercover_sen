# Migration Guide: v1.0 → v2.0

## Overview

This guide explains the architectural transformation from the monolithic v1.0 to the clean, modular v2.0 architecture.

---

## 🔄 What Changed?

### Before (v1.0)
```
app/components/undercoverSenegal.tsx (1,288 lines)
└── Everything in one massive component:
    ├── All state management
    ├── All game logic
    ├── All UI rendering
    └── No separation of concerns
```

### After (v2.0)
```
app/
├── components/
│   ├── layout/          → Reusable layout components
│   ├── screens/         → Screen-specific components
│   ├── ui/              → UI component library
│   └── GameContainer    → Screen router
├── contexts/            → Global state management
├── hooks/               → Custom reusable hooks
├── types/               → TypeScript definitions
└── utils/               → Helper functions & constants
```

---

## 📋 Breaking Changes

### 1. Component Structure

**Old:**
```typescript
// Everything in one file
const UndercoverSenegal = () => {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState([]);
  // ... 100+ more lines of state
  
  if (screen === "home") { /* ... */ }
  if (screen === "players") { /* ... */ }
  // ... etc
}
```

**New:**
```typescript
// Separated into focused components
<GameProvider>         ← State management
  <GameContainer>      ← Screen routing
    <HomeScreen />     ← Individual screens
  </GameContainer>
</GameProvider>
```

### 2. State Management

**Old:**
```typescript
// Local state in component
const [players, setPlayers] = useState([]);
const [gameConfig, setGameConfig] = useState({...});
```

**New:**
```typescript
// Centralized in Context
const { players, gameConfig } = useGame();
```

### 3. Game Logic

**Old:**
```typescript
// Inline in component
const startGame = () => {
  if (players.length > 0) {
    setScreen("players");
  } else {
    const newPlayers = Array.from(...);
    setPlayers(newPlayers);
  }
}
```

**New:**
```typescript
// Extracted to Context with proper typing
const { startGame } = useGame();
```

---

## 🗺️ Component Mapping

### Screen Components

| Old (Inline Render) | New (Dedicated Component) |
|---------------------|---------------------------|
| `if (screen === "home")` | `<HomeScreen />` |
| `if (screen === "players")` | `<PlayersScreen />` |
| `if (screen === "config")` | `<ConfigScreen />` |
| `if (screen === "reveal")` | `<RevealScreen />` |
| `if (screen === "discussion")` | `<DiscussionScreen />` |
| `if (screen === "vote")` | `<VoteScreen />` |
| `if (screen === "mrwhite")` | `<MrWhiteScreen />` |
| `if (screen === "results")` | `<ResultsScreen />` |
| `if (screen === "rules")` | `<RulesScreen />` |
| `if (screen === "saved")` | `<SavedPlayersScreen />` |

### UI Elements

| Old (Inline JSX) | New (Reusable Component) |
|------------------|--------------------------|
| Button markup | `<Button variant="primary" />` |
| Card containers | `<Card variant="glass" />` |
| Player display | `<PlayerCard player={...} />` |
| Role badges | `<RoleBadge role="citizen" />` |
| Timer display | `<Timer time={seconds} />` |
| Headers | `<Header title="..." />` |
| Menu dropdown | `<Menu items={[...]} />` |

---

## 🔧 Migration Steps

### Step 1: Update Imports

**Old:**
```typescript
import UndercoverSenegal from "./components/undercoverSenegal";
```

**New:**
```typescript
import { GameProvider } from "./contexts/GameContext";
import { GameContainer } from "./components/GameContainer";
```

### Step 2: Update App Entry Point

**Old (page.tsx):**
```typescript
export default function Home() {
  return <UndercoverSenegal />;
}
```

**New (page.tsx):**
```typescript
export default function Home() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
```

### Step 3: Access State via Context

**Old:**
```typescript
// Direct state access
const [players, setPlayers] = useState([]);
```

**New:**
```typescript
// Access through context hook
const { players, setPlayers } = useGame();
```

### Step 4: Use Component Library

**Old:**
```typescript
<button className="w-full bg-gradient-to-r from-orange-500...">
  NOUVELLE PARTIE
</button>
```

**New:**
```typescript
<Button 
  variant="primary" 
  size="lg" 
  fullWidth
  icon={Play}
>
  NOUVELLE PARTIE
</Button>
```

---

## 📦 New Features Available

### 1. Type-Safe Props

```typescript
interface PlayerCardProps {
  player: Player;
  editable?: boolean;
  compact?: boolean;
  onEdit?: (id: number, name: string) => void;
}
```

### 2. Component Variants

```typescript
// Buttons
<Button variant="primary | success | danger | warning | ghost" />

// Cards
<Card variant="default | glass | gradient | bordered" />

// Containers
<Container variant="default | game | centered" />
```

### 3. Custom Hooks

```typescript
// Timer management
const { time, start, pause, reset } = useTimer(0);

// LocalStorage
const [value, setValue] = useLocalStorage('key', defaultValue);

// Saved players
const { savedPlayers, savePlayers } = useSavedPlayers();
```

### 4. Responsive Utilities

```typescript
// Automatic responsive sizing
<Container>  // max-w-md md:max-w-xl lg:max-w-2xl

// Grid layouts
<GridContainer columns={2}>  // 1 on mobile, 2 on tablet
```

---

## 🎯 Best Practices

### 1. Component Creation

```typescript
// ✅ Do: Create focused components
export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  editable = false,
}) => {
  // Single responsibility: display player info
};

// ❌ Don't: Create god components
const Everything = () => {
  // 1000+ lines of mixed concerns
};
```

### 2. State Management

```typescript
// ✅ Do: Use context for global state
const { players, gameConfig } = useGame();

// ❌ Don't: Prop drill through many levels
<Parent>
  <Child players={players}>
    <GrandChild players={players}>
      <GreatGrandChild players={players} />
```

### 3. TypeScript Usage

```typescript
// ✅ Do: Define interfaces
interface Player {
  id: number;
  name: string;
  eliminated: boolean;
}

// ❌ Don't: Use 'any'
const player: any = {...};
```

### 4. Component Composition

```typescript
// ✅ Do: Compose from smaller parts
<Card variant="default" padding="md">
  <CardHeader>
    <CardTitle>Players</CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>

// ❌ Don't: Build monolithic components
<div className="...">
  {/* 500 lines of JSX */}
</div>
```

---

## 🔍 Code Examples

### Example 1: Home Screen

**Old (inline in main component):**
```typescript
if (screen === "home") {
  return (
    <div className="min-h-screen bg-gradient-to-br...">
      <div className="max-w-md mx-auto pt-8">
        {/* 150+ lines of JSX */}
      </div>
    </div>
  );
}
```

**New (dedicated component):**
```typescript
// HomeScreen.tsx
export const HomeScreen: React.FC = () => {
  const { startGame, savedPlayers } = useGame();
  
  return (
    <PageContainer background="gradient-warm">
      <Container>
        {/* Organized, reusable components */}
      </Container>
    </PageContainer>
  );
};
```

### Example 2: Player Management

**Old:**
```typescript
const updatePlayerName = (id, newName) => {
  setPlayers(players.map(p => 
    p.id === id ? { ...p, name: newName } : p
  ));
};
```

**New:**
```typescript
// In GameContext.tsx (centralized)
const updatePlayerName = (id: number, newName: string) => {
  setPlayers(
    players.map(p => (p.id === id ? { ...p, name: newName } : p))
  );
};

// In component (simple usage)
const { updatePlayerName } = useGame();
```

### Example 3: Button Usage

**Old:**
```typescript
<button
  onClick={startGame}
  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
>
  <Play className="w-6 h-6" />
  NOUVELLE PARTIE
</button>
```

**New:**
```typescript
<Button
  variant="warning"
  size="lg"
  icon={Play}
  fullWidth
  onClick={startGame}
>
  NOUVELLE PARTIE
</Button>
```

---

## 🚀 Performance Improvements

### 1. Code Splitting
- **Old**: Single 1288-line bundle
- **New**: Automatic route-based splitting per screen

### 2. Component Reusability
- **Old**: Duplicated JSX across renders
- **New**: Shared component library

### 3. Bundle Size
- **Old**: Everything loaded upfront
- **New**: Tree-shaking removes unused code

### 4. Rendering
- **Old**: Large component re-renders
- **New**: Focused component updates

---

## 🐛 Common Migration Issues

### Issue 1: Context Not Found

**Error:**
```
useGame must be used within a GameProvider
```

**Solution:**
```typescript
// Wrap your app with GameProvider
<GameProvider>
  <GameContainer />
</GameProvider>
```

### Issue 2: Import Errors

**Error:**
```
Cannot find module './screens/HomeScreen'
```

**Solution:**
```typescript
// Use correct path from screens/index.ts
import { HomeScreen } from './screens';
```

### Issue 3: Type Errors

**Error:**
```
Type 'string' is not assignable to type 'PlayerRole'
```

**Solution:**
```typescript
// Import and use proper types
import { PlayerRole } from '../types/game';
const role: PlayerRole = "citizen"; // ✅ Type-safe
```

---

## 📚 Additional Resources

- **ARCHITECTURE.md** - Detailed architecture documentation
- **README_v2.md** - Complete feature overview
- **Component JSDoc** - Inline component documentation
- **TypeScript Interfaces** - Type definitions in `types/game.ts`

---

## ✅ Migration Checklist

- [ ] Update app entry point (page.tsx)
- [ ] Wrap app with GameProvider
- [ ] Replace inline state with useGame() hook
- [ ] Convert inline JSX to component library
- [ ] Update all imports
- [ ] Remove old undercoverSenegal.tsx
- [ ] Test all game flows
- [ ] Verify responsive design
- [ ] Check localStorage functionality
- [ ] Validate TypeScript types

---

## 🎓 Learning Points

This migration teaches:

1. **Separation of Concerns** - Each file has one job
2. **Component Composition** - Build complex UIs from simple parts
3. **State Management** - Context API for global state
4. **Type Safety** - TypeScript for reliability
5. **Code Organization** - Logical folder structure
6. **Reusability** - DRY principle in practice
7. **Scalability** - Easy to add new features

---

## 📞 Need Help?

Check the documentation:
- `ARCHITECTURE.md` - Architecture details
- `README_v2.md` - Feature documentation
- Component files - JSDoc comments

---

**Version**: 2.0  
**Migration Date**: January 2024  
**Status**: ✅ Complete