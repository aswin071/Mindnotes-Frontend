/**
 * Tabs Layout (_layout.tsx)
 *
 * Manages navigation between main app tabs with optimized animations
 * Features:
 * - Fast, smooth transitions (no slow zoom)
 * - Instant tab switching for better UX
 * - Optimized animations using native driver
 *
 * Tabs:
 * - Home
 * - Journal (Entries)
 * - Mood
 * - Focus (Settings)
 * - Profile
 */

import React from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Fast, instant transitions - no slow zoom
        animation: 'none',
        animationEnabled: false,
        // Alternatively, use fade for subtle effect:
        // animation: 'fade',
        // animationDuration: 150,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />

      <Stack.Screen
        name="journal"
        options={{
          title: 'Journal',
        }}
      />

      <Stack.Screen
        name="mood"
        options={{
          title: 'Mood',
        }}
      />

      <Stack.Screen
        name="focus"
        options={{
          title: 'Focus',
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />

      <Stack.Screen
        name="prompts"
        options={{
          title: 'Prompts',
        }}
      />

      <Stack.Screen
        name="prompts-history"
        options={{
          title: 'Prompts History',
        }}
      />

      <Stack.Screen
        name="create-entry"
        options={{
          title: 'Create Entry',
          // Use slide animation for create entry (modal-like)
          animation: 'slide_from_bottom',
          animationEnabled: true,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
