# MindNotes - Project Structure & Architecture Guide

## 🎯 Project Overview

MindNotes is a professional-grade journaling app built with React Native & Expo. This document provides a comprehensive guide to the restructured codebase.

**Status**: MVP Foundation - Design & UI Complete (API Integration Pending)

---

## 📁 Folder Structure

```
src/
├── app/                              # Expo Router Navigation
│   ├── _layout.tsx                  # Root layout with auth handling
│   ├── (auth)/                      # Authentication screens stack
│   │   ├── _layout.tsx              # Auth navigation
│   │   ├── welcome.tsx              # Welcome screen
│   │   ├── login.tsx                # Email login
│   │   ├── signup.tsx               # User registration
│   │   ├── interests.tsx            # Interest selection
│   │   └── profile-setup.tsx        # Profile completion
│   │
│   ├── (tabs)/                      # Main app bottom tab navigation
│   │   ├── _layout.tsx              # Tab navigation setup
│   │   ├── home.tsx                 # Dashboard (Streak, Calendar, Mood, Prompts)
│   │   ├── journal.tsx              # Journal entries list with search/filter
│   │   ├── prompts.tsx              # Daily prompts display
│   │   ├── focus.tsx                # Focus programs & timer
│   │   ├── mood.tsx                 # Mood tracker & visualization
│   │   └── profile.tsx              # User profile & settings
│   │
│   ├── entry/
│   │   └── [id].tsx                 # Entry detail view / edit
│   │
│   ├── prompt/
│   │   └── [id].tsx                 # Prompt response screen
│   │
│   ├── program/
│   │   ├── [id].tsx                 # Program details
│   │   ├── day/[dayId].tsx          # Daily program task view
│   │   └── review/[weekId].tsx      # Weekly review
│   │
│   └── timer/
│       └── [sessionId].tsx          # Active focus timer screen
│
├── components/                      # Reusable UI Components
│   ├── common/
│   │   ├── Button.tsx               # PlayfulButton with variants
│   │   ├── TextInput.tsx            # Form input with validation
│   │   ├── Card.tsx                 # Container card component
│   │   └── index.ts                 # Exports
│   │
│   ├── layout/
│   │   ├── Header.tsx               # App header component
│   │   └── Footer.tsx               # Footer/bottom nav
│   │
│   ├── journal/
│   │   ├── EntryCard.tsx            # Journal entry preview card
│   │   ├── EntryEditor.tsx          # Entry creation/edit form
│   │   └── ImagePicker.tsx          # Image selection component
│   │
│   ├── mood/
│   │   ├── MoodSelector.tsx         # Mood selection carousel
│   │   ├── MoodChart.tsx            # Weekly mood visualization
│   │   └── MoodCustomizer.tsx       # Custom mood creation
│   │
│   ├── timer/
│   │   ├── TimerDisplay.tsx         # Timer countdown display
│   │   └── TimerControls.tsx        # Play/pause/reset buttons
│   │
│   ├── prompt/
│   │   ├── PromptCard.tsx           # Single prompt display
│   │   └── PromptResponse.tsx       # Response input component
│   │
│   ├── focus/
│   │   ├── ProgramCard.tsx          # Focus program card
│   │   └── TaskPlanner.tsx          # Daily task planning
│   │
│   └── home/
│       ├── StreakBadge.tsx          # Streak display
│       ├── RecentEntries.tsx        # Recent entries preview
│       └── QuickStats.tsx           # Quick stats display
│
├── features/                        # Feature-specific Logic (Redux/API)
│   ├── auth/
│   │   ├── authSlice.ts             # Redux slice (when added)
│   │   ├── authService.ts           # API calls placeholder
│   │   ├── useAuth.ts               # Custom hook
│   │   └── types.ts                 # Feature types
│   │
│   ├── journal/
│   │   ├── journalSlice.ts          # Redux slice
│   │   ├── journalService.ts        # API calls placeholder
│   │   ├── useJournal.ts            # Custom hook
│   │   └── types.ts
│   │
│   ├── mood/
│   │   ├── moodSlice.ts
│   │   ├── moodService.ts
│   │   ├── useMood.ts
│   │   └── types.ts
│   │
│   ├── focus/
│   │   ├── focusSlice.ts
│   │   ├── focusService.ts
│   │   ├── useFocus.ts
│   │   └── types.ts
│   │
│   ├── prompt/
│   │   ├── promptSlice.ts
│   │   ├── promptService.ts
│   │   ├── usePrompt.ts
│   │   └── types.ts
│   │
│   ├── subscription/
│   │   ├── subscriptionSlice.ts
│   │   ├── subscriptionService.ts
│   │   ├── useSubscription.ts
│   │   └── types.ts
│   │
│   └── notification/
│       ├── notificationSlice.ts
│       ├── notificationService.ts
│       ├── useNotification.ts
│       └── types.ts
│
├── services/                        # External Services (API, Storage, etc)
│   ├── api.ts                       # API client (TODO)
│   ├── auth.ts                      # Authentication service (TODO)
│   ├── storage.ts                   # AsyncStorage wrapper
│   ├── sync.ts                      # Cloud sync (TODO)
│   ├── notifications.ts             # Push notifications (TODO)
│   ├── payments.ts                  # Payment processing (TODO)
│   ├── analytics.ts                 # Analytics tracking (TODO)
│   └── file-upload.ts               # Image/audio upload (TODO)
│
├── hooks/                           # Custom React Hooks
│   ├── useAuth.ts                   # Auth context hook (TODO)
│   ├── useJournal.ts                # Journal data hook (TODO)
│   ├── useMood.ts                   # Mood tracking hook (TODO)
│   ├── useFocus.ts                  # Focus timer hook (TODO)
│   ├── useNotifications.ts          # Notification hook (TODO)
│   ├── useDarkMode.ts               # Dark mode toggle
│   ├── useLocalStorage.ts           # Local storage wrapper
│   └── useNetworkStatus.ts          # Network connectivity
│
├── store/                           # Redux Store (When added)
│   ├── store.ts                     # Store configuration
│   ├── rootReducer.ts               # Combined reducers
│   └── middleware/
│       ├── persistMiddleware.ts     # AsyncStorage persistence
│       └── syncMiddleware.ts        # Cloud sync middleware
│
├── types/                           # Global TypeScript Types
│   └── index.ts                     # All app types & interfaces
│
├── utils/                           # Utility Functions
│   ├── date.ts                      # Date manipulation
│   ├── format.ts                    # Text/number formatting
│   ├── validation.ts                # Input validation
│   ├── analytics.ts                 # Analytics helpers
│   ├── logger.ts                    # Logging utility
│   └── error-handler.ts             # Error handling
│
├── constants/                       # Global Constants
│   ├── theme.ts                     # Design system & colors
│   ├── config.ts                    # App configuration
│   ├── prompts.ts                   # Prompt library
│   ├── focusPrograms.ts             # Program templates
│   ├── languages.ts                 # i18n keys
│   └── moods.ts                     # Default moods
│
├── i18n/                            # Internationalization (Future)
│   ├── en.ts                        # English translations
│   ├── es.ts                        # Spanish (future)
│   ├── fr.ts                        # French (future)
│   └── index.ts                     # i18n setup
│
├── styles/                          # Global Styles
│   ├── global.css                   # Global CSS/Tailwind
│   └── tailwind.config.js           # Tailwind configuration
│
└── assets/                          # Static Resources
    ├── images/                      # App images & icons
    ├── fonts/                       # Custom fonts
    └── illustrations/               # Illustrations/SVGs
```

