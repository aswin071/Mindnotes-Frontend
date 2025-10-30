# Path Alias Configuration Fix

## Problem
The app was throwing import errors:
```
Unable to resolve "@/components/common" from "src/app/(auth)/interests.tsx"
```

## Solution Applied

### 1. Updated `tsconfig.json`
Added `baseUrl` configuration to properly resolve path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. Updated `babel.config.js`
Added `babel-plugin-module-resolver` to handle path aliases during bundling:

```javascript
{
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
  ]
}
```

### 3. Installed Dependency
Installed the required Babel plugin:
```bash
npm install --save-dev babel-plugin-module-resolver
```

## Path Alias Reference

All imports using `@/` will now correctly resolve to `src/`:

```typescript
// Instead of:
import { Button } from '../../../components/common';

// Use:
import { Button } from '@/components/common';
```

## File Structure with Aliases

```
src/
├── app/                 ← @/app
├── components/          ← @/components
├── constants/           ← @/constants
├── types/              ← @/types
├── services/           ← @/services
├── hooks/              ← @/hooks
├── features/           ← @/features
└── utils/              ← @/utils
```

## How to Run

```bash
# Clear cache and restart
npm install
npx expo start --clear

# Then select platform (i for iOS, a for Android)
```

## Status

✅ Path aliases are now configured correctly
✅ All imports using `@/` will resolve properly
✅ Ready to start the app and test

---

**Fixed**: October 2024
**Version**: 1.0.0
