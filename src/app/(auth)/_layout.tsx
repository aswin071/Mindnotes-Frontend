/**
 * Auth Stack Layout (_layout.tsx)
 * Handles navigation between authentication screens:
 * - Welcome/Login (entry point)
 * - Sign Up
 * - Login
 * - Password Recovery
 *
 * Stack Configuration:
 * - No header (custom UI)
 * - Slide from right animation
 * - Prevents back navigation to login after signup
 */

import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {/* Welcome Screen - Entry point for unauthenticated users */}
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome',
          animationEnabled: false, // No animation on first screen
        }}
      />

      {/* Sign Up Screen */}
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          gestureEnabled: false, // Prevent swipe back
        }}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          gestureEnabled: false, // Prevent swipe back
        }}
      />

      {/* Password Recovery Screen */}
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Forgot Password',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
