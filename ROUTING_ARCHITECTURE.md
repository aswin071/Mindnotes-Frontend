# MindNotes Routing Architecture

## Overview

The MindNotes app uses **Expo Router** with a file-based routing system, organized into two main navigation stacks: **Authentication** and **Main App**.

---

## Navigation Structure

```
src/app/
├── _layout.tsx                 # Root Layout (App entry point)
│
├── (auth)                      # Auth Stack Group
│   ├── _layout.tsx            # Auth navigation layout
│   ├── welcome.tsx            # Welcome screen (entry point)
│   ├── signup.tsx             # Sign up with email
│   ├── login.tsx              # Login with email
│   └── forgot-password.tsx    # Password recovery
│
├── (tabs)                      # Main App Stack Group (Bottom tabs)
│   ├── _layout.tsx            # Tab navigation layout
│   ├── home.tsx               # Dashboard/Home
│   ├── journal.tsx            # Journal entries list
│   ├── prompts.tsx            # Daily prompts
│   ├── focus.tsx              # Focus programs & timer
│   ├── mood.tsx               # Mood tracking
│   └── profile.tsx            # User profile & settings
│
├── entry/
│   └── [id].tsx               # Single entry detail view
│
└── prompt/
    └── [id].tsx               # Single prompt detail view
```

---

## Navigation Flow

### 1. **Root Layout** (`src/app/_layout.tsx`)

**Purpose:** Main entry point that decides which stack to show based on auth state

```typescript
// Conditional rendering based on isAuthenticated state
if (!isAuthenticated) {
  // Show Auth Stack
  <Stack.Screen name="(auth)" />
} else {
  // Show Main App with Tabs
  <Stack.Screen name="(tabs)" />
}
```

**Key Configuration:**
- `SafeAreaProvider` wraps entire app
- Handles `isAuthenticated` state
- No transitions between stacks for clean UX

---

### 2. **Auth Stack** (`src/app/(auth)/_layout.tsx`)

**Purpose:** Navigation between authentication screens

**Routes:**
- `(auth)/welcome` - Entry point (no back button)
- `(auth)/signup` - Email registration
- `(auth)/login` - Email login
- `(auth)/forgot-password` - Password recovery

**Configuration:**
- No header (custom UI)
- Prevents swipe-back after signup
- Smooth slide animations between screens

**Navigation Examples:**
```typescript
// From Welcome → Sign Up
router.push('/(auth)/signup');

// From Welcome → Login
router.push('/(auth)/login');

// From Login → Forgot Password
router.push('/(auth)/forgot-password');
```

---

### 3. **Main App (Tabs Stack)** (`src/app/(tabs)/_layout.tsx`)

**Purpose:** Bottom tab navigation for authenticated users

**Tabs (left to right):**
1. **Home** - Dashboard with overview
2. **Journal** - List and browse entries
3. **Prompts** - Daily/weekly prompts
4. **Focus** - Focus programs and timer
5. **Mood** - Mood tracking
6. **Profile** - User settings

**Tab Configuration:**
```typescript
<Tabs
  screenOptions={{
    tabBarActiveTintColor: theme.colors.primary.main,
    tabBarInactiveTintColor: theme.colors.neutral.gray[400],
  }}
>
  <Tabs.Screen name="home" ... />
  <Tabs.Screen name="journal" ... />
  // ... etc
</Tabs>
```

**Navigation Examples:**
```typescript
// Navigate between tabs
router.push('/(tabs)/home');
router.push('/(tabs)/journal');
router.push('/(tabs)/mood');
```

---

## Deep Linking Examples

### Authentication Flow

```typescript
// Start signup process
router.push('/(auth)/signup');

// Go to login from welcome
router.push('/(auth)/login');

// Navigate to password recovery
router.push('/(auth)/forgot-password');
```

### Main App Navigation

```typescript
// Switch to journal tab
router.push('/(tabs)/journal');

// View a specific entry
router.push('/entry/12345');

// View a specific prompt
router.push('/prompt/98765');

// Change profile
router.push('/(tabs)/profile');
```

---

## Screen Details

### Welcome Screen - `(auth)/welcome.tsx`

**Features:**
- Sunrise illustration (custom SVG-like component)
- Headline: "Your Journal Awaits"
- Three auth options:
  - Sign up with Email
  - Continue with Google
  - Continue with Apple
- Login link for existing users
- Feature snippet: "Syncs across your devices"

