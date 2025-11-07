/**
 * Onboarding Screen 2 - User Information
 *
 * Collects user's personal information
 * Features:
 * - Back button
 * - Pagination dots (3rd dot active)
 * - Birthday input with date picker
 * - Gender selection (Female, Male, Prefer not to say, Custom)
 * - Continue button
 *
 * Design: Clean form with peach tones
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';

type Gender = 'female' | 'male' | 'prefer-not-to-say' | 'custom' | null;

export default function Onboarding2Screen() {
  const router = useRouter();
  const [birthday, setBirthday] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate to next onboarding screen
    router.push('/(auth)/onboarding-3');
  };

  const genderOptions = [
    { id: 'female', label: 'Female', icon: '♀' },
    { id: 'male', label: 'Male', icon: '♂' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: '⊘' },
    { id: 'custom', label: 'Custom', icon: '•••' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-5 pt-8 pb-8">
          {/* Header with Back Button */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 -ml-2"
              activeOpacity={0.6}
            >
              <ChevronLeft size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center gap-2 mb-10">
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-peach" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
          </View>

          {/* Title */}
          <Text className="font-sans text-3xl font-bold text-gray-800 mb-3">
            A little about you
          </Text>

          {/* Subtitle */}
          <Text className="font-sans text-sm text-peach-dark mb-8">
            This helps us personalize your journaling experience.
          </Text>

          {/* Birthday Section */}
          <View className="mb-8">
            <Text className="font-sans text-base font-medium text-gray-800 mb-3">
              Your Birthday
            </Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4">
              <TextInput
                className="flex-1 font-sans text-base text-gray-800"
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#9CA3AF"
                value={birthday}
                onChangeText={setBirthday}
                keyboardType="numeric"
              />
              <Calendar size={20} color="#FFB89A" strokeWidth={2} />
            </View>
          </View>

          {/* Gender Section */}
          <View className="mb-8">
            <Text className="font-sans text-base font-medium text-gray-800 mb-3">
              Your Gender
            </Text>
            <View className="gap-3">
              {/* First Row - Female and Male */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'female'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('female')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">♀</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'male'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('male')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">♂</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Male
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Second Row - Prefer not to say and Custom */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'prefer-not-to-say'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('prefer-not-to-say')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">⊘</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Prefer not to say
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'custom'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('custom')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">•••</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[40px]" />

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-peach py-4 rounded-full"
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text className="font-sans text-base font-semibold text-gray-800 text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
