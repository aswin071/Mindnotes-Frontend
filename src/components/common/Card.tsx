/**
 * Card Component
 * Flexible container for content with shadow and styling
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadowLevel?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
  testID?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  shadowLevel = 'sm',
  onPress,
  testID,
}) => {
  const shadowConfig =
    shadowLevel === 'none' ? theme.shadows.none : theme.shadows[shadowLevel];

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    ...shadowConfig,
    ...style,
  };

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  // Additional styles if needed
});
