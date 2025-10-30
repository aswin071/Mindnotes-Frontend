/**
 * Animated Bottom Navigation Component
 *
 * Reusable animated bottom tab bar shown across all app screens
 * Features:
 * - 5 navigation tabs: Home, Journal, Prompts, Focus, Profile
 * - Smooth animated rounded circle background on active tab
 * - Icons from Lucide React Native
 * - Global theme colors
 * - Professional styling with shadows
 * - Animated transitions
 *
 * Usage:
 * <BottomNav activeTab="home" />
 *
 * Props:
 * - activeTab: 'home' | 'journal' | 'mood' | 'focus' | 'profile'
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Home,
  BookOpen,
  Lightbulb,
  Clock,
  User,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

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
    label: 'Journal',
    icon: BookOpen,
    route: '/(tabs)/journal',
  },
  {
    id: 'mood',
    label: 'Prompts',
    icon: Lightbulb,
    route: '/(tabs)/prompts',
  },
  {
    id: 'focus',
    label: 'Focus',
    icon: Clock,
    route: '/(tabs)/focus',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    route: '/(tabs)/profile',
  },
];

export default function BottomNav({ activeTab }: BottomNavProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Find active tab index
  const activeTabIndex = TABS.findIndex((tab) => tab.id === activeTab);
  const tabWidth = width / TABS.length;

  useEffect(() => {
    // Animate circle on tab change
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 15,
        bounciness: 5,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

  const handleTabPress = (route: any) => {
    router.push(route);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.neutral.white },
      ]}
    >
      {/* Animated background circle */}
      <Animated.View
        style={[
          styles.animatedBackground,
          {
            left: activeTabIndex * tabWidth + tabWidth / 2 - 28,
            backgroundColor: `${theme.colors.primary.main}20`,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      />

      {/* Tab buttons container */}
      <View style={styles.navBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                { width: tabWidth },
              ]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <View
                  style={[
                    styles.iconWrapper,
                    isActive && {
                      backgroundColor: theme.colors.primary.main,
                    },
                  ]}
                >
                  <IconComponent
                    size={24}
                    color={
                      isActive
                        ? theme.colors.neutral.white
                        : theme.colors.neutral.gray[400]
                    }
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </View>
                {isActive && (
                  <Text
                    style={[
                      styles.label,
                      {
                        color: theme.colors.primary.main,
                        fontWeight: '700',
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  animatedBackground: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    top: -28,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    minHeight: 64,
    zIndex: 10,
    paddingBottom: 16,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    maxWidth: 50,
  },
});
