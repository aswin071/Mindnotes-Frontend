import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../constants/theme';

interface DailyBannerProps {
  onPress: () => void;
}

export const DailyBanner: React.FC<DailyBannerProps> = ({ onPress }) => {
  const { width } = Dimensions.get('window');
  const bannerWidth = width - 48; // 24 padding on each side

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      className="mx-6 mb-6 rounded-3xl overflow-hidden bg-yellow-400"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="p-6 min-h-40">
        {/* Content */}
        <View className="flex-1 z-10">
          <Text className="text-gray-800 font-bold text-xl mb-2">
            Let's start your day
          </Text>
          <Text className="text-gray-700 text-sm font-medium mb-4">
            Begin with a mindful morning reflection.
          </Text>
          <TouchableOpacity
            className="bg-white rounded-full px-4 py-2 self-start"
            onPress={onPress}
          >
            <Text className="text-yellow-500 font-bold text-sm">Start</Text>
          </TouchableOpacity>
        </View>

        {/* Decorative Illustration (ASCII/Text based) */}
        <View className="absolute right-4 top-4 opacity-20">
          <Text className="text-4xl">☀️</Text>
        </View>
        <View className="absolute right-2 bottom-2 opacity-15">
          <Text className="text-3xl">🌲</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};