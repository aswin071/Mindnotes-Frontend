import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Zap } from 'lucide-react-native';

interface StreakBadgeProps {
  streak: number;
  date: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, date }) => {
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  return (
    <View className="flex-row items-center justify-between px-4 sm:px-6 py-4">
      <View className="flex-1">
        <Text
          className={`font-bold text-gray-800 mb-1 ${
            isSmallDevice ? 'text-xl' : 'text-2xl'
          }`}
        >
          Good Morning, Olivia!
        </Text>
        <View className="flex-row items-center mt-1">
          <Zap size={14} color="#FCD34D" fill="#FCD34D" />
          <Text className="text-gray-600 text-sm font-medium ml-1.5">
            You're on a {streak}-day streak!
          </Text>
        </View>
      </View>
      <Text className="text-yellow-600 font-semibold text-xs sm:text-sm ml-2">
        {date}
      </Text>
    </View>
  );
};