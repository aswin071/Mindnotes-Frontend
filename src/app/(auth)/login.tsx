/**
 * Login / Sign In Screen
 *
 * User authentication with email and password
 * Features:
 * - Email input field
 * - Password input field with visibility toggle
 * - Forgot Password link
 * - Log In button (primary yellow)
 * - Continue with Google button
 * - Continue with Apple button
 * - Sign Up link for new users
 * - Back navigation button
 *
 * Design: Clean, professional, responsive
 * Colors: From global theme
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
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

  const handleLogIn = () => {
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
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      console.log('Log In:', { email, password });
      // TODO: Call login API
      // For now, navigate to home after successful login
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 500);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Log In');
    // TODO: Implement Google OAuth
    // For now, navigate to home after successful Google auth
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 500);
  };

  const handleAppleLogin = () => {
    console.log('Apple Log In');
    // TODO: Implement Apple OAuth
    // For now, navigate to home after successful Apple auth
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 500);
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
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
          Log In
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

          {/* Forgot Password Link */}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={[
                  styles.forgotPasswordText,
                  { color: theme.colors.neutral.black },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Log In Button */}
          <TouchableOpacity
            style={[
              styles.logInButton,
              { backgroundColor: theme.colors.primary.main },
            ]}
            onPress={handleLogIn}
            activeOpacity={0.85}
          >
            <Text style={[styles.logInButtonText, { color: theme.colors.neutral.black }]}>
              Log In
            </Text>
          </TouchableOpacity>

          {/* Continue with Google Button */}
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: theme.colors.neutral.white },
            ]}
            onPress={handleGoogleLogin}
            activeOpacity={0.85}
          >
            <GoogleIcon size={24} />
            <Text style={[styles.socialButtonText, { color: theme.colors.neutral.black }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Continue with Apple Button */}
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: theme.colors.neutral.white },
            ]}
            onPress={handleAppleLogin}
            activeOpacity={0.85}
          >
            <AppleIcon size={24} />
            <Text style={[styles.socialButtonText, { color: theme.colors.neutral.black }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpLinkContainer}>
          <Text style={[styles.signUpLinkText, { color: theme.colors.neutral.gray[500] }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text
              style={[
                styles.signUpLink,
                { color: theme.colors.neutral.black },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Google Icon Component
 * Simple circle placeholder for Google icon
 */
function GoogleIcon({ size }: { size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#000',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFF' }}>G</Text>
    </View>
  );
}

/**
 * Apple Icon Component
 * Simple apple icon placeholder
 */
function AppleIcon({ size }: { size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 18 }}>🍎</Text>
    </View>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  logInButton: {
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logInButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  socialButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E9E2CE',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  signUpLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  signUpLinkText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
});
