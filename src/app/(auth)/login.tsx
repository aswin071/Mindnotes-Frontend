/**
 * Login / Sign In Screen
 *
 * User authentication with email and password
 * Features:
 * - Email input field
 * - Password input field with visibility toggle
 * - Forgot Password link
 * - Log In button
 * - Continue with Google button
 * - Continue with Apple button
 * - Sign Up link for new users
 * - Back navigation button
 *
 * Design: Clean, professional with Tailwind CSS
 * Colors: Global Tailwind colors (peach, coral, etc.)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { authService } from '@/services';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogIn = async () => {
    // Validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const user = await authService.login({
        email: email.trim().toLowerCase(),
        password: password,
      });

      console.log('Login successful:', user);

      // Navigate to home on successful login
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.error('Login error:', error);

      const apiError = error?.apiError;
      const errorMessage =
        apiError?.message ||
        error?.message ||
        'An error occurred during login. Please try again.';

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Log In');
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 500);
  };

  const handleAppleLogin = () => {
    console.log('Apple Log In');
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
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-center px-4 py-3 relative">
        <TouchableOpacity
          onPress={handleBack}
          className="absolute left-4 p-2"
          activeOpacity={0.6}
        >
          <ChevronLeft size={24} color="#1F2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="font-sans text-lg font-bold text-gray-800">
          Log In
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Email Field */}
        <View className="mb-6">
          <Text className="font-sans text-sm font-medium text-gray-800 mb-3">
            Email
          </Text>
          <View className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
            <TextInput
              className="font-sans text-base text-gray-800"
              placeholder="yourname@example.com"
              placeholderTextColor="#D1D5DB"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Field */}
        <View className="mb-4">
          <Text className="font-sans text-sm font-medium text-gray-800 mb-3">
            Password
          </Text>
          <View className="flex-row items-center bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
            <TextInput
              className="flex-1 font-sans text-base text-gray-800"
              placeholder="Enter your password"
              placeholderTextColor="#D1D5DB"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="ml-3 p-1"
              activeOpacity={0.6}
            >
              {showPassword ? (
                <EyeOff size={22} color="#FFB89A" strokeWidth={2} />
              ) : (
                <Eye size={22} color="#9CA3AF" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password Link */}
        <View className="items-end mb-8">
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="font-sans text-sm font-medium text-gray-800">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Log In Button */}
        <TouchableOpacity
          className="bg-peach py-4 rounded-full mb-5 shadow-md"
          onPress={handleLogIn}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1F2937" />
          ) : (
            <Text className="font-sans text-base font-bold text-gray-800 text-center">
              Log In
            </Text>
          )}
        </TouchableOpacity>

        {/* Continue with Google Button */}
        <TouchableOpacity
          className="bg-white py-4 rounded-full mb-3 flex-row items-center justify-center shadow-sm border border-gray-100"
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
        >
          <View className="w-5 h-5 bg-gray-800 rounded-full mr-3 items-center justify-center">
            <Text className="text-white text-xs font-bold">G</Text>
          </View>
          <Text className="font-sans text-sm font-semibold text-gray-800">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Continue with Apple Button */}
        <TouchableOpacity
          className="bg-white py-4 rounded-full mb-8 flex-row items-center justify-center shadow-sm border border-gray-100"
          onPress={handleAppleLogin}
          activeOpacity={0.8}
        >
          <View className="w-5 h-5 mr-3 items-center justify-center">
            <Text className="text-base">🍏</Text>
          </View>
          <Text className="font-sans text-sm font-semibold text-gray-800">
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center pt-4">
          <Text className="font-sans text-sm text-gray-500">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="font-sans text-sm font-bold text-gray-800">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
