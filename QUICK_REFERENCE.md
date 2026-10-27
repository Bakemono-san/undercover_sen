# 🇸🇳 Undercover Sénégal - Quick Reference Guide

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 🆕 What's New in v2.1

### 🛍️ Word Shop Feature
**Access:** Home Screen → "Boutique de Mots"

**Features:**
- ✅ Create custom word pairs
- ✅ Edit existing pairs
- ✅ Delete pairs
- ✅ Organize by category
- ✅ Auto-saved to localStorage
- ✅ Automatically included in games

**Quick Actions:**
```
Add: Click "Ajouter" → Fill form → Save
Edit: Click ✏️ icon → Modify → Update
Delete: Click 🗑️ icon → Confirm
```

---

## 🎨 Senegalese Color Palette

### Flag Colors
```css
Green:  #00853F
Yellow: #FDEF42
Red:    #E31B23
```

### Cultural Colors
```css
Teranga (Orange): #FF6B35
Ocean (Blue):     #0077BE
Sand:             #F4A460
Sunset:           #FF4500
Baobab (Brown):   #8B4513
```

---

## 🖱️ Enhanced Interactions

### Cursor States
- **Buttons**: Pointer with hover scale
- **Inputs**: Text cursor
- **Disabled**: Not-allowed cursor
- **Links**: Pointer cursor

### Hover Effects
- Scale: 102% on hover
- Glow: Senegalese multi-color shadow
- Transition: 200ms smooth

---

## 📝 New Word Pairs Added

### 🍲 Cuisine (4 new pairs)
- Ndambé vs Soupou Kanja
- Mbaxal vs Lakhou Bissap
- Chakri vs Beignet
- Accara vs Nems

### 🚌 Transport (2 new pairs)
- Diaga Diaga vs Jakartaman
- Garage Pompiers vs Petersen

### 📍 Lieux (4 new pairs)
- Monument Renaissance vs Place Soweto
- Yoff vs Ouakam
- Medina vs Parcelles Assainies
- Dakar Dem Dikk vs Colobane

### 🎭 Culture (4 new pairs)
- Griot vs Gewel
- Ndawrabine vs Gamou
- Xessal vs Tëgg
- Wolof vs Pulaar

---

## 🎮 Game Flow

```
Home Screen
    ↓
Word Shop (Optional)
    ↓
Players Setup
    ↓
Configuration
    ↓
Role Reveal
    ↓
Discussion
    ↓
Voting
    ↓
Results
```

---

## 🎯 Screen Navigation

| Screen | Access From | Purpose |
|--------|-------------|---------|
| Home | Always | Main menu |
| Word Shop | Home menu | Manage custom words |
| Saved Players | Home menu | Load saved players |
| Rules | Home menu | Game instructions |
| Players | Start game | Edit player names |
| Config | After players | Set game rules |
| Reveal | After config | Show roles |
| Discussion | After reveal | Describe words |
| Vote | After discussion | Eliminate suspects |
| Mr White | If Mr White eliminated | Final guess |
| Results | Game end | Show winner |

---

## 💡 Pro Tips

### Word Shop
- **Tip 1**: Use similar but distinct words
- **Tip 2**: Stay culturally relevant
- **Tip 3**: Test your pairs before adding many
- **Tip 4**: Categories help organization
- **Tip 5**: Max 50 custom pairs for performance

### Game Strategy
- **Citizens**: Be specific but not obvious
- **Undercovers**: Stay vague, observe
- **Mr White**: Mimic without knowing

### UI/UX
- **Mobile**: Large touch targets (44x44px minimum)
- **Tablet**: 2-column layouts for efficiency
- **Desktop**: Full feature set with hover effects

---

## 🔧 Configuration Options

### Player Count
- **Minimum**: 4 players
- **Default**: 8 players
- **Maximum**: Limited by your creativity!

### Undercover Count
- **Range**: 1-3 undercovers
- **Recommended**: 
  - 4-5 players: 1 undercover
  - 6-8 players: 2 undercovers
  - 9+ players: 3 undercovers

### Mr. White
- **Toggle**: On/Off
- **Impact**: Adds mystery role with no word

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px   (1 column)
Tablet:  768-1024px (2 columns)
Desktop: > 1024px   (3-4 columns)
```

---

## 💾 localStorage Keys

```javascript
"undercover_saved_players"  // Player names
"undercover_custom_words"   // Custom word pairs
```

---

## 🎨 Component Variants

### Button
```typescript
variant: "primary" | "success" | "danger" | "warning" | "ghost"
size: "sm" | "md" | "lg" | "xl"
```

### Card
```typescript
variant: "default" | "glass" | "gradient" | "bordered"
padding: "none" | "sm" | "md" | "lg"
```

### Container
```typescript
variant: "default" | "game" | "centered"
```

---

## 🚨 Common Issues

### Custom words not showing
- **Solution**: Refresh page or clear localStorage

### Game won't start
- **Solution**: Ensure minimum 4 players

### Buttons not clickable
- **Solution**: Check browser console for errors

---

## 🎭 Cultural Elements

### Wolof Phrases
- "Teranga bi dafa nekk!" - Hospitality prevails!
- "Ay lutteur yi gagné!" - The wrestlers won!

### Cultural References
- Griot - Traditional storyteller
- Teranga - Hospitality
- Jom - Honor/Dignity
- Sabar - Traditional dance
- Mbalax - Music genre

---

## 📊 Statistics Display

### Home Screen
- Total word pairs available
- Saved player count
- Available themes

### Word Shop
- Default pairs count
- Custom pairs count
- Total available
- Category breakdown

### Results
- Total rounds played
- Players eliminated
- Votes cast
- Role revelations

---

## 🔑 Keyboard Shortcuts

```
Escape:     Close modals/menus
Enter:      Submit forms
Tab:        Navigate between inputs
Space:      Toggle switches
```

---

## 🎯 Best Practices

### Creating Custom Words
1. ✅ Choose related concepts
2. ✅ Make them subtly different
3. ✅ Use Senegalese context
4. ✅ Test before mass adding
5. ✅ Keep cultural authenticity

### Game Setup
1. ✅ Min 4 players for fun
2. ✅ Save regular player groups
3. ✅ Adjust undercover count based on players
4. ✅ Use Mr. White for added mystery
5. ✅ Mix word categories

---

## 🌟 Feature Highlights

### Visual Design
- ✨ Senegalese flag colors throughout
- 🎨 African-inspired patterns
- 💫 Glow effects on key elements
- 🌈 Vibrant gradients
- 📱 Fully responsive

### User Experience
- 🖱️ Enhanced cursor feedback
- ⚡ Smooth animations
- 📝 Form validation
- 💾 Auto-save functionality
- 🎯 Clear visual hierarchy

### Technical
- 🔒 Type-safe TypeScript
- 🧩 Modular components
- 🚀 Optimized performance
- 📦 Code splitting
- ♿ Accessible design

---

## 📞 Quick Links

- **Architecture**: See `ARCHITECTURE.md`
- **Migration**: See `MIGRATION_GUIDE.md`
- **Enhancements**: See `ENHANCEMENTS_v2.1.md`
- **Full README**: See `README_v2.md`

---

## 🏁 Getting Started Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Start dev server (`npm run dev`)
- [ ] Explore Word Shop
- [ ] Add custom words
- [ ] Start a game
- [ ] Enjoy with friends!

---

**Version**: 2.1  
**Updated**: January 2024  
**Made with**: ❤️ and 🇸🇳 Senegalese pride

**Slogan**: "Teranga bi dafa nekk!" 🇸🇳