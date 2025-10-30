/**
 * Tabs Layout (_layout.tsx)
 *
 * Main application navigation using bottom tab bar
 * Each tab represents a major feature in the app
 *
 * Tabs:
 * 1. Home - Dashboard with overview and quick actions
 * 2. Journal - List and view journal entries
 * 3. Prompts - Daily/weekly reflection prompts
 * 4. Focus - Focus programs and timer
 * 5. Mood - Mood tracking and history
 * 6. Profile - User profile and settings
 *
 * Configuration:
 * - Bottom tab navigation (iOS + Android style)
 * - Icons from Lucide React Native
 * - Warm color theme matching global design
 * - Active/inactive tab styling
 */

import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import {
  Home,
  BookOpen,
  Lightbulb,
  Clock,
  Smile,
  User,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function TabsLayout() {
  const tabBarOptions = (label: string, icon: React.ReactNode) => ({
    title: label,
    headerShown: false,
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '600',
      marginTop: -4,
    },
    tabBarIcon: ({ focused }: { focused: boolean }) =>
      React.cloneElement(icon as React.ReactElement, {
        size: 24,
        color: focused
          ? theme.colors.primary.main
          : theme.colors.neutral.gray[400],
        strokeWidth: focused ? 2.5 : 2,
      }),
  } as BottomTabNavigationOptions);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide Expo Router's default tab bar - using custom BottomNav instead
        },
      }}
    >
      {/* Home Tab - Dashboard */}
      <Tabs.Screen
        name="home"
        options={tabBarOptions('Home', <Home size={24} />)}
      />

      {/* Journal Tab - Entry list and management */}
      <Tabs.Screen
        name="journal"
        options={tabBarOptions('Journal', <BookOpen size={24} />)}
      />

      {/* Prompts Tab - Daily/weekly prompts */}
      <Tabs.Screen
        name="prompts"
        options={tabBarOptions('Prompts', <Lightbulb size={24} />)}
      />

      {/* Focus Tab - Focus timer and programs */}
      <Tabs.Screen
        name="focus"
        options={tabBarOptions('Focus', <Clock size={24} />)}
      />

      {/* Mood Tab - Mood tracking */}
      <Tabs.Screen
        name="mood"
        options={tabBarOptions('Mood', <Smile size={24} />)}
      />

      {/* Profile Tab - User profile and settings */}
      <Tabs.Screen
        name="profile"
        options={tabBarOptions('Profile', <User size={24} />)}
      />
    </Tabs>
  );
}
