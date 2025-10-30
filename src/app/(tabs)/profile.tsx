/**
 * Profile Screen
 *
 * User profile, preferences, and account settings
 * Features:
 * - User profile information
 * - Account settings
 * - App preferences and notification settings
 * - Logout and account management
 *
 * TODO: Implement full design based on provided HTML
 */

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.neutral.beige,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.neutral.black }}>
          Profile Screen
        </Text>
        <Text style={{ fontSize: 14, color: theme.colors.neutral.gray[500], marginTop: 8 }}>
          Coming soon - Awaiting design HTML
        </Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />
    </SafeAreaView>
  );
}
