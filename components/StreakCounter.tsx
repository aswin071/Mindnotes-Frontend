import React from 'react';
import { View, Text } from 'react-native';
import { Flame } from 'lucide-react-native';

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak = 0 }) => {
  return (
    <View className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
      <View className="flex-row items-center justify-center">
        <Flame color="#EAB308" size={24} />
        <Text className="text-2xl font-bold text-black ml-2">{streak}</Text>
        <Text className="text-lg text-gray-600 ml-1">day streak</Text>
      </View>
      <Text className="text-center text-sm text-gray-500 mt-1">
        Keep it going! You're building a great habit.
      </Text>
    </View>
  );
};