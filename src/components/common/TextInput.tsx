/**
 * TextInput Component
 * Professional text input with validation states and accessibility
 */

import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { theme } from '@/constants/theme';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  testID?: string;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      error,
      disabled = false,
      multiline = false,
      numberOfLines = 1,
      icon,
      containerStyle,
      testID,
      ...rest
    },
    ref
  ) => {
    const isError = !!error;

    const inputContainerStyle: ViewStyle = {
      marginBottom: label ? theme.spacing[4] : theme.spacing[3],
      ...containerStyle,
    };

    const inputStyle = {
      borderWidth: 1,
      borderColor: isError
        ? theme.colors.status.error
        : theme.colors.neutral.gray[200],
      borderRadius: theme.borderRadius.base,
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[3],
      paddingLeft: icon ? theme.spacing[10] : theme.spacing[3],
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.neutral.black,
      fontFamily: theme.typography.fontFamily.primary,
      ...theme.shadows.sm,
      backgroundColor: disabled
        ? theme.colors.neutral.gray[50]
        : theme.colors.neutral.white,
      minHeight: multiline ? theme.spacing[20] : theme.spacing[10],
    };

    return (
      <View style={inputContainerStyle}>
        {label && (
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.neutral.black,
              marginBottom: theme.spacing[2],
            }}
          >
            {label}
          </Text>
        )}

        <View style={{ position: 'relative' }}>
          <RNTextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.neutral.gray[400]}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={inputStyle}
            testID={testID}
            {...rest}
          />
          {icon && (
            <View
              style={{
                position: 'absolute',
                left: theme.spacing[3],
                top: '50%',
                transform: [{ translateY: -theme.spacing[2.5] }],
              }}
            >
              {icon}
            </View>
          )}
        </View>

        {error && (
          <Text
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.status.error,
              marginTop: theme.spacing[1],
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;

const styles = StyleSheet.create({
  // Styles can be added here if needed for complex layouts
});
