/**
 * Onboarding Screen 1 - Landing Page 2
 *
 * Second onboarding screen after welcome
 * Features:
 * - Pagination dots (2nd dot active)
 * - Large colored background section
 * - Heading message
 * - Descriptive subtitle
 * - "Next" CTA button
 * - Skip option
 *
 * Design: Clean, minimal with mint/coral tones
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding1Screen() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to next onboarding screen
    router.push('/(auth)/onboarding-2');
  };

  const handleSkip = () => {
    // Skip onboarding and go to signup
    router.push('/(auth)/signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-5 pt-4 pb-6">
        {/* Pagination Dots */}
        <View className="flex-row justify-center items-center gap-2.5 py-4 mb-6">
          <View className="w-2.5 h-2.5 rounded-full bg-peach-light" />
          <View className="w-2.5 h-2.5 rounded-full bg-peach" />
          <View className="w-2.5 h-2.5 rounded-full bg-peach-light" />
          <View className="w-2.5 h-2.5 rounded-full bg-peach-light" />
          <View className="w-2.5 h-2.5 rounded-full bg-peach-light" />
        </View>

        {/* Main Content Area - Better Mobile Alignment */}
        <View className="flex-1 justify-between">
          <View className="flex-1 justify-center items-center px-3">
            {/* Large Colored Background Section */}
            <View className="w-full max-w-[300px] aspect-square bg-mint-light rounded-3xl mb-8" />

            {/* Heading */}
            <Text className="font-sans text-2xl font-bold text-gray-800 text-center mb-3 px-4">
              Track Your Journey
            </Text>

            {/* Subtitle */}
            <Text className="font-sans text-sm text-gray-600 text-center leading-5 px-5 max-w-[320px]">
              Document your daily thoughts, moods, and moments. Watch your growth unfold over time.
            </Text>
          </View>

          {/* Bottom Actions */}
          <View className="px-1">
            {/* Next Button */}
            <TouchableOpacity
              className="bg-peach py-4 rounded-full mb-3.5 shadow-md"
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text className="font-sans text-base font-bold text-gray-800 text-center">
                Next
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleSkip}
              activeOpacity={0.6}
              className="py-2"
            >
              <Text className="font-sans text-sm font-medium text-gray-500 text-center">
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
