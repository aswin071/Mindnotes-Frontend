import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles, PenTool } from 'lucide-react-native';
import { colors } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyPromptCardProps {
  prompt: string;
  category?: string;
  onStartWriting: () => void;
}

export const DailyPromptCard: React.FC<DailyPromptCardProps> = ({
  prompt,
  category = 'DAILY PROMPT',
  onStartWriting,
}) => {
  return (
    <View className="mb-6">
      <LinearGradient
        colors={['#FEF3C7', '#FDE68A', '#FCD34D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        {/* Category Badge */}
        <View className="flex-row items-center mb-4">
          <Sparkles size={16} color={colors.primary.yellowDark} />
          <Text className="text-xs font-bold text-amber-700 ml-2 tracking-wider">
            {category}
          </Text>
        </View>

        {/* Prompt Text */}
        <Text className="text-gray-800 text-xl font-semibold mb-6 leading-7">
          {prompt}
        </Text>

        {/* Start Writing Button */}
        <TouchableOpacity
          onPress={onStartWriting}
          activeOpacity={0.9}
          className="bg-white rounded-full py-3 px-6 flex-row items-center justify-center"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <PenTool size={18} color={colors.primary.yellowDark} />
          <Text className="text-amber-700 font-semibold ml-2">Start Writing</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};