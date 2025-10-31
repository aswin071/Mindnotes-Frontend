/**
 * Profile Screen
 *
 * User identification and profile management page
 * Features:
 * - User avatar, name, and member since date
 * - Statistics cards: journal entries, longest streak, favorite mood
 * - Settings & Preferences menu with navigation items
 * - Edit Profile functionality
 * - Playful, attractive design with smooth animations
 * - Full mobile responsiveness
 *
 * Design: Playful, engaging, self-identification focused
 * Colors: From global theme with mood accents
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Bell,
  Clock,
  Lock,
  HelpCircle,
  Edit3,
  Settings,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  memberSince: string;
  journalEntries: number;
  longestStreak: number;
  favoriteMood: string;
  favoriteMoodEmoji: string;
  favoriteMoodColor: string;
}

interface SettingsItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  route: string;
}

// Mock user data - in production, this would come from an API/database
const MOCK_USER: UserProfile = {
  id: '1',
  name: 'Sarah Anderson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  memberSince: 'January 2024',
  journalEntries: 124,
  longestStreak: 42,
  favoriteMood: 'Happy',
  favoriteMoodEmoji: '😊',
  favoriteMoodColor: theme.colors.mood.happy,
};

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: '1',
    icon: <Bell size={24} color={theme.colors.neutral.black} strokeWidth={2} />,
    label: 'Notifications',
    description: 'Manage notification settings',
    route: '/(tabs)/settings/notifications',
  },
  {
    id: '2',
    icon: <Clock size={24} color={theme.colors.neutral.black} strokeWidth={2} />,
    label: 'Daily Reminders',
    description: 'Set daily journal reminders',
    route: '/(tabs)/settings/reminders',
  },
  {
    id: '3',
    icon: <Lock size={24} color={theme.colors.neutral.black} strokeWidth={2} />,
    label: 'Account & Security',
    description: 'Manage account and security',
    route: '/(tabs)/settings/security',
  },
  {
    id: '4',
    icon: <HelpCircle size={24} color={theme.colors.neutral.black} strokeWidth={2} />,
    label: 'Help & Support',
    description: 'Get help and support',
    route: '/(tabs)/settings/help',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [user] = useState<UserProfile>(MOCK_USER);
  const avatarScaleAnim = new Animated.Value(1);

  const handleEditProfile = () => {
    console.log('Edit profile');
    // TODO: Navigate to edit profile screen
  };

  const handleSettingsPress = (route: string) => {
    console.log('Navigate to settings:', route);
    // TODO: Implement navigation to settings screens
    // router.push(route);
  };

  const handleAvatarPress = () => {
    Animated.sequence([
      Animated.spring(avatarScaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 15,
        bounciness: 5,
      }),
      Animated.spring(avatarScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 15,
        bounciness: 5,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.neutral.beige }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.primary.main }]}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.6}
          >
            <Settings size={24} color={theme.colors.neutral.black} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.neutral.black }]}>
            My Profile
          </Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Profile Card Section */}
        <View style={[styles.profileCard, { backgroundColor: `${theme.colors.primary.main}12` }]}>
          {/* Avatar */}
          <TouchableOpacity
            onPress={handleAvatarPress}
            activeOpacity={0.7}
            style={{ alignItems: 'center', marginBottom: theme.spacing[4] }}
          >
            <Animated.View
              style={[
                styles.avatarContainer,
                { transform: [{ scale: avatarScaleAnim }] },
              ]}
            >
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* User Info */}
          <Text style={[styles.userName, { color: theme.colors.neutral.black }]}>
            {user.name}
          </Text>
          <Text style={[styles.memberSince, { color: theme.colors.neutral.gray[500] }]}>
            Member since {user.memberSince}
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: theme.colors.primary.main },
            ]}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Edit3 size={18} color={theme.colors.neutral.black} strokeWidth={2.5} />
            <Text style={[styles.editButtonText, { color: theme.colors.neutral.black }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral.black }]}>
            Your Stats
          </Text>
          <View style={styles.statsGrid}>
            {/* Journal Entries Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: `${theme.colors.primary.main}15`,
                  borderColor: `${theme.colors.primary.main}40`,
                },
              ]}
            >
              <Text style={[styles.statValue, { color: theme.colors.primary.main }]}>
                {user.journalEntries}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.neutral.gray[600] }]}>
                Journal
              </Text>
              <Text style={[styles.statSubLabel, { color: theme.colors.neutral.gray[400] }]}>
                Entries
              </Text>
            </View>

            {/* Longest Streak Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: `${theme.colors.mood.excited}15`,
                  borderColor: `${theme.colors.mood.excited}40`,
                },
              ]}
            >
              <Text style={[styles.statValue, { color: theme.colors.mood.excited }]}>
                {user.longestStreak}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.neutral.gray[600] }]}>
                Longest
              </Text>
              <Text style={[styles.statSubLabel, { color: theme.colors.neutral.gray[400] }]}>
                Streak
              </Text>
            </View>

            {/* Favorite Mood Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: `${user.favoriteMoodColor}20`,
                  borderColor: `${user.favoriteMoodColor}50`,
                },
              ]}
            >
              <Text style={styles.statEmoji}>{user.favoriteMoodEmoji}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.neutral.gray[600] }]}>
                Favorite
              </Text>
              <Text style={[styles.statSubLabel, { color: theme.colors.neutral.gray[400] }]}>
                Mood
              </Text>
            </View>
          </View>
        </View>

        {/* Settings & Preferences Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral.black }]}>
            Settings & Preferences
          </Text>
          <View style={[styles.settingsList, { backgroundColor: `${theme.colors.primary.main}10` }]}>
            {SETTINGS_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingsItem,
                  {
                    borderBottomColor: `${theme.colors.primary.main}20`,
                    borderBottomWidth: index < SETTINGS_ITEMS.length - 1 ? 1 : 0,
                  },
                ]}
                onPress={() => handleSettingsPress(item.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.settingsIconContainer, { backgroundColor: `${theme.colors.primary.main}30` }]}>
                  {item.icon}
                </View>
                <View style={styles.settingsContent}>
                  <Text style={[styles.settingsLabel, { color: theme.colors.neutral.black }]}>
                    {item.label}
                  </Text>
                  <Text
                    style={[styles.settingsDescription, { color: theme.colors.neutral.gray[400] }]}
                  >
                    {item.description}
                  </Text>
                </View>
                <ChevronRight
                  size={20}
                  color={theme.colors.neutral.gray[300]}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: theme.spacing[6] }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: `${theme.colors.primary.main}20`,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 44,
  },
  profileCard: {
    marginHorizontal: theme.spacing[4],
    marginTop: theme.spacing[5],
    marginBottom: theme.spacing[5],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[6],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}25`,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    marginBottom: theme.spacing[1],
    textAlign: 'center',
  },
  memberSince: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    marginBottom: theme.spacing[4],
    textAlign: 'center',
  },
  editButton: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  editButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },
  statsSection: {
    marginHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[5],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    marginBottom: theme.spacing[3],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing[3],
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[4],
    alignItems: 'center',
    borderWidth: 2,
  },
  statValue: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '800',
    marginBottom: theme.spacing[1],
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: 16,
  },
  statSubLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '400',
    lineHeight: 14,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: theme.spacing[1],
  },
  settingsSection: {
    marginHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[5],
  },
  settingsList: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}30`,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[4],
    gap: theme.spacing[3],
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsContent: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    marginBottom: theme.spacing[1],
  },
  settingsDescription: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '400',
    lineHeight: 14,
  },
});