---

## 🎨 Design System

### Global Theme (`src/constants/theme.ts`)

All design tokens are centralized in one file:

```typescript
// Colors
theme.colors.primary      // Yellow #FCD34D
theme.colors.neutral      // Black, white, grays
theme.colors.mood         // 6+ mood colors
theme.colors.status       // Success, error, warning, info

// Typography
theme.typography.fontSize // xs to 5xl
theme.typography.fontWeight // light to extrabold
theme.typography.lineHeight // tight to loose

// Spacing (4px base unit)
theme.spacing[1]  // 4px
theme.spacing[4]  // 16px
// ... up to spacing[96]

// Border Radius
theme.borderRadius.sm     // 8px
theme.borderRadius.lg     // 20px
theme.borderRadius.full   // 9999px

// Shadows (elevation system)
theme.shadows.sm / md / lg / xl

// Animations
theme.animations.duration.fast / base / slow

// Mobile-specific
theme.mobile.tabBarHeight
theme.mobile.touchTarget.medium
```

### Usage Example

```typescript
import { theme } from '@/constants/theme';

<View style={{
  padding: theme.spacing[4],
  backgroundColor: theme.colors.primary.main,
  borderRadius: theme.borderRadius.lg,
  ...theme.shadows.md
}}>
  <Text style={{
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.neutral.black
  }}>
    Hello
  </Text>
</View>
```

