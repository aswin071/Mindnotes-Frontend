/**
 * Auth Stack Layout (_layout.tsx)
 * Handles navigation between authentication screens with smooth transitions
 * - Welcome (entry point)
 * - Onboarding screens (1, 2, 3)
 * - Sign Up
 * - Login
 * - Password Recovery
 *
 * Stack Configuration:
 * - No header (custom UI)
 * - Smooth fade and slide animations
 * - Gesture-enabled navigation for better UX
 * - Platform-specific optimizations
 */

import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { SignupProvider } from '@/contexts/SignupContext';

export default function AuthLayout() {
  return (
    <SignupProvider>
      <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        animation: 'fade_from_bottom',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // Smooth transitions
        animationDuration: 300,
        // iOS-style presentation
        presentation: 'card',
      }}
    >
      {/* Welcome Screen - Entry point for unauthenticated users */}
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome',
          animation: 'fade',
          gestureEnabled: false, // No back gesture on welcome
        }}
      />

      {/* Onboarding Screen 1 - Track Your Journey */}
      <Stack.Screen
        name="onboarding-1"
        options={{
          title: 'Onboarding 1',
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />

      {/* Onboarding Screen 2 - User Information */}
      <Stack.Screen
        name="onboarding-2"
        options={{
          title: 'Onboarding 2',
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />

      {/* Onboarding Screen 3 - Occupation Selection */}
      <Stack.Screen
        name="onboarding-3"
        options={{
          title: 'Onboarding 3',
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />

      {/* Sign Up Screen */}
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />

      {/* Password Recovery Screen */}
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Forgot Password',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          presentation: 'modal',
        }}
      />
    </Stack>
    </SignupProvider>
  );
}
