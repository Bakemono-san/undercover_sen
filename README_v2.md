# Undercover Sénégal v2.0 - Complete Refactor

> A professional social deduction game with Senegalese cultural themes, rebuilt with clean architecture and modern React best practices.

## 🎉 What's New in v2.0

This is a **complete architectural refactor** transforming a 1288-line monolithic component into a **clean, maintainable, and scalable** codebase with proper separation of concerns.

### Key Improvements

✅ **Clean Architecture** - Organized into logical layers (UI, Layout, Screens, Context, Utils)  
✅ **Type Safety** - Comprehensive TypeScript definitions  
✅ **Reusable Components** - 15+ UI components with variants  
✅ **Responsive Design** - Mobile-first approach with tablet and desktop support  
✅ **State Management** - Centralized Context API with custom hooks  
✅ **Performance** - Optimized rendering and code splitting  
✅ **Maintainability** - Single Responsibility Principle throughout  
✅ **Scalability** - Easy to extend with new features  

---

## 📊 Architecture Comparison

### Before (v1.0)
```
app/
├── components/
│   └── undercoverSenegal.tsx (1,288 lines - everything in one file)
└── page.tsx
```

### After (v2.0)
```
app/
├── components/
│   ├── layout/          (3 components)
│   ├── screens/         (10 screen components)
│   ├── ui/              (5 reusable UI components)
│   └── GameContainer.tsx
├── contexts/            (Centralized state)
├── hooks/               (Custom reusable hooks)
├── types/               (TypeScript definitions)
└── utils/               (Helper functions & constants)
```

**Result**: 1 monolithic file → 30+ organized, focused components

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State**: React Context API

---

## 🚀 Quick Start

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