---

## 📱 Screen Structure

### Authentication Flow
```
Welcome → Login/Signup → Interests Selection → Profile Setup → Home (Main App)
```

### Main App Tabs
1. **Home** - Dashboard with streak, calendar, mood chart, daily prompt
2. **Journal** - List of all entries with search/filter
3. **Prompts** - Daily reflection questions
4. **Focus** - Focus programs and timer
5. **Mood** - Mood tracking and visualization
6. **Profile** - User settings and preferences

### Modal Screens
- Entry detail/edit (`/entry/[id]`)
- Prompt response (`/prompt/[id]`)
- Program details (`/program/[id]`)
- Timer (`/timer/[sessionId]`)

---

## 🔧 Core Components

### Button Component
```typescript
<Button
  title="Click Me"
  onPress={() => {}}
  variant="primary|secondary|outline|ghost|danger"
  size="small|medium|large"
  fullWidth={false}
  loading={false}
  disabled={false}
/>
```

### TextInput Component
```typescript
<TextInput
  label="Email"
  placeholder="your@email.com"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  icon={<Mail size={20} />}
  multiline={false}
/>
```

### Card Component
```typescript
<Card
  shadowLevel="sm|md|lg"
  onPress={() => {}}
>
  {/* Content */}
</Card>
```

---

## 📊 Data Models

### Core Types (in `src/types/index.ts`)

