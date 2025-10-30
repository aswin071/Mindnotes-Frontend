/**
 * PlayfulButton Component
 * Primary action button with multiple variants and sizes
 * Professional, accessible, and reusable across the app
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      onPress,
      title,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      loading = false,
      icon,
      style,
      testID,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Size Configuration
    const sizeConfig = {
      small: {
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[3],
        fontSize: theme.typography.fontSize.sm,
      },
      medium: {
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[4],
        fontSize: theme.typography.fontSize.base,
      },
      large: {
        paddingVertical: theme.spacing[4],
        paddingHorizontal: theme.spacing[6],
        fontSize: theme.typography.fontSize.lg,
      },
    };

    // Variant Configuration
    const variantConfig = {
      primary: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
        color: theme.colors.neutral.black,
      },
      secondary: {
        backgroundColor: theme.colors.primary.light,
        borderColor: theme.colors.primary.light,
        color: theme.colors.neutral.black,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.primary.main,
        color: theme.colors.primary.main,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: theme.colors.neutral.black,
      },
      danger: {
        backgroundColor: theme.colors.status.error,
        borderColor: theme.colors.status.error,
        color: theme.colors.neutral.white,
      },
    };

    const config = variantConfig[variant];
    const size_config = sizeConfig[size];

    // Disabled state
    const disabledStyle = isDisabled ? { opacity: 0.6 } : {};

    const buttonStyle: ViewStyle = {
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
      borderWidth: variant === 'outline' ? 2 : 0,
      borderRadius: theme.borderRadius.md,
      paddingVertical: size_config.paddingVertical,
      paddingHorizontal: size_config.paddingHorizontal,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
      ...(fullWidth && { width: '100%' }),
      ...disabledStyle,
    };

    const textStyle: TextStyle = {
      color: config.color,
      fontSize: size_config.fontSize,
      fontWeight: theme.typography.fontWeight.semibold,
      marginLeft: icon ? theme.spacing[2] : 0,
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={isDisabled}
        style={[buttonStyle, style]}
        activeOpacity={0.7}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator color={config.color} size="small" />
        ) : (
          <>
            {icon && <View>{icon}</View>}
            <Text style={textStyle}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

export default Button;

const styles = StyleSheet.create({
  // These styles would be used if needed for complex animations
  // For now, we use inline styles for better control
});