Open [http://localhost:3000](http://localhost:3000) to play!

---

## 📱 Responsive Design

The game is fully responsive across all devices:

### Mobile (< 768px)
- Optimized touch targets (min 44x44px)
- Compact layouts
- Simplified navigation
- Vertical-first design

### Tablet (768px - 1024px)
- 2-column layouts
- Larger text and spacing
- Enhanced visual hierarchy
- Grid-based player displays

### Desktop (> 1024px)
- Multi-column layouts
- Maximum content width (2xl)
- Hover states and animations
- Expanded information display

---

## 🧩 Component Architecture

### Screen Components (10)

1. **HomeScreen** - Main menu with game options
2. **SavedPlayersScreen** - Saved players management
3. **RulesScreen** - Game rules and instructions
4. **PlayersScreen** - Player name editing
5. **ConfigScreen** - Game configuration
6. **RevealScreen** - Secret role revelation
7. **DiscussionScreen** - Discussion timer phase
8. **VoteScreen** - Voting interface
9. **MrWhiteScreen** - Mr. White's final guess
10. **ResultsScreen** - Game results and statistics

### UI Components Library

#### Layout Components
- `Container` - Responsive wrapper with variants (default, game, centered)
- `PageContainer` - Full-page backgrounds (light, dark, gradients)
- `GridContainer` - Responsive grid layouts (1-4 columns)
- `Header` - Navigation header with back/menu
- `SimpleHeader` - Minimal header for simple pages
- `Menu` - Dropdown menu with animated items

#### Interactive Components
- `Button` - Multi-variant buttons (primary, success, danger, warning, ghost)
- `Card` - Content containers (default, glass, gradient, bordered)
- `PlayerCard` - Player information display (compact & full modes)
- `RoleBadge` - Role indicators with icons
- `Timer` - Count-up/countdown timer with controls
- `CountdownTimer` - Timer with progress bar

---

## 🎯 State Management

### GameContext API

Centralized state management with:
- ✅ Screen navigation
- ✅ Player management (add, edit, delete)
- ✅ Game configuration
- ✅ Game flow control
- ✅ Vote tracking
- ✅ Round history
- ✅ localStorage persistence

### Custom Hooks

#### `useLocalStorage<T>`
```typescript
const [value, setValue] = useLocalStorage<string[]>('key', []);
```
- Type-safe localStorage
- Automatic JSON serialization
- SSR-safe

#### `useTimer`
```typescript
const { time, start, pause, reset } = useTimer(0);
```
- Count-up functionality
- Optional time limits
- Completion callbacks

#### `useSavedPlayers`
```typescript
const { savedPlayers, savePlayers, clearSavedPlayers } = useSavedPlayers();
```
- Player list persistence
- Easy save/load interface

---

## 🎨 Design System

### Color Palette

```typescript
// Role Colors
Citizen:    #10B981 (Green)
Undercover: #F97316 (Orange)  
Mr. White:  #A855F7 (Purple)

// Backgrounds
Warm:   Amber → Orange → Red
Cool:   Green → Emerald
Dark:   Gray → Orange
```

### Component Variants

All components support multiple visual styles:

```typescript
<Button variant="primary" size="lg" icon={Play} />
<Card variant="glass" padding="md" />
<RoleBadge role="citizen" size="lg" />
```

### Responsive Typography

```css
text-sm md:text-base lg:text-lg    /* Body */
text-xl md:text-2xl lg:text-3xl    /* Headings */
text-3xl md:text-4xl lg:text-5xl   /* Hero */
```

---

## 📁 Project Structure

```
undercover_sen/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.tsx       (Responsive containers)
│   │   │   ├── Header.tsx          (Navigation headers)
│   │   │   └── Menu.tsx            (Dropdown menus)
│   │   │
│   │   ├── screens/
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
│   │   ├── ui/
│   │   │   ├── Button.tsx          (Multi-variant buttons)
│   │   │   ├── Card.tsx            (Content containers)
│   │   │   ├── PlayerCard.tsx      (Player displays)
│   │   │   ├── RoleBadge.tsx       (Role indicators)
│   │   │   └── Timer.tsx           (Timer displays)
│   │   │
│   │   └── GameContainer.tsx       (Main router)
│   │
│   ├── contexts/
│   │   └── GameContext.tsx         (Global state provider)
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts      (localStorage hook)
│   │   └── useTimer.ts             (Timer hook)
│   │
│   ├── types/
│   │   └── game.ts                 (TypeScript definitions)
│   │
│   ├── utils/
│   │   ├── constants.ts            (Game constants & themes)
│   │   └── gameHelpers.ts          (Helper functions)
│   │
│   ├── globals.css                 (Global styles & animations)
│   ├── layout.tsx                  (Root layout)
│   └── page.tsx                    (Entry point)
│
├── public/                         (Static assets)
├── ARCHITECTURE.md                 (Detailed documentation)
└── package.json
```

---

## 🎮 Game Features

### Senegalese Themes

#### 🍲 Cuisine
- Thiéboudienne vs Yassa
- Mafé vs Domoda
- Pastels vs Fataya
- Café Touba vs Thé Attaya
- And more...

#### 🚌 Transport
- Car Rapide vs Ndiaga Ndiaye
- Tata vs Clando
- Bâché vs Sept-place
- TER vs Train

#### 📍 Lieux
- Sandaga vs HLM
- Plateau vs Almadies
- Touba vs Tivaouane
- Lac Rose vs Île de Gorée

#### 🎭 Culture
- Lutte Sénégalaise vs Football
- Sabar vs Mbalax
- Tabaski vs Korité
- Teranga vs Jom

### Game Roles

#### 👥 Citoyens (Citizens)
- Receive the same word
- Must identify impostors
- Win by eliminating all undercovers

#### 🕵️ Undercovers
- Receive a similar word
- Must stay hidden
- Win by matching citizen count

#### 👑 Mr. White
- Receives no word
- Must deduce from context
- Can win by guessing the word

---

## ✨ Best Practices Implemented

### Code Quality
✅ Single Responsibility Principle  
✅ DRY (Don't Repeat Yourself)  
✅ Component composition over inheritance  
✅ Props destructuring with defaults  
✅ TypeScript strict mode  

### Performance
✅ Code splitting per route  
✅ Lazy loading where appropriate  
✅ Memoization for expensive computations  
✅ Optimized re-renders  

### Accessibility
✅ Semantic HTML  
✅ ARIA labels  
✅ Keyboard navigation  
✅ Focus management  
✅ Screen reader friendly  

### Responsive Design
✅ Mobile-first approach  
✅ Touch-friendly targets  
✅ Responsive typography  
✅ Adaptive layouts  
✅ Progressive enhancement  

---

## 📚 Documentation

- **ARCHITECTURE.md** - Detailed architecture guide
- **Component JSDoc** - Inline documentation
- **TypeScript Interfaces** - Self-documenting types
- **README_v2.md** - This file!

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Online multiplayer (WebSocket)
- [ ] Custom theme builder
- [ ] Player statistics & history
- [ ] Achievement system
- [ ] Sound effects & music
- [ ] Animation library
- [ ] PWA support (offline play)
- [ ] Multi-language support

### Technical Improvements
- [ ] Component documentation (Storybook)
- [ ] Error boundary implementation
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] SEO optimization

---

## 🤝 Contributing

This is a demonstration of clean architecture and best practices. Feel free to:
- Study the code structure
- Learn from the patterns
- Adapt for your own projects
- Suggest improvements

---

## 📄 License

Educational project - Undercover Sénégal Game

---

## 🎓 Learning Outcomes

This refactor demonstrates:

1. **Component Architecture** - How to break down monolithic code
2. **State Management** - Context API best practices
3. **TypeScript** - Type safety in large applications
4. **Responsive Design** - Mobile-first development
5. **Clean Code** - SOLID principles in React
6. **Performance** - Optimization techniques
7. **Scalability** - Future-proof structure

---

## 🙏 Acknowledgments

Built with modern web technologies and best practices from the React community.

---

**Version**: 2.0  
**Last Updated**: January 2024  
**Architecture**: Senior-level refactor with clean separation of concerns

---

## 🚦 Getting Started Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:3000`

### 4. Start Playing!
- Click "NOUVELLE PARTIE"
- Add/edit player names
- Configure game settings
- Launch the game
- Enjoy!

---

**Made with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**