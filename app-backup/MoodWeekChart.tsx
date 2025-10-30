import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';

interface MoodData {
  day: string;
  emoji: string;
  color: string;
  height: number; // percentage
}

interface MoodWeekChartProps {
  moods: MoodData[];
}

export const MoodWeekChart: React.FC<MoodWeekChartProps> = ({ moods }) => {
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;
  const padding = isSmallDevice ? 16 : 24;
  const chartWidth = width - padding * 2;

  return (
    <View className="px-4 sm:px-6 py-5 sm:py-6 bg-white rounded-3xl mx-4 sm:mx-6 mb-6" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    }}>
      <Text className={`font-bold text-gray-800 mb-5 sm:mb-6 ${isSmallDevice ? 'text-base' : 'text-lg'}`}>
        Your Week in Moods
      </Text>

      {/* Mood pills */}
      <View className="flex-row items-end justify-around h-32 sm:h-36">
        {moods.map((mood, index) => {
          const heightPercent = mood.height;
          const pillSize = Math.max(40, heightPercent * 1.2); // Responsive pill size

          return (
            <View key={index} className="items-center flex-1 mx-0.5">
              {/* Oval pill shape */}
              <View
                className="rounded-full"
                style={{
                  width: isSmallDevice ? 24 : 32,
                  height: Math.max(isSmallDevice ? 40 : 50, heightPercent * 1.5),
                  backgroundColor: mood.color,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              />
              {/* Day label */}
              <Text className={`text-gray-500 font-medium mt-2 uppercase ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
                {mood.day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};