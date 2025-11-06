/**
 * Welcome / Sanctuary Screen
 *
 * Entry point for new users
 * Features:
 * - "Sanctuary" branding at top
 * - Centered illustration of a peaceful woman with botanical elements
 * - "Your Personal Sanctuary" headline
 * - Descriptive subtitle
 * - "Begin Your Journey" CTA button
 *
 * Design: Warm, peaceful, with peach/beige tones
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
    // Navigate to signup or next onboarding screen
    router.push('/(auth)/signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sanctuary Logo/Branding */}
        <View className="flex-row items-center gap-2 mb-10 self-start">
          <BookOpen size={20} color="#1F2937" strokeWidth={2} />
          <Text className="text-base font-semibold text-gray-800 tracking-wide">Sanctuary</Text>
        </View>

        {/* Illustration Section */}
        <View style={{ width: width - 48, maxWidth: 400, aspectRatio: 1 }} className="mb-8">
          <SanctuaryIllustration />
        </View>

        {/* Headline */}
        <Text className="text-[32px] font-bold text-gray-800 text-center leading-10 mb-4">
          Your Personal{'\n'}Sanctuary
        </Text>

        {/* Subtitle */}
        <Text className="text-[15px] font-normal text-gray-600 text-center leading-[22px] mb-10 px-2.5">
          A private space for daily reflection, growth, and{'\n'}self-discovery. Begin your journey with us.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          className="bg-peach-light py-4 px-12 rounded-xl min-w-[280px] items-center shadow-md"
          onPress={handleBeginJourney}
          activeOpacity={0.85}
        >
          <Text className="text-base font-semibold text-gray-800 tracking-wide">Begin Your Journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Sanctuary Illustration Component
 * Peaceful woman with closed eyes surrounded by botanical leaves
 * Colors: Peach background (#E8B4A0), warm skin tones, green leaves
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
