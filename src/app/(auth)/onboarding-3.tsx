/**
 * Onboarding Screen 3 - Occupation Selection
 *
 * Asks user about their occupation/role
 * Features:
 * - Back button
 * - Pagination dots (4th dot active)
 * - Title and subtitle
 * - Multiple occupation options in grid
 * - Continue button with arrow
 * - Skip for now option
 *
 * Design: Clean selection grid with peach tones
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ArrowRight } from 'lucide-react-native';

type Occupation = 'student' | 'creative' | 'healthcare' | 'tech' | 'education' | 'entrepreneur' | 'homemaker' | 'other' | null;

export default function Onboarding3Screen() {
  const router = useRouter();
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation>(null);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate to next onboarding screen or signup
    router.push('/(auth)/signup');
  };

  const handleSkip = () => {
    // Skip and go to signup
    router.push('/(auth)/signup');
  };

  const occupations = [
    { id: 'student', label: 'Student' },
    { id: 'creative', label: 'Creative' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'tech', label: 'Tech' },
    { id: 'education', label: 'Education' },
    { id: 'entrepreneur', label: 'Entrepreneur' },
    { id: 'homemaker', label: 'Homemaker' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pt-6 pb-8">
          {/* Header with Back Button */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 -ml-2"
              activeOpacity={0.6}
            >
              <ChevronLeft size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center gap-2 mb-8">
            <View className="w-2 h-2 rounded-full bg-peach-light" />
            <View className="w-2 h-2 rounded-full bg-peach-light" />
            <View className="w-2 h-2 rounded-full bg-peach-light" />
            <View className="w-2 h-2 rounded-full bg-peach" />
            <View className="w-2 h-2 rounded-full bg-peach-light" />
          </View>

          {/* Title */}
          <Text className="font-sans text-2xl font-bold text-gray-800 text-center mb-2">
            What do you do?
          </Text>

          {/* Subtitle */}
          <Text className="font-sans text-sm text-gray-600 text-center mb-8 px-4">
            This helps us personalize your journaling prompts.
          </Text>

          {/* Occupation Grid */}
          <View className="flex-1 mb-6">
            <View className="flex-row flex-wrap gap-3">
              {occupations.map((occupation) => (
                <TouchableOpacity
                  key={occupation.id}
                  className={`flex-1 min-w-[45%] max-w-[48%] py-4 px-4 rounded-2xl border-2 ${
                    selectedOccupation === occupation.id
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedOccupation(occupation.id as Occupation)}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    {occupation.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Actions */}
          <View>
            {/* Continue Button */}
            <TouchableOpacity
              className="bg-peach py-4 rounded-full mb-3 flex-row items-center justify-center"
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text className="font-sans text-base font-semibold text-gray-800 mr-2">
                Continue
              </Text>
              <ArrowRight size={20} color="#1F2937" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleSkip}
              activeOpacity={0.6}
              className="py-2"
            >
              <Text className="font-sans text-sm font-medium text-gray-500 text-center">
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
