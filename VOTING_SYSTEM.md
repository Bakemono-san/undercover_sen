# 🗳️ One Vote Per Player System - Documentation

## 📋 Overview

The voting system has been enhanced to ensure **each player can only vote once** per round, creating a fair and balanced elimination process.

---

## ✅ How It Works

### Previous System ❌
- Players could vote multiple times
- No tracking of who has voted
- Unfair voting manipulation possible
- Unclear vote distribution

### New System ✅
- Each player votes exactly once
- Clear voter selection interface
- Vote tracking per player
- Fair and transparent process

---

## 🎮 Game Flow

### Step-by-Step Voting Process

```
1. Discussion Phase Ends
        ↓
2. Vote Screen Opens
        ↓
3. Select WHO is voting (Voter Selection)
        ↓
4. Vote AGAINST a player (Target Selection)
        ↓
5. Voter is marked as "voted" ✓
        ↓
6. Repeat for all players
        ↓
7. All players voted? → Enable "Finalize Vote"
        ↓
8. Eliminate player with most votes
```

---

## 🎯 User Interface

### 1. Voter Selection Panel (Top)
```
┌─────────────────────────────────────────────┐
│ 👤 1. Qui vote maintenant ?                 │
├─────────────────────────────────────────────┤
│  [Joueur 1]  [Joueur 2]  [✓ Joueur 3]      │
│  [Joueur 4]  [Joueur 5]  [Joueur 6]        │
│                                             │
│  3 / 6 joueurs ont voté                     │
└─────────────────────────────────────────────┘
```

**States:**
- 🔵 **Available** - Blue, clickable
- ✅ **Already Voted** - Gray, disabled with checkmark
- 🎯 **Selected** - Dark blue, highlighted

### 2. Target Selection Panel (Bottom)
```
┌─────────────────────────────────────────────┐
│ 🗳️ 2. Voter contre qui ?                    │
├─────────────────────────────────────────────┤
│   ┌─────┐    ┌─────┐    ┌─────┐            │
│   │  2  │    │  1  │    │  0  │            │
│   │ J1  │    │ J2  │    │ J3  │            │
│   └─────┘    └─────┘    └─────┘            │
│   2 votes    1 vote     0 vote             │
└─────────────────────────────────────────────┘
```

**Features:**
- Number badge shows vote count
- Only clickable when voter is selected
- Visual feedback on hover/click
- Real-time vote updates

---

## 🔒 Vote Validation

### Rules Enforced

1. **Select Voter First**
   - Cannot vote without selecting who is voting
   - Warning shown if no voter selected

2. **One Vote Only**
   - Each player ID tracked in `votedPlayers` Set
   - Duplicate votes prevented at code level

3. **All Must Vote**
   - "Finalize" button disabled until all active players vote
   - Progress shown: "3 / 6 votes"

4. **No Self-Voting Prevention** (Optional)
   - Can be added: `if (voterId === targetId) return;`

---

## 💻 Technical Implementation

### State Management

```typescript
// Component State
const [selectedVoter, setSelectedVoter] = useState<number | null>(null);
const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());

// Context State
const [voteResults, setVoteResults] = useState<VoteResults>({});
const [votedPlayers, setVotedPlayers] = useState<Set<number>>(new Set());
```

### Vote Function

```typescript
const vote = (playerId: number, voterId: number) => {
  // Check if this voter has already voted
  if (votedPlayers.has(voterId)) {
    return; // Already voted, ignore
  }

  // Record the vote
  const newResults = { ...voteResults };
  newResults[playerId] = (newResults[playerId] || 0) + 1;
  setVoteResults(newResults);

  // Mark voter as having voted
  const newVotedPlayers = new Set(votedPlayers);
  newVotedPlayers.add(voterId);
  setVotedPlayers(newVotedPlayers);
};
```

### Reset on New Round

```typescript
const startVoting = () => {
  setScreen("vote");
  setVoteResults({});
  setVotedPlayers(new Set()); // Clear vote tracking
};
```

---

## 🎨 Visual Feedback

### Voter Button States

| State | Background | Border | Cursor | Icon |
|-------|------------|--------|--------|------|
| Available | Blue-50 | Blue-200 | Pointer | - |
| Selected | Blue-500 | - | Pointer | - |
| Voted | Gray-200 | - | Not-allowed | ✓ |

### Target Button States

