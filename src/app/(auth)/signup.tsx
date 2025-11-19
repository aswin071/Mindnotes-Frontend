/**
 * Sign Up / Create Account Screen
 *
 * User registration with email and password
 * Features:
 * - Email input field
 * - Password input field with visibility toggle
 * - Confirm Password input field with visibility toggle
 * - Create Account button
 * - Login link for existing users
 * - Terms & Privacy Policy links
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
import { useSignup } from '@/contexts/SignupContext';

export default function SignUpScreen() {
  const router = useRouter();
  const { signupData, clearSignupData } = useSignup();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCreateAccount = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Check if we have required onboarding data
    if (!signupData.dob || !signupData.gender) {
      Alert.alert(
        'Missing Information',
        'Please complete the onboarding steps first',
        [
          {
            text: 'Go Back',
            onPress: () => router.push('/(auth)/onboarding-2'),
          },
        ]
      );
      return;
    }

    setIsLoading(true);

    try {
      const user = await authService.register({
        email: email.trim().toLowerCase(),
        password: password,
        full_name: fullName.trim(),
        dob: signupData.dob,
        gender: signupData.gender,
        profession: signupData.profession || 'Not specified',
      });

      console.log('Signup successful:', user);

      // Clear signup context
      clearSignupData();

      // Navigate to home on successful signup
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.error('Signup error:', error);

      const apiError = error?.apiError;
      let errorMessage =
        apiError?.message ||
        error?.message ||
        'An error occurred during signup. Please try again.';

      // Handle validation errors
      if (apiError?.errors) {
        const errorMessages = Object.values(apiError.errors)
          .flat()
          .join('\n');
        errorMessage = errorMessages || errorMessage;
      }

      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
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
          Create Account
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Full Name Field */}
        <View className="mb-6">
          <Text className="font-sans text-sm font-medium text-gray-800 mb-3">
            Full Name
          </Text>
          <View className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
            <TextInput
              className="font-sans text-base text-gray-800"
              placeholder="John Doe"
              placeholderTextColor="#D1D5DB"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>
        </View>

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
        <View className="mb-6">
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

        {/* Confirm Password Field */}
        <View className="mb-10">
          <Text className="font-sans text-sm font-medium text-gray-800 mb-3">
            Confirm Password
          </Text>
          <View className="flex-row items-center bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
            <TextInput
              className="flex-1 font-sans text-base text-gray-800"
              placeholder="Confirm your password"
              placeholderTextColor="#D1D5DB"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-3 p-1"
              activeOpacity={0.6}
            >
              {showConfirmPassword ? (
                <EyeOff size={22} color="#FFB89A" strokeWidth={2} />
              ) : (
                <Eye size={22} color="#9CA3AF" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          className="bg-peach py-4 rounded-full mb-8 shadow-md"
          onPress={handleCreateAccount}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#1F2937" />
          ) : (
            <Text className="font-sans text-base font-bold text-gray-800 text-center">
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="font-sans text-sm text-gray-500">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="font-sans text-sm font-bold text-gray-800">
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms & Privacy */}
        <Text className="font-sans text-xs text-gray-400 text-center px-4">
          By creating an account, you agree to our{' '}
          <Text className="underline">Terms of Service</Text>
          {' & '}
          <Text className="underline">Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
