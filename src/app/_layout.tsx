/**
 * Root Layout (_layout.tsx)
 *
 * Main application entry point that handles:
 * 1. Authentication state management
 * 2. Routing between Auth Stack and Main App Stack
 * 3. Global SafeArea configuration
 *
 * Navigation Flow:
 * - Unauthenticated users → (auth) stack → Welcome → SignUp/Login
 * - Authenticated users → (tabs) stack → Home, Journal, Prompts, Focus, Mood, Profile
 *
 * TODO: Implement auth state from context/Redux once backend is connected
 */

import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import '../../global.css';

export default function RootLayout() {
  // TODO: Replace with actual auth state from context
  // This will come from your auth service/context
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: Check if user is already logged in
    // Example:
    // const checkAuthStatus = async () => {
    //   const token = await getStoredToken();
    //   setIsAuthenticated(!!token);
    // };
    // checkAuthStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack - shown when user is NOT authenticated
          // User can sign up or log in
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              animationEnabled: false,
              gestureEnabled: false,
            }}
          />
        ) : (
          // Main App Stack - shown when user IS authenticated
          // User can access all features
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animationEnabled: false,
              gestureEnabled: false,
            }}
          />
        )}
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}
