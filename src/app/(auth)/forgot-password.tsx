/**
 * Forgot Password Screen
 *
 * Password recovery flow
 * Features:
 * - Email input for recovery
 * - Send reset link button
 * - Back to login link
 * - Success message after sending
 *
 * TODO: Implement full design based on provided HTML
 */

import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { theme } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.neutral.beige,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.neutral.black }}>
          Forgot Password Screen
        </Text>
        <Text style={{ fontSize: 14, color: theme.colors.neutral.gray[500], marginTop: 8 }}>
          Coming soon - Awaiting design HTML
        </Text>
      </View>
    </SafeAreaView>
  );
}
