/**
 * Profile Screen
 *
 * User profile and settings page
 * Features:
 * - User profile information with avatar
 * - Statistics (journal entries, longest streak)
 * - Favorite mood display
 * - Settings and preferences
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Clock,
  Shield,
  HelpCircle,
  ChevronRight,
  Edit,
} from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <ChevronRight size={24} color="#1F2937" className="rotate-180" />
          </TouchableOpacity>
          <Text className="font-sans text-lg font-semibold text-gray-900">
            My Profile
          </Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            {/* Settings icon placeholder */}
          </TouchableOpacity>
        </View>

        {/* Profile Info Card */}
        <View className="items-center px-6 pb-6">
          {/* Avatar */}
          <View className="w-32 h-32 rounded-full bg-peach-light items-center justify-center mb-4 shadow-sm">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
              className="w-32 h-32 rounded-full"
              resizeMode="cover"
            />
          </View>

          {/* Name */}
          <Text className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Amelia Watson
          </Text>

          {/* Member Since */}
          <Text className="font-sans text-sm text-gray-500 mb-4">
            Member since Jan 2023
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity className="bg-peach px-8 py-3 rounded-full flex-row items-center gap-2 shadow-sm">
            <Edit size={18} color="#6B4E3D" />
            <Text className="font-sans text-base font-semibold text-brown">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View className="flex-row px-6 gap-4 mb-6">
          {/* Journal Entries */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <Text className="font-sans text-xs text-gray-500 mb-1">
              Journal Entries
            </Text>
            <Text className="font-sans text-3xl font-bold text-gray-900">
              124
            </Text>
          </View>

          {/* Longest Streak */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <Text className="font-sans text-xs text-gray-500 mb-1">
              Longest Streak
            </Text>
            <Text className="font-sans text-3xl font-bold text-gray-900">
              42 Days
            </Text>
          </View>
        </View>

        {/* Favorite Mood */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="font-sans text-xs text-gray-500 mb-2">
              Favorite Mood
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-3xl">=
</Text>
              <Text className="font-sans text-xl font-bold text-gray-900">
                Happy
              </Text>
            </View>
          </View>
        </View>

        {/* Settings & Preferences */}
        <View className="px-6 pb-24">
          <Text className="font-sans text-lg font-bold text-gray-900 mb-4">
            Settings & Preferences
          </Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Notifications */}
            <SettingsItem
              icon={Bell}
              label="Notifications"
              onPress={() => {}}
            />

            {/* Divider */}
            <View className="h-px bg-gray-100 ml-16" />

            {/* Daily Reminders */}
            <SettingsItem
              icon={Clock}
              label="Daily Reminders"
              onPress={() => {}}
            />

            {/* Divider */}
            <View className="h-px bg-gray-100 ml-16" />

            {/* Account & Security */}
            <SettingsItem
              icon={Shield}
              label="Account & Security"
              onPress={() => {}}
            />

            {/* Divider */}
            <View className="h-px bg-gray-100 ml-16" />

            {/* Help & Support */}
            <SettingsItem
              icon={HelpCircle}
              label="Help & Support"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </SafeAreaView>
  );
}

// Settings Item Component
interface SettingsItemProps {
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

function SettingsItem({ icon: Icon, label, onPress, isLast }: SettingsItemProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon Container */}
      <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-4">
        <Icon size={20} color="#6B7280" strokeWidth={2} />
      </View>

      {/* Label */}
      <Text className="flex-1 font-sans text-base font-medium text-gray-900">
        {label}
      </Text>

      {/* Chevron */}
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}
