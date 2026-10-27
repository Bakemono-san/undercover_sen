# Undercover Sénégal - Architecture Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [Component Hierarchy](#component-hierarchy)
6. [State Management](#state-management)
7. [Responsive Design](#responsive-design)
8. [Best Practices](#best-practices)
9. [Development Guide](#development-guide)

---

## 🎮 Project Overview

**Undercover Sénégal** is a social deduction game with Senegalese cultural themes. Players receive secret words and must identify the "undercover" players through discussion and voting.

### Game Features

- 🇸🇳 Senegalese cultural themes (cuisine, transport, places, culture)
- 👥 Support for 4+ players
- 🎭 Three roles: Citizens, Undercovers, and Mr. White
- ⏱️ Discussion timer
- 📊 Vote tracking and results
- 💾 Player list persistence
- 📱 Fully responsive (mobile, tablet, desktop)

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Context API + Custom Hooks

---

## 🏗️ Architecture Overview

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         App Layer (page.tsx)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       GameProvider (Context)        │
│   • Global state management         │
│   • Game logic orchestration        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       GameContainer (Router)        │
│   • Screen routing logic            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Screen Components           │
│   • HomeScreen, PlayersScreen, etc  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      UI & Layout Components         │
│   • Buttons, Cards, Headers, etc    │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
undercover_sen/
├── app/
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Container.tsx    # Responsive containers
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   └── Menu.tsx         # Dropdown menu
│   │   │
│   │   ├── screens/             # Game screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── PlayersScreen.tsx
│   │   │   ├── ConfigScreen.tsx
│   │   │   ├── RevealScreen.tsx
│   │   │   ├── DiscussionScreen.tsx
│   │   │   ├── VoteScreen.tsx
│   │   │   ├── MrWhiteScreen.tsx
│   │   │   ├── ResultsScreen.tsx
│   │   │   ├── RulesScreen.tsx
│   │   │   ├── SavedPlayersScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx       # Button with variants
│   │   │   ├── Card.tsx         # Card container
│   │   │   ├── PlayerCard.tsx   # Player display
│   │   │   ├── RoleBadge.tsx    # Role indicators
│   │   │   └── Timer.tsx        # Timer display
│   │   │
│   │   └── GameContainer.tsx    # Main router component
│   │
│   ├── contexts/
│   │   └── GameContext.tsx      # Global state provider
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts   # localStorage hook
│   │   └── useTimer.ts          # Timer management
│   │
│   ├── types/
│   │   └── game.ts              # TypeScript definitions
│   │
│   ├── utils/
│   │   ├── constants.ts         # Game constants
│   │   └── gameHelpers.ts       # Helper functions
│   │
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Entry point
│
├── public/                      # Static assets
└── package.json
```

---

## 🧩 Component Hierarchy

### Screen Components (10 Total)

1. **HomeScreen** - Main menu with game start options
2. **SavedPlayersScreen** - View and load saved players
3. **RulesScreen** - Game rules and instructions
4. **PlayersScreen** - Player name management
5. **ConfigScreen** - Game configuration (roles, counts)
6. **RevealScreen** - Secret role revelation
7. **DiscussionScreen** - Timed discussion phase
8. **VoteScreen** - Voting for elimination
9. **MrWhiteScreen** - Mr. White's final guess
10. **ResultsScreen** - Game results and statistics

### UI Components

#### Layout Components
- `Container` - Responsive wrapper with variants
- `PageContainer` - Full-page background wrapper
- `GridContainer` - Grid layout system
- `Header` - Navigation with back/menu buttons
- `SimpleHeader` - Simplified header
- `Menu` - Dropdown menu system

#### Interactive Components
- `Button` - Multi-variant button (primary, success, danger, etc.)
- `Card` - Content container with variants
- `PlayerCard` - Player information display
- `RoleBadge` - Role indicator with icons
- `Timer` - Countdown/count-up timer
- `CountdownTimer` - Timer with progress bar

---

## 🔄 State Management

### GameContext Architecture

The `GameContext` provides centralized state management:

```typescript
interface GameContextType {
  // Screen navigation
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  
  // Player management
  players: Player[];
  updatePlayerName: (id: number, name: string) => void;
  deletePlayer: (id: number) => void;
  addPlayer: () => void;
  
  // Game flow
  startGame: () => void;
  launchGame: () => void;
  nextReveal: () => void;
  startVoting: () => void;
  endVoting: () => void;
  mrWhiteGuess: (correct: boolean) => void;
  resetGame: () => void;
  
  // State
  currentGame: CurrentGame | null;
  gameConfig: GameConfig;
  voteResults: VoteResults;
  // ... more state
}
```

### Custom Hooks

#### `useLocalStorage`
- Syncs state with localStorage
- Handles JSON serialization
- Provides type safety

#### `useTimer`
- Count-up timer functionality
- Optional time limits
- Start/pause/reset controls

#### `useCountdown`
- Countdown timer
- Completion callbacks
- Pause/resume support

---

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile First Approach */
Base:     < 768px   (mobile)
md:       ≥ 768px   (tablet)
lg:       ≥ 1024px  (desktop)
xl:       ≥ 1280px  (large desktop)
```

### Container Sizes

```typescript
// Responsive container widths
default: "max-w-md md:max-w-xl lg:max-w-2xl"
game:    "max-w-md md:max-w-2xl lg:max-w-4xl"
```

### Typography Scaling

```css
/* Responsive text sizes */
text-sm md:text-base      /* Body text */
text-xl md:text-2xl       /* Headings */
text-3xl md:text-4xl      /* Large headings */
```

### Touch Targets

- Minimum 44x44px for mobile
- Larger hit areas on tablet
- Hover states disabled on touch devices

---

## 🎨 Design System

### Color Palette

```typescript
// Role Colors
Citizen:    Green (#10B981)
Undercover: Orange (#F97316)
Mr. White:  Purple (#A855F7)

// Gradients
Warm:   amber-50 → orange-50 → red-50
Cool:   green-900 → emerald-800
Dark:   gray-900 → orange-900
```

### Component Variants

#### Buttons
- `primary` - Orange/amber gradient
- `success` - Green gradient
- `danger` - Red gradient
- `warning` - Yellow/amber
- `ghost` - Transparent with blur

#### Cards
- `default` - White background
- `glass` - Glassmorphism effect
- `gradient` - Gradient background
- `bordered` - Border variant

---

## ✅ Best Practices

### Code Organization

1. **One component per file**
2. **Logical folder grouping**
3. **Index files for exports**
4. **Type definitions in separate files**

### TypeScript

```typescript
// Always define interfaces
interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

// Use type unions for variants
type ButtonVariant = "primary" | "success" | "danger";

// Export types from central location
export type { Player, GameConfig } from "./types/game";
```

### Component Design

```typescript
// Props interface first
interface ComponentProps {
  required: string;
  optional?: boolean;
}

// Destructure with defaults
export const Component: React.FC<ComponentProps> = ({
  required,
  optional = false,
}) => {
  // Component logic
};
```

### Accessibility

- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation support
- Focus states on interactive elements
- Screen reader friendly

---

## 🚀 Development Guide

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Adding a New Screen

1. Create screen component in `components/screens/`
2. Add to `screens/index.ts`
3. Add screen type to `types/game.ts`
4. Add route case in `GameContainer.tsx`
5. Add navigation logic in `GameContext.tsx`

### Creating a UI Component

```typescript
// 1. Define props interface
interface NewComponentProps {
  variant?: "default" | "special";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// 2. Create component with responsive design
export const NewComponent: React.FC<NewComponentProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  return (
    <div className={`base-styles ${variants[variant]} ${sizes[size]} ${className}`}>
      {/* Content */}
    </div>
  );
};
```

### State Management Pattern

```typescript
// 1. Add state to GameContext
const [newState, setNewState] = useState(initialValue);

// 2. Add to context value
const value: GameContextType = {
  newState,
  setNewState,
  // ... other values
};

// 3. Use in components
const { newState, setNewState } = useGame();
```

---

## 🔧 Utility Functions

### Game Helpers

```typescript
// Helper functions in utils/gameHelpers.ts
formatTime(seconds: number): string
getRoleIcon(role: PlayerRole): LucideIcon
getRoleColor(role: PlayerRole): string
getActivePlayers(players: Player[]): Player[]
shuffleArray<T>(array: T[]): T[]
```

### Constants

```typescript
// Game configuration in utils/constants.ts
GAME_CONSTANTS.MIN_PLAYERS = 4
GAME_CONSTANTS.MAX_UNDERCOVER = 3
THEMES: { food, transport, places, culture }
ROLE_COLORS: { citizen, undercover, mrwhite }
```

---

## 📊 Performance Optimization

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading where appropriate

### Rendering Optimization
- React.memo for pure components
- useCallback for event handlers
- useMemo for expensive computations

### Bundle Size
- Tree-shaking enabled
- Only import needed icons
- Minimal external dependencies

---

## 🧪 Testing Strategy

### Unit Tests
- Test utility functions
- Test custom hooks
- Test context providers

### Component Tests
- Test user interactions
- Test conditional rendering
- Test responsive behavior

### Integration Tests
- Test game flow
- Test state transitions
- Test localStorage persistence

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Multiplayer support (WebSocket)
- [ ] Custom theme creation
- [ ] Statistics tracking
- [ ] Achievements system
- [ ] Sound effects
- [ ] Animations library
- [ ] PWA support
- [ ] Internationalization (i18n)

### Technical Improvements
- [ ] Add E2E tests (Playwright)
- [ ] Add Storybook for components
- [ ] Implement error boundaries
- [ ] Add logging system
- [ ] Performance monitoring
- [ ] SEO optimization

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

## 📄 License

This project is part of the Undercover Sénégal game application.

---

**Last Updated**: 2024
**Version**: 2.0
**Architecture**: Senior-level refactor with clean separation of concerns