import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, ScrollView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

// ============================================
// SCREEN SHARING FIX - IMPORTANT!
// ============================================
// WARNING: secureTextEntry has been COMPLETELY REMOVED from password fields
// to allow screen sharing in Google Meet, Zoom, etc.
//
// This means:
// - ✅ Screen sharing/recording will work
// - ❌ Passwords are ALWAYS visible as plain text
// - ❌ No security protection for password fields
//
// TO RE-ENABLE SECURITY FOR PRODUCTION:
// Uncomment the secureTextEntry line in the password TextInput below (line ~131)
// ============================================

// Google Icon Component
const GoogleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
    <Path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
    <Path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
    <Path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
  </Svg>
);

// Apple Icon Component
const AppleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M16.19 17.5c-.63 1.2-1.32 2.35-2.36 2.36-1.02.01-1.32-.59-2.53-.59-1.21 0-1.55.58-2.6.6-1.08.02-1.8-1.24-2.43-2.43-1.29-2.44-2.27-6.9-.95-9.91.66-1.5 1.84-2.45 3.12-2.47 1-.02 1.93.66 2.53.66.6 0 1.74-.81 2.93-.69.5.02 1.9.2 2.8 1.51-.07.04-1.67 1-1.65 2.98.02 2.36 2.06 3.15 2.08 3.16-.02.06-.32 1.12-1.07 2.22-.66.96-1.34 1.92-2.41 1.94l-.46-.04zM13.14 3.36c.54-.66.91-1.57.81-2.48-.78.03-1.74.53-2.3 1.19-.5.59-.94 1.53-.82 2.43.87.06 1.76-.44 2.3-1.14z" fill="#000000"/>
  </Svg>
);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true); // Always visible for screen sharing
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    // Validate inputs
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, accept any email/password
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google authentication coming soon');
  };

  const handleAppleLogin = () => {
    Alert.alert('Apple Login', 'Apple authentication coming soon');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Icon */}
        <View className="items-center mb-6">
          <View className="w-28 h-28 rounded-full bg-yellow-200 items-center justify-center">
            <View className="w-14 h-14 rounded-full bg-yellow-500 items-center justify-center">
              <Text className="text-white text-3xl font-bold">!</Text>
            </View>
          </View>
        </View>

        {/* Welcome Text */}
        <Text className="text-3xl font-bold text-black text-center mb-2">
          Welcome to MindNotes
        </Text>
        <Text className="text-gray-500 text-center mb-6 text-sm px-4">
          Your personal space to reflect and grow.
        </Text>

        {/* Form */}
        <View className="mb-4">
          <Text className="text-black font-medium mb-2 text-sm">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-full px-5 py-3.5 text-black bg-gray-50 text-base"
            placeholder="yourname@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-5">
          <Text className="text-black font-medium mb-2 text-sm">Password</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-full px-5 py-3.5 pr-14 text-black bg-gray-50 text-base"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              // SECURITY WARNING: secureTextEntry completely removed for screen sharing
              // secureTextEntry={ENABLE_SCREEN_SHARING ? false : !showPassword}  // COMMENTED OUT FOR SCREEN SHARING
              autoCapitalize="none"
              textContentType="none"  // Disable password autofill
            />
            <TouchableOpacity
              className="absolute right-5 top-3.5"
              onPress={() => setShowPassword(!showPassword)}
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              accessibilityRole="button"
            >
              {showPassword ? (
                <EyeOff color="#9CA3AF" size={20} />
              ) : (
                <Eye color="#9CA3AF" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`bg-yellow-500 py-3.5 rounded-full mb-5 ${loading ? 'opacity-50' : ''}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-base font-semibold text-center">
            {loading ? 'Please wait...' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-3 text-gray-500 font-medium text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          className="border border-gray-300 py-3.5 rounded-full mb-3 flex-row items-center justify-center bg-white"
          onPress={handleGoogleLogin}
        >
          <View className="mr-2.5">
            <GoogleIcon />
          </View>
          <Text className="text-black text-sm font-medium">Continue with Google</Text>
        </TouchableOpacity>

        {/* Apple Login Button */}
        <TouchableOpacity
          className="border border-gray-300 py-3.5 rounded-full mb-5 flex-row items-center justify-center bg-white"
          onPress={handleAppleLogin}
        >
          <View className="mr-2.5">
            <AppleIcon />
          </View>
          <Text className="text-black text-sm font-medium">Continue with Apple</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View className="flex-row justify-center mb-4 flex-wrap">
          <Text className="text-gray-600 text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-yellow-600 font-semibold text-sm">Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy */}
        <View className="px-2">
          <Text className="text-gray-500 text-center text-xs leading-5">
            By continuing, you agree to our{' '}
            <Text className="text-yellow-600 underline">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-yellow-600 underline">Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}