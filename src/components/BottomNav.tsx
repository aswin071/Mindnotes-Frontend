/**
 * Animated Bottom Navigation Component
 *
 * Reusable animated bottom tab bar shown across all app screens
 * Features:
 * - 5 navigation tabs: Home, Journal, Prompts, Focus, Profile
 * - Smooth animated rounded circle background on active tab
 * - Icons from Lucide React Native
 * - Global Tailwind colors
 * - Professional styling with shadows
 * - Animated transitions
 *
 * Usage:
 * <BottomNav activeTab="home" />
 *
 * Props:
 * - activeTab: 'home' | 'journal' | 'mood' | 'focus' | 'profile'
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Home,
  BookOpen,
  Smile,
  Settings as SettingsIcon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface BottomNavProps {
  activeTab:
    | 'home'
    | 'journal'
    | 'mood'
    | 'focus'
    | 'profile';
}

const TABS = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    route: '/(tabs)/home',
  },
  {
    id: 'journal',
    label: 'Entries',
    icon: BookOpen,
    route: '/(tabs)/journal',
  },
  {
    id: 'mood',
    label: 'Moods',
    icon: Smile,
    route: '/(tabs)/mood',
  },
  {
    id: 'focus',
    label: 'Settings',
    icon: SettingsIcon,
    route: '/(tabs)/focus',
  },
];

export default function BottomNav({ activeTab }: BottomNavProps) {
  const router = useRouter();
  const tabWidth = width / TABS.length;

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 rounded-t-3xl">
      {/* Tab buttons container */}
      <View className="flex-row justify-around items-center py-2 min-h-[64px] pb-4 pt-2 relative">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.id}
              className="flex-1 justify-center items-center py-2 px-1 z-10"
              style={{ width: tabWidth }}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <View className="items-center gap-1">
                <View
                  className="w-11 h-11 rounded-full justify-center items-center"
                  style={{
                    backgroundColor: isActive ? '#FF6B5A' : 'transparent',
                  }}
                >
                  <IconComponent
                    size={22}
                    color={isActive ? '#FFFFFF' : '#9CA3AF'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </View>
                <Text
                  className={`font-sans text-[10px] text-center max-w-[50px] ${
                    isActive ? 'font-bold text-coral' : 'font-medium text-gray-400'
                  }`}
                >
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