**User**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  subscription: Subscription;
  streak: { count: number; lastEntryDate: Date; }
}
```

**JournalEntry**
```typescript
interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string; // mood ID
  tags: string[];
  images: string[];
  audio?: { url: string; duration: number };
  entryType: 'free|prompt|audio';
  date: Date;
  isFavorite: boolean;
}
```

**DailyPrompt**
```typescript
interface DailyPrompt {
  id: string;
  date: Date;
  questions: string[]; // 5 questions
  category: string;
  language: 'en';
}
```

**FocusProgram**
```typescript
interface FocusProgram {
  id: string;
  type: '14day|30day|custom';
  startDate: Date;
  daysCompleted: number;
  totalDays: number;
  status: 'active|completed|paused';
}
```

**Mood**
```typescript
interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  isDefault: boolean;
}
```

---

## 🎯 MVP Features Status

### Completed ✅
- [x] Project structure & folder organization
- [x] Global theme system
- [x] TypeScript types & interfaces
- [x] Common UI components (Button, TextInput, Card)
- [x] Authentication screens (Login, Signup, Interests, Profile)
- [x] Home/Dashboard screen
- [x] Journal entries list screen
- [x] Prompts screen
- [x] Focus programs screen
- [x] Mood tracker screen
- [x] Profile/Settings screen
- [x] Entry detail screen

### In Progress 🔄
- [ ] Create entry screen (with image/audio upload)
- [ ] Focus timer screen
- [ ] Program detail screens
- [ ] Redux state management setup
- [ ] API integration layer

### Planned 📋
- [ ] API integration for all features
- [ ] Cloud sync implementation
- [ ] Push notifications setup
- [ ] Payment integration (Stripe/RevenueCat)
- [ ] Authentication with Firebase/custom backend
- [ ] Export to PDF functionality
- [ ] Dark mode implementation
- [ ] Multi-language support (i18n)
- [ ] Error boundaries and error handling
- [ ] Performance optimization
- [ ] Unit & integration tests

---

## 🚀 Development Workflow

### Adding a New Screen

1. Create route file in appropriate folder:
   ```bash
   src/app/new-screen.tsx
   ```

2. Use global theme:
   ```typescript
   import { theme } from '@/constants/theme';
   ```

3. Use common components:
   ```typescript
   import { Button, Card, TextInput } from '@/components/common';
   ```

4. Use proper types:
   ```typescript
   import { JournalEntry } from '@/types';
   ```

### Adding a New Component

1. Create in appropriate subfolder:
   ```bash
   src/components/journal/NewJournalComponent.tsx
   ```

2. Use theme tokens for styling
3. Export from component's `index.ts`
4. Import in screens as needed

### Adding a New Feature

1. Create feature folder: `src/features/featureName/`
2. Add files:
   - `types.ts` - Feature-specific types
   - `featureSlice.ts` - Redux slice (when state mgmt added)
   - `featureService.ts` - API calls placeholder
   - `useFeature.ts` - Custom hook

---

## 📐 Responsive Design

All screens are **mobile-first** responsive:

- Safe area handling for notches
- Flexible layouts with Flexbox
- Font size scaling
- Touch target minimums (44-48px)
- Horizontal padding: `theme.spacing[4]` (16px)

---

## 🔐 Next Steps

### Immediate (This Week)
1. [ ] Create entry screen with image/audio upload
2. [ ] Create timer screen
3. [ ] Set up Redux for state management
4. [ ] Create placeholder API service layer

### Short-term (Next Week)
1. [ ] Implement mock data for all screens
2. [ ] Add navigation between screens
3. [ ] Test responsive behavior on multiple devices
4. [ ] Optimize performance (Code splitting, lazy loading)

### Medium-term (Next 2 weeks)
1. [ ] Connect to real backend API
2. [ ] Implement authentication
3. [ ] Add offline-first capability
4. [ ] Set up error handling & validation

---

## 📚 Code Standards

### Naming Conventions
- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`myVariable`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINT`)
- **Types**: PascalCase (`User`, `JournalEntry`)

### File Organization
- One component per file
- Related utilities in same folder
- Types alongside features
- Styles inline or in theme

### TypeScript
- Strict mode enabled
- Explicit prop types for all components
- Interface-based typing
- Avoid `any` type

---

## 🎨 Color Palette Reference

| Color | Hex | Use |
|-------|-----|-----|
| Primary | #FCD34D | Buttons, highlights |
| Primary Light | #FEF3C7 | Backgrounds, hover |
| Primary Dark | #F59E0B | Emphasis |
| Happy (Mood) | #FFE4E1 | Mood indicator |
| Excited (Mood) | #FFA07A | Mood indicator |
| Calm (Mood) | #E6F3F0 | Mood indicator |
| Reflective (Mood) | #F3E5F5 | Mood indicator |
| Success | #10B981 | Positive feedback |
| Error | #EF4444 | Errors, delete |
| Black | #1F2937 | Primary text |
| White | #FFFFFF | Cards, backgrounds |

---

## 📞 Support & Documentation

For API integration details, check:
- `src/services/api.ts` (TODO section)
- `src/features/*/featureService.ts` (TODO section)
- `src/constants/config.ts` (API endpoints)

---

**Last Updated**: October 2024
**Version**: 1.0.0 (MVP)
**Status**: Design Complete, Ready for API Integration
