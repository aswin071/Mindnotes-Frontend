# MindNotes - Complete Setup Guide

## ✅ Prerequisites

Ensure you have:
- Node.js 16 or higher
- npm or yarn
- Git
- Xcode (for iOS, Mac only)
- Android Studio (for Android development)
- Expo CLI (installed globally or via npx)

## 📦 Installation Steps

### Step 1: Install Dependencies
```bash
cd /home/aswin/Mindnotes-Frontend
npm install
```

### Step 2: Clear Cache (First Time Only)
```bash
npm install
rm -rf node_modules/.cache
```

### Step 3: Start the Development Server
```bash
npx expo start --clear
```

## 🚀 Running the App

### iOS (Mac only)
1. Press `i` in the terminal
2. Wait for the iOS Simulator to open
3. The app will load automatically

### Android
1. Press `a` in the terminal
2. Wait for the Android Emulator to open (or connect physical device)
3. The app will load automatically

### Web (Experimental)
1. Press `w` in the terminal
2. Opens in default web browser

### Expo Go (Physical Device)
1. Download "Expo Go" app from App Store / Play Store
2. In terminal, press `e` to send link via email
3. Scan QR code with your phone
4. App opens in Expo Go

## 🔧 Troubleshooting

### Problem: "Unable to resolve @/..."
**Solution**: Already fixed! The following changes were made:
- Updated `tsconfig.json` with proper path configuration
- Added `babel-plugin-module-resolver` to `babel.config.js`
- Installed required dependencies

If still having issues:
```bash
rm -rf node_modules/.cache
npx expo start --clear
```

### Problem: "Port 8081 is already in use"
**Solution**: Expo will ask to use port 8082 instead, or kill the process:
```bash
pkill -f "expo start"
npx expo start
```

### Problem: "Module not found"
**Solution**: Clear Expo cache:
```bash
rm -rf .expo
npx expo start --clear
```

## 📁 Project Structure

All imports use the `@/` alias pointing to `src/`:

```
src/
├── app/                          # Routes (Expo Router)
│   ├── (auth)/                  # Auth screens
│   ├── (tabs)/                  # Main app screens
│   └── entry/, prompt/, etc.    # Detail screens
├── components/                   # Reusable UI components
├── constants/                    # theme.ts, config.ts
├── types/                        # TypeScript interfaces
├── services/                     # External services (API, storage)
├── hooks/                        # Custom React hooks
├── features/                     # Feature-specific logic
└── utils/                        # Helper functions
```

## 📝 Import Examples

### Before (Relative imports - Complex)
```typescript
import { Button } from '../../../components/common/Button';
import { theme } from '../../../constants/theme';
import { User } from '../../../types';
```

### After (Alias imports - Clean)
```typescript
import { Button } from '@/components/common';
import { theme } from '@/constants/theme';
import { User } from '@/types';
```

## 🎨 Working with the App

### Home Screen
- Shows greeting, streak, calendar, moods, recent entries
- Located at: `src/app/(tabs)/home.tsx`

### Other Screens
- Journal: `src/app/(tabs)/journal.tsx`
- Prompts: `src/app/(tabs)/prompts.tsx`
- Focus: `src/app/(tabs)/focus.tsx`
- Mood: `src/app/(tabs)/mood.tsx`
- Profile: `src/app/(tabs)/profile.tsx`

### Adding New Components
1. Create file in `src/components/[folder]/ComponentName.tsx`
2. Export from `src/components/[folder]/index.ts`
3. Import with: `import { ComponentName } from '@/components/[folder]';`

### Using Global Theme
```typescript
import { theme } from '@/constants/theme';

// Colors
theme.colors.primary.main      // #FCD34D
theme.colors.mood.happy        // Mood colors
theme.colors.status.error      // Status colors

// Spacing
theme.spacing[4]               // 16px

// Typography
theme.typography.fontSize.base // 16px
theme.typography.fontWeight.bold // '700'

// Shadows
theme.shadows.sm / md / lg

// Border radius
theme.borderRadius.lg          // 20px
```

## 📚 Documentation

- **QUICK_START.md** - 5-minute quick reference
- **PROJECT_STRUCTURE.md** - Complete architecture guide
- **FIX_IMPORT_PATHS.md** - Import path configuration details

## 🔐 Environment Variables

Currently none required for MVP. Will add later for:
- API endpoints
- Firebase config
- Payment service keys

Create `.env` file when needed (already in `.gitignore`)

## 🧪 Testing the Build

### Check for Errors
```bash
# TypeScript check
npx tsc --noEmit

# Lint check
npx expo lint
```

### Test on Device
1. Build development version
```bash
eas build --platform ios --profile preview
```

2. Install on simulator/device and test

## 📱 Device Requirements

- **iOS**: iOS 13+
- **Android**: Android 6.0+
- **Web**: Modern browser (Chrome, Safari, Firefox)

## 🚀 Ready to Start?

```bash
# 1. Install
npm install

# 2. Start dev server
npx expo start --clear

# 3. Open in simulator/device
# Press: i (iOS), a (Android), w (Web), or e (Expo Go)
```

## 💡 Pro Tips

1. **Hot Reload**: Changes auto-reload on save
2. **Fast Refresh**: Press `r` to reload app manually
3. **Console**: Check terminal for error messages
4. **Debugging**: Press `j` to open debugger
5. **Layout**: Use React Native DevTools (press `d`)

## 📞 Support

If you encounter issues:
1. Check terminal error messages
2. Clear cache: `rm -rf .expo node_modules/.cache`
3. Restart: `npx expo start --clear`
4. Review `.tsx` file for import statements

---

**Setup Version**: 1.0.0
**Last Updated**: October 2024
**Status**: ✅ Ready for Development
