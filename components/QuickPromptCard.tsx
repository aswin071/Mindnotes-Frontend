import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';

interface QuickPromptCardProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
  onPress: () => void;
  tags?: string[];
}

export const QuickPromptCard: React.FC<QuickPromptCardProps> = ({
  icon,
  title,
  description,
  backgroundColor,
  onPress,
  tags = [],
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="rounded-2xl p-4 mr-3 w-32"
      style={{
        backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text className="text-2xl mb-2">{icon}</Text>
      <Text className="text-gray-800 font-bold text-sm mb-1">{title}</Text>
      <Text className="text-gray-700 text-xs leading-4 mb-3">{description}</Text>

      {tags.length > 0 && (
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View key={index} className="mr-1 mb-1">
              <Text className="text-gray-600 text-xs font-medium">
                #{tag}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};