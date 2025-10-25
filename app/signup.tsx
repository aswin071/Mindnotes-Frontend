import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

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
// Uncomment the secureTextEntry lines in the password TextInputs below
// ============================================

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true); // Always visible for screen sharing
  const [showConfirmPassword, setShowConfirmPassword] = useState(true); // Always visible for screen sharing
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to interests selection
      router.push('/interests');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-8">
        <Link href="/welcome" asChild>
          <TouchableOpacity className="p-2">
            <ArrowLeft color="#000" size={24} />
          </TouchableOpacity>
        </Link>
        <Text className="text-xl font-semibold text-black">Sign Up</Text>
        <View className="w-8" />
      </View>

      <View className="flex-1 px-5">
        {/* Welcome Text */}
        <Text className="text-2xl font-bold text-black mb-2">
          Create Account
        </Text>
        <Text className="text-gray-600 mb-8">
          Start your mindful journey today
        </Text>

        {/* Form */}
        <View className="space-y-6">
          <View>
            <Text className="text-black font-medium mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-4 text-black bg-gray-50"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-black font-medium mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-4 pr-12 text-black bg-gray-50"
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                // SECURITY WARNING: secureTextEntry completely removed for screen sharing
                // secureTextEntry={!showPassword}  // COMMENTED OUT FOR SCREEN SHARING
                autoCapitalize="none"
                textContentType="none"  // Disable password autofill
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="#9CA3AF" size={20} />
                ) : (
                  <Eye color="#9CA3AF" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-black font-medium mb-2">Confirm Password</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-4 pr-12 text-black bg-gray-50"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                // SECURITY WARNING: secureTextEntry completely removed for screen sharing
                // secureTextEntry={!showConfirmPassword}  // COMMENTED OUT FOR SCREEN SHARING
                autoCapitalize="none"
                textContentType="none"  // Disable password autofill
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff color="#9CA3AF" size={20} />
                ) : (
                  <Eye color="#9CA3AF" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`bg-yellow-400 py-4 rounded-xl mt-8 ${loading ? 'opacity-50' : ''}`}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text className="text-black text-lg font-semibold text-center">
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-yellow-600 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}