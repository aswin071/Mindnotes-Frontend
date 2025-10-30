# MindNotes - Quick Start Guide

## 🚀 Project Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
# or
npx expo start

# 3. Open in your preferred platform
# - Press 'i' for iOS Simulator
# - Press 'a' for Android Emulator
# - Scan QR code with Expo Go app
```

---

## 📁 Project Structure at a Glance

```
src/
├── app/                 # Routes & screens (Expo Router)
├── components/          # Reusable UI components
├── features/            # Feature logic (Redux, API, hooks)
├── services/            # External services (API, storage)
├── types/               # TypeScript interfaces
├── constants/           # Theme, config, constants
└── utils/               # Helper functions
```

---

## 🎨 Using the Theme System

All colors, spacing, and typography are in one place:

```typescript
import { theme } from '@/constants/theme';

// Colors
theme.colors.primary.main        // #FCD34D (yellow)
theme.colors.mood.happy          // #FFE4E1 (peach)
theme.colors.status.error        // #EF4444 (red)

// Spacing (4px base unit)
theme.spacing[4]    // 16px
theme.spacing[6]    // 24px

// Typography
theme.typography.fontSize.base   // 16
theme.typography.fontWeight.bold // '700'

// Shadows
theme.shadows.sm
theme.shadows.md
theme.shadows.lg

// Border Radius
theme.borderRadius.lg   // 20px
```

---

## 🧩 Creating a New Screen

### Step 1: Create the file
```bash
src/app/my-screen.tsx
```

### Step 2: Import essentials
```typescript
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '@/components/common';
import { theme } from '@/constants/theme';
```

### Step 3: Build the screen
```typescript
export default function MyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.beige }}>
      <View style={{ padding: theme.spacing[4] }}>
        <Text style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.neutral.black
        }}>
          My Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

---

## 🔗 Navigation

### Between Tabs
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to another tab
router.push('/(tabs)/journal');
router.push('/(tabs)/focus');
```

### To Detail Screens
```typescript
// Navigate to entry detail
router.push(`/entry/${entryId}`);

// Navigate to program detail
router.push(`/program/${programId}`);
```

### Replace Screen (for auth)
```typescript
// Go to home after login (don't show back button)
router.replace('/(tabs)/home');
```

---

## 🎨 Component Usage

### Button
```typescript
<Button
  title="Save Entry"
  onPress={() => console.log('Saving...')}
  variant="primary"      // primary, secondary, outline, ghost, danger
  size="medium"          // small, medium, large
  fullWidth={true}
  disabled={false}
  loading={false}
/>
```

### TextInput
```typescript
<TextInput
  label="Your Name"
  placeholder="Enter name"
  value={name}
  onChangeText={setName}
  error={nameError}
  icon={<User size={20} />}
  multiline={false}
/>
```

### Card
```typescript
<Card shadowLevel="md">
  <Text>Content goes here</Text>
