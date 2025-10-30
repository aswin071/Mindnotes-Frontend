import * as React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '../constants/theme';

interface PlayfulButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const PlayfulButton: React.FC<PlayfulButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className = '',
}) => {
  const getButtonStyle = () => {
    let baseStyle = 'rounded-full flex-row items-center justify-center ';

    // Size styles
    switch (size) {
      case 'small':
        baseStyle += 'px-4 py-2 ';
        break;
      case 'large':
        baseStyle += 'px-8 py-4 ';
        break;
      default:
        baseStyle += 'px-6 py-3 ';
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle += 'bg-yellow-400 ';
        if (disabled || loading) baseStyle += 'opacity-50 ';
        break;
      case 'secondary':
        baseStyle += 'bg-yellow-100 ';
        if (disabled || loading) baseStyle += 'opacity-50 ';
        break;
      case 'outline':
        baseStyle += 'border-2 border-yellow-400 bg-transparent ';
        if (disabled || loading) baseStyle += 'opacity-50 ';
        break;
      case 'ghost':
        baseStyle += 'bg-transparent ';
        if (disabled || loading) baseStyle += 'opacity-50 ';
        break;
    }

    if (fullWidth) {
      baseStyle += 'w-full ';
    }

    return baseStyle + className;
  };

  const getTextStyle = () => {
    let textStyle = 'font-semibold ';

    // Size styles
    switch (size) {
      case 'small':
        textStyle += 'text-sm ';
        break;
      case 'large':
        textStyle += 'text-lg ';
        break;
      default:
        textStyle += 'text-base ';
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        textStyle += 'text-white ';
        break;
      case 'secondary':
        textStyle += 'text-gray-800 ';
        break;
      case 'outline':
        textStyle += 'text-yellow-500 ';
        break;
      case 'ghost':
        textStyle += 'text-gray-700 ';
        break;
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      className={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary.yellow}
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};