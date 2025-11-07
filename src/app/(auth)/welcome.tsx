/**
 * Welcome / Sanctuary Screen
 *
 * Entry point for new users
 * Features:
 * - "Sanctuary" branding at top
 * - Centered illustration with botanical elements
 * - "Your Personal Sanctuary" headline
 * - Descriptive subtitle
 * - "Begin Your Journey" CTA button
 *
 * Design: Warm, peaceful, with peach/botanical tones
 * Updated with global Tailwind colors and fonts
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleBeginJourney = () => {
    // Navigate to next onboarding screen
    router.push('/(auth)/onboarding-1');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sanctuary Logo/Branding */}
        <View className="flex-row items-center gap-2 mb-12 self-start">
          <BookOpen size={22} color="#1F2937" strokeWidth={2} />
          <Text className="font-sans text-base font-bold text-gray-800">Sanctuary</Text>
        </View>

        {/* Illustration Section */}
        <View style={{ width: width - 56, maxWidth: 380, aspectRatio: 1 }} className="mb-10">
          <SanctuaryIllustration />
        </View>

        {/* Headline */}
        <Text className="font-sans text-3xl font-bold text-gray-800 text-center mb-4 px-4">
          Your Personal{'\n'}Sanctuary
        </Text>

        {/* Subtitle */}
        <Text className="font-sans text-sm text-gray-600 text-center leading-6 mb-12 px-4 max-w-[340px]">
          A private space for daily reflection, growth, and self-discovery. Begin your journey with us.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          className="bg-peach py-4 px-16 rounded-full min-w-[280px] items-center shadow-md"
          onPress={handleBeginJourney}
          activeOpacity={0.85}
        >
          <Text className="font-sans text-base font-bold text-gray-800">Begin Your Journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Sanctuary Illustration Component
 * Peaceful illustration with botanical leaves
 * Colors: Peach background, green leaves (from global Tailwind config)
 */
function SanctuaryIllustration() {
  return (
    <View className="flex-1 justify-center items-center relative">
      {/* Peach Background Circle */}
      <View className="absolute bg-peach-light rounded-full" style={{ width: '85%', height: '85%' }} />

      {/* Left Leaf Branch */}
      <View className="absolute" style={{ left: '8%', top: '25%', width: 80, height: 120 }}>
        <View className="absolute bg-leaf rounded-[25px]" style={{ width: 35, height: 50, top: 0, left: 10, transform: [{ rotate: '-25deg' }] }} />
        <View className="absolute bg-leaf-light rounded-[20px]" style={{ width: 30, height: 45, top: 30, left: 0, transform: [{ rotate: '-45deg' }] }} />
        <View className="absolute bg-leaf rounded-[22px]" style={{ width: 32, height: 48, top: 55, left: 15, transform: [{ rotate: '-15deg' }] }} />
        <View className="absolute w-2 h-2 rounded-full bg-peach" style={{ top: 15, left: 45 }} />
        <View className="absolute w-2 h-2 rounded-full bg-peach" style={{ top: 45, left: 50 }} />
      </View>

      {/* Right Leaf Branch */}
      <View className="absolute" style={{ right: '8%', top: '25%', width: 80, height: 120 }}>
        <View className="absolute bg-leaf rounded-[25px]" style={{ width: 35, height: 50, top: 0, right: 10, transform: [{ rotate: '25deg' }] }} />
        <View className="absolute bg-leaf-light rounded-[20px]" style={{ width: 30, height: 45, top: 30, right: 0, transform: [{ rotate: '45deg' }] }} />
        <View className="absolute bg-leaf rounded-[22px]" style={{ width: 32, height: 48, top: 55, right: 15, transform: [{ rotate: '15deg' }] }} />
        <View className="absolute w-2 h-2 rounded-full bg-peach" style={{ top: 15, right: 45 }} />
        <View className="absolute w-2 h-2 rounded-full bg-peach" style={{ top: 45, right: 50 }} />
      </View>
    </View>
  );
}
