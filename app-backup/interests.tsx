import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';

const interests = [
  { id: 'gym', label: 'Gym & Fitness', emoji: '💪' },
  { id: 'travel', label: 'Travel & Tourism', emoji: '✈️' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
  { id: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
  { id: 'nature', label: 'Nature & Outdoors', emoji: '🌲' },
  { id: 'art', label: 'Art & Creativity', emoji: '🎨' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'wellness', label: 'Health & Wellness', emoji: '🌱' },
  { id: 'learning', label: 'Learning & Growth', emoji: '🎓' },
  { id: 'relationships', label: 'Relationships', emoji: '❤️' },
];

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleContinue = () => {
    // Save interests and navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-8">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-black">Interests</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Welcome Text */}
        <Text className="text-2xl font-bold text-black mb-2">
          What interests you?
        </Text>
        <Text className="text-gray-600 mb-8">
          Select topics you'd like to explore in your journal prompts
        </Text>

        {/* Interests Grid */}
        <View className="flex-row flex-wrap justify-between">
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              className={`w-[48%] mb-4 p-4 rounded-xl border-2 ${
                selectedInterests.includes(interest.id)
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 bg-white'
              }`}
              onPress={() => toggleInterest(interest.id)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-2xl mb-1">{interest.emoji}</Text>
                  <Text className="text-black font-medium text-sm">
                    {interest.label}
                  </Text>
                </View>
                {selectedInterests.includes(interest.id) && (
                  <View className="bg-yellow-400 rounded-full p-1">
                    <Check color="#000" size={16} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`bg-yellow-400 py-4 rounded-xl mt-8 mb-8 ${
            selectedInterests.length === 0 ? 'opacity-50' : ''
          }`}
          onPress={handleContinue}
          disabled={selectedInterests.length === 0}
        >
          <Text className="text-black text-lg font-semibold text-center">
            Continue ({selectedInterests.length} selected)
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity className="mb-8" onPress={handleContinue}>
          <Text className="text-gray-500 text-center underline">
            Skip for now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}