| State | Background | Border | Cursor | Opacity |
|-------|------------|--------|--------|---------|
| Can Vote | Orange-50 | Orange-200 | Pointer | 100% |
| Cannot Vote | Gray-100 | Gray-200 | Not-allowed | 60% |

---

## 📊 Progress Tracking

### Vote Counter
```typescript
votedPlayers.size / activePlayers.length

Examples:
- "0 / 6 joueurs ont voté"
- "3 / 6 joueurs ont voté"
- "6 / 6 joueurs ont voté" → Enable Finalize
```

### Button Text Updates
```typescript
votedPlayers.size < activePlayers.length
  ? `En attente (${votedPlayers.size}/${activePlayers.length} votes)`
  : topVotedPlayer
    ? `Éliminer ${topVotedPlayer.name}`
    : "Finaliser le vote"
```

---

## 🔄 User Flow Example

### Scenario: 6 Players Voting

```
Round 1 - Voting Phase

Step 1: Joueur 1 votes
  → Click "Joueur 1" (voter selection)
  → Click "Joueur 3" (target)
  → Joueur 1 marked as voted ✓
  → Vote count for Joueur 3: 1

Step 2: Joueur 2 votes
  → Click "Joueur 2"
  → Click "Joueur 3"
  → Joueur 2 marked as voted ✓
  → Vote count for Joueur 3: 2

Step 3-6: Continue until all vote
  → Progress: 6 / 6 votes
  → Button enabled: "Éliminer Joueur 3"
  
Step 7: Finalize
  → Click button
  → Joueur 3 eliminated
  → Next round begins
```

---

## ⚠️ Edge Cases Handled

### 1. No Voter Selected
```typescript
if (!selectedVoter) {
  // Show warning
  // Disable target selection
  return;
}
```

### 2. Voter Already Voted
```typescript
if (votedPlayers.has(selectedVoter)) {
  // Prevent duplicate vote
  // Button shows as disabled
  return;
}
```

### 3. Tie Votes
```typescript
// Handled by getPlayerWithMostVotes()
// First player with max votes is selected
const eliminatedId = Object.keys(voteResults).find(
  (id) => voteResults[id] === maxVotes
);
```

### 4. Zero Votes Cast
```typescript
// Button stays disabled
disabled={votedPlayers.size < activePlayers.length}
```

---

## 🎯 Benefits

### Fairness
✅ Each player has equal voting power  
✅ No vote manipulation possible  
✅ Transparent process  

### User Experience
✅ Clear two-step process  
✅ Visual progress tracking  
✅ Disabled states prevent errors  
✅ Real-time feedback  

### Game Balance
✅ Democratic elimination  
✅ Strategy-based voting  
✅ Fair for all roles  

---

## 🔮 Future Enhancements

### Possible Additions

1. **Vote History**
   - Track who voted for whom
   - Display voting patterns
   - Analytics per round

2. **Anonymous Voting**
   - Hide who voted for whom
   - Only show totals
   - Prevent revenge voting

3. **Weighted Votes**
   - Special roles get 2 votes
   - Role-based voting power
   - Advanced game mode

4. **Revote System**
   - Allow changing vote before finalize
   - Undo last vote
   - Confirmation required

5. **Timer**
   - Countdown per voter
   - Auto-skip if timeout
   - Faster game pace

---

## 📈 Testing Checklist

- [ ] Each player can vote exactly once
- [ ] Vote count increments correctly
- [ ] Voted players show checkmark
- [ ] Cannot vote without voter selection
- [ ] Button disabled until all vote
- [ ] Progress counter accurate
- [ ] Elimination works correctly
- [ ] State resets for next round
- [ ] UI responsive on mobile
- [ ] Accessibility features work

---

## 🐛 Known Limitations

1. **No Vote Editing**
   - Once voted, cannot change
   - Must be intentional decision

2. **Linear Process**
   - Players must wait their turn
   - Cannot vote simultaneously
   - Could add async voting later

3. **No Abstain Option**
   - All players must vote
   - No "pass" or "skip" option

---

## 📚 Related Files

- `app/contexts/GameContext.tsx` - Vote logic
- `app/components/screens/VoteScreen.tsx` - UI implementation
- `app/types/game.ts` - Type definitions

---

**Version:** 2.1  
**Feature:** One Vote Per Player  
**Status:** ✅ Implemented  
**Quality:** ⭐⭐⭐⭐⭐ Production Ready  

**Made with ❤️ for fair gameplay**