**Navigation:**
```typescript
onPress={() => router.push('/(auth)/signup')} // Email signup
onPress={() => router.push('/(auth)/login')}   // Go to login
```

---

### Sign Up Screen - `(auth)/signup.tsx`

**TODO: Awaiting design HTML**

**Expected Features:**
- Email input
- Password fields
- Terms & conditions
- Create account button
- Login link

---

### Login Screen - `(auth)/login.tsx`

**TODO: Awaiting design HTML**

**Expected Features:**
- Email input
- Password input
- Remember me checkbox
- Sign in button
- Forgot password link
- Social login options

---

### Home Screen - `(tabs)/home.tsx`

**Status:** ✅ COMPLETE

**Features:**
- Personalized greeting
- Streak badge (5-day)
- 7-day mini calendar with moods
- Full month calendar
- Weekly mood chart
- Today's reflection prompt
- Recent moments cards
- New entry floating button

---

### Other Screens

**Journal, Prompts, Focus, Mood, Profile** - Placeholder screens ready for design implementation

---

## Auth State Management

**Current Implementation:**
```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  // TODO: Check stored token or auth context
  // const token = await getStoredToken();
  // setIsAuthenticated(!!token);
}, []);
```

**TODO: Integrate with:**
- AsyncStorage (store auth token)
- Auth Context/Redux
- API authentication service

---

## Stack Configuration Details

### Root Stack (`_layout.tsx`)
```typescript
<Stack screenOptions={{ headerShown: false, animationEnabled: true }}>
```

### Auth Stack (`(auth)/_layout.tsx`)
```typescript
<Stack screenOptions={{ headerShown: false, animationEnabled: true }}>
  <Stack.Screen name="welcome" options={{ animationEnabled: false }} />
  <Stack.Screen name="signup" options={{ gestureEnabled: false }} />
  <Stack.Screen name="login" options={{ gestureEnabled: false }} />
  <Stack.Screen name="forgot-password" options={{ gestureEnabled: true }} />
</Stack>
```

### Tabs Stack (`(tabs)/_layout.tsx`)
```typescript
<Tabs screenOptions={{
  headerShown: false,
  tabBarActiveTintColor: theme.colors.primary.main,
  tabBarInactiveTintColor: theme.colors.neutral.gray[400],
  tabBarStyle: { height: 64, paddingBottom: 8 },
}}>
```

---

## Path Aliases

All routes use **path aliases** for clean imports:

```typescript
// Import from any location using @/
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';

// Route paths use standard Expo Router syntax
router.push('/(auth)/welcome');
router.push('/(tabs)/home');
```

**Configuration:** See [tsconfig.json](tsconfig.json) and [babel.config.js](babel.config.js)

---

## Best Practices

1. **Use `router.push()` for navigation:**
   ```typescript
   import { useRouter } from 'expo-router';
   const router = useRouter();
   router.push('/(tabs)/home');
   ```

2. **Group related routes:**
   - Auth routes in `(auth)`
   - Tab routes in `(tabs)`
   - Detail routes at root level

3. **Handle auth state at root:**
   - Check token on app launch
   - Conditionally render stacks
   - Don't allow navigation to protected routes

4. **Use dynamic routes for details:**
   ```typescript
   // File: entry/[id].tsx
   // Access params:
   import { useLocalSearchParams } from 'expo-router';
   const { id } = useLocalSearchParams();
   ```

5. **Keep layouts organized:**
   - Each `_layout.tsx` is a navigation boundary
   - Configure options at the layout level
   - Screens inherit parent configuration

---

## Testing Navigation

To test the routing:

1. **From Welcome Screen:**
   - Tap "Sign up with Email" → Goes to signup
   - Tap "Log in" → Goes to login
   - Social buttons → Log to console

2. **From Main App (when authenticated):**
   - Tap tabs to switch between screens
   - Back navigation works

3. **Back Behavior:**
   - Welcome: No back button (first screen)
   - Signup/Login: Back button available
   - Tabs: No back (they're parallel routes)

---

## Future Enhancements

1. **Animated Transitions:**
   - Custom push/pop animations
   - Shared element transitions

2. **Deep Linking:**
   - Handle deep links from notifications
   - Handle URL schemes (mindnotes://entry/123)

3. **Gesture Handling:**
   - Custom swipe gestures
   - Prevent back on certain screens

4. **State Persistence:**
   - Restore nav state after app close
   - Remember user position in tabs

---

## References

- [Expo Router Docs](https://docs.expo.dev/routing/introduction/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Theme Configuration](src/constants/theme.ts)
