/**
 * Focus Screen
 *
 * Displays focus programs and timer functionality
 * Features:
 * - Focus program library
 * - Timer interface
 * - Session history
 * - Program details and stats
 *
 * TODO: Implement full design based on provided HTML
 */

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

export default function FocusScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.neutral.beige,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.neutral.black }}>
          Focus Screen
        </Text>
        <Text style={{ fontSize: 14, color: theme.colors.neutral.gray[500], marginTop: 8 }}>
          Coming soon - Awaiting design HTML
        </Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="focus" />
    </SafeAreaView>
  );
}
