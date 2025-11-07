/**
 * Animated Bottom Navigation Component
 *
 * Reusable animated bottom tab bar shown across all app screens
 * Features:
 * - 5 navigation tabs: Home, Entries, Focus, Prompts, Settings
 * - Smooth spring animations with scale effects
 * - Haptic feedback on tab press
 * - Optimized navigation (prevents duplicate pushes)
 * - Icons from Lucide React Native
 * - Global Tailwind colors
 * - Professional styling with shadows
 *
 * Usage:
 * <BottomNav activeTab="home" />
 *
 * Props:
 * - activeTab: 'home' | 'journal' | 'focus' | 'prompts' | 'profile'
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  Home,
  BookOpen,
  Target,
  Lightbulb,
  Settings as SettingsIcon,
} from 'lucide-react-native';

interface BottomNavProps {
  activeTab:
    | 'home'
    | 'journal'
    | 'focus'
    | 'prompts'
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
    id: 'focus',
    label: 'Focus',
    icon: Target,
    route: '/(tabs)/focus',
  },
  {
    id: 'prompts',
    label: 'Prompts',
    icon: Lightbulb,
    route: '/(tabs)/prompts',
  },
  {
    id: 'profile',
    label: 'Settings',
    icon: SettingsIcon,
    route: '/(tabs)/profile',
  },
];

// Individual Tab Component with Animations
function AnimatedTab({
  tab,
  isActive,
  onPress
}: {
  tab: typeof TABS[0];
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.7)).current;
  const IconComponent = tab.icon;

  useEffect(() => {
    // Animate when tab becomes active/inactive
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0.9,
        useNativeDriver: true,
        friction: 7,
        tension: 40,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, scaleAnim, opacityAnim]);

  const handlePress = () => {
    // Haptic feedback for better UX
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Scale down animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0.9,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center py-2 px-1"
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Animated.View
        className="items-center gap-1"
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Animated.View
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
        </Animated.View>
        <Text
          className={`font-sans text-[10px] text-center max-w-[50px] ${
            isActive ? 'font-bold text-coral' : 'font-medium text-gray-400'
          }`}
        >
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (route: string, tabId: string) => {
    // Prevent navigation if already on the same tab
    const currentPath = pathname;
    if (currentPath === route || activeTab === tabId) {
      return;
    }

    // Use replace for smoother transitions within tabs
    router.push(route as any);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 rounded-t-3xl shadow-lg">
      {/* Tab buttons container */}
      <View className="flex-row justify-around items-center py-2 min-h-[64px] pb-4 pt-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <AnimatedTab
              key={tab.id}
              tab={tab}
              isActive={isActive}
              onPress={() => handleTabPress(tab.route, tab.id)}
            />
          );
        })}
      </View>
    </View>
  );
}
