/**
 * Sign Up / Create Account Screen
 *
 * User registration with email and password
 * Features:
 * - Email input field
 * - Password input field with visibility toggle
 * - Create Account button
 * - Login link for existing users
 * - Terms & Privacy Policy links
 * - Back navigation button
 *
 * Design: Clean, professional, responsive
 * Colors: From global theme
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleBack = () => {
    router.back();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleCreateAccount = () => {
    const newErrors = { email: '', password: '' };

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    // If no errors, proceed with signup
    if (!newErrors.email && !newErrors.password) {
      console.log('Sign Up:', { email, password });
      // TODO: Call signup API
      // For now, navigate to home after successful signup
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 500);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.neutral.beige },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.6}
        >
          <ChevronLeft
            size={24}
            color={theme.colors.neutral.black}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.neutral.black }]}>
          Create Account
        </Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Email Field */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.colors.neutral.black }]}>
              Email
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor: errors.email
                    ? theme.colors.status.error
                    : theme.colors.neutral.gray[200],
                  backgroundColor: theme.colors.neutral.white,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: theme.colors.neutral.black },
                ]}
                placeholder="yourname@example.com"
                placeholderTextColor={theme.colors.neutral.gray[400]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={true}
              />
            </View>
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.colors.status.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.colors.neutral.black }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor: errors.password
                    ? theme.colors.status.error
                    : theme.colors.neutral.gray[200],
                  backgroundColor: theme.colors.neutral.white,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: theme.colors.neutral.black, flex: 1 },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.neutral.gray[400]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={true}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.visibilityButton}
                activeOpacity={0.6}
              >
                {showPassword ? (
                  <Eye
                    size={20}
                    color={theme.colors.neutral.gray[400]}
                    strokeWidth={1.5}
                  />
                ) : (
                  <EyeOff
                    size={20}
                    color={theme.colors.neutral.gray[400]}
                    strokeWidth={1.5}
                  />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.errorText, { color: theme.colors.status.error }]}>
                {errors.password}
              </Text>
            )}
          </View>
        </View>

        {/* Create Account Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: theme.colors.primary.main },
            ]}
            onPress={handleCreateAccount}
            activeOpacity={0.85}
          >
            <Text style={[styles.buttonText, { color: theme.colors.neutral.black }]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={[styles.loginLinkText, { color: theme.colors.neutral.gray[500] }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={[
                styles.loginLink,
                { color: theme.colors.neutral.black },
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms & Privacy */}
        <Text style={[styles.termsText, { color: theme.colors.neutral.gray[400] }]}>
          By creating an account, you agree to our{' '}
          <Text style={{ textDecorationLine: 'underline' }}>
            Terms of Service
          </Text>
          {' & '}
          <Text style={{ textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>
          .
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  formContainer: {
    gap: 24,
    marginBottom: 32,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  visibilityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
  },
  buttonContainer: {
    marginBottom: 24,
    gap: 16,
  },
  createButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