</Card>
```

---

## 📊 Common Data Models

### User
```typescript
const user: User = {
  id: 'user123',
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    language: 'en',
    timezone: 'UTC',
    notificationTime: '09:00'
  },
  subscription: {
    status: 'free',
  },
  streak: {
    count: 7,
    lastEntryDate: new Date(),
    totalEntries: 42
  }
}
```

### Journal Entry
```typescript
const entry: JournalEntry = {
  id: 'entry123',
  userId: 'user123',
  title: 'My Day',
  content: 'Today was great...',
  mood: 'happy',
  tags: ['gratitude', 'reflection'],
  images: ['url1', 'url2'],
  entryType: 'free',
  date: new Date(),
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### Mood
```typescript
const mood: Mood = {
  id: '1',
  name: 'Happy',
  emoji: '😊',
  color: '#FFE4E1',
  isDefault: true
}
```

---

## 🔌 API Integration (TODO)

### Service Pattern
```typescript
// src/services/api.ts
const API_BASE_URL = 'https://api.mindnotes.app/v1';

export const apiCall = async (endpoint: string, options = {}) => {
  // TODO: Implement API calls
}
```

### Feature Service
```typescript
// src/features/journal/journalService.ts
export const journalService = {
  // TODO: Create entry
  // TODO: Get entries
  // TODO: Update entry
  // TODO: Delete entry
}
```

### Using in Components
```typescript
const handleSave = async () => {
  // TODO: Call API
  // const response = await journalService.createEntry(entryData);
  // Update local state
  // Navigate
}
```

---

## 🗂️ Screens Overview

### Authentication Flows
- `/(auth)/welcome` - Landing page
- `/(auth)/login` - Email login
- `/(auth)/signup` - User registration
- `/(auth)/interests` - Interest selection
- `/(auth)/profile-setup` - Profile completion

### Main App (Tabs)
- `/(tabs)/home` - Dashboard
- `/(tabs)/journal` - Entries list
- `/(tabs)/prompts` - Daily prompts
- `/(tabs)/focus` - Focus programs & timer
- `/(tabs)/mood` - Mood tracking
- `/(tabs)/profile` - Settings

### Detail Screens
- `/entry/[id]` - Entry view/edit
- `/prompt/[id]` - Prompt response
- `/program/[id]` - Program details
- `/timer/[sessionId]` - Active timer

---

## 🎯 Feature Checklist

### Complete ✅
- [x] Authentication screens
- [x] Home dashboard
- [x] Journal list
- [x] Prompts screen
- [x] Focus programs
- [x] Mood tracker
- [x] Profile settings
- [x] Global theme system
- [x] Common components

### In Progress 🔄
- [ ] Create entry screen
- [ ] Focus timer screen
- [ ] Redux state management
- [ ] API integration

### TODO 📋
- [ ] Image upload
- [ ] Audio recording
- [ ] Cloud sync
- [ ] Push notifications
- [ ] Payment integration
- [ ] Dark mode
- [ ] Multiple languages

---

## 🧪 Testing Screens

### Run the app
```bash
npm start
```

### Test navigation
1. Welcome → Signup → Interests → Profile → Home
2. Click tabs (Home, Journal, Prompts, Focus, Mood, Profile)
3. Navigate between screens

### Check responsive design
- Test on multiple device sizes
- Check safe area handling
- Verify touch targets

---

## 📝 Common Tasks

### Add a new constant
```typescript
// src/constants/config.ts
export const config = {
  newFeature: {
    setting: 'value'
  }
}
```

### Add a new type
```typescript
// src/types/index.ts
export interface NewType {
  id: string;
  // ...
}
```

### Add a new utility
```typescript
// src/utils/myUtil.ts
export const myFunction = () => {
  // ...
}
```

---

## 🐛 Debugging

### Enable logging
```typescript
import { logger } from '@/utils/logger';

logger.debug('Message', { data });
logger.error('Error message', error);
```

### React Native DevTools
- Press `d` in Expo CLI to open DevTools
- Use React Native Debugger for advanced debugging

### Console Logs
```typescript
console.log('Debug:', myVariable);
console.warn('Warning:', message);
console.error('Error:', error);
```

---

## 📚 Resources

### Documentation
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [Tailwind CSS (NativeWind)](https://www.nativewind.dev/)

### Project Files
- Theme system: `src/constants/theme.ts`
- Types: `src/types/index.ts`
- Config: `src/constants/config.ts`
- Full guide: `PROJECT_STRUCTURE.md`

---

## ❓ FAQ

**Q: How do I change the primary color?**
A: Update `theme.colors.primary.main` in `src/constants/theme.ts`

**Q: How do I add a new tab?**
A: Create screen in `src/app/(tabs)/newTab.tsx` and add to `_layout.tsx`

**Q: Where do I put API calls?**
A: Create service in `src/features/[feature]/[feature]Service.ts`

**Q: How do I handle form validation?**
A: Use `src/utils/validation.ts` for validation rules, store errors in state

**Q: How do I add dark mode?**
A: Create theme context or use Redux to toggle theme, switch colors based on mode

---

## 🚀 Next Steps

1. **Read** `PROJECT_STRUCTURE.md` for detailed architecture
2. **Explore** screens in `src/app/`
3. **Review** theme in `src/constants/theme.ts`
4. **Check** components in `src/components/`
5. **Start coding** your first feature!

---

**Happy coding! 🎉**
