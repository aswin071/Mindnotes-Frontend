import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FileText, Heart, Star } from 'lucide-react-native';
import { colors } from '../constants/theme';

interface JournalCardProps {
  title: string;
  date: string;
  preview?: string;
  mood?: 'happy' | 'grateful' | 'reflective' | 'excited' | 'calm';
  image?: string;
  onPress: () => void;
  isFavorite?: boolean;
}

export const JournalCard: React.FC<JournalCardProps> = ({
  title,
  date,
  preview,
  mood,
  image,
  onPress,
  isFavorite = false,
}) => {
  const getMoodColor = () => {
    switch (mood) {
      case 'happy':
        return colors.primary.yellow;
      case 'grateful':
        return colors.accent.peach;
      case 'reflective':
        return colors.accent.lavender;
      case 'excited':
        return colors.accent.coral;
      case 'calm':
        return colors.accent.mint;
      default:
        return colors.neutral.cream;
    }
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'grateful':
        return '🙏';
      case 'reflective':
        return '💭';
      case 'excited':
        return '🎉';
      case 'calm':
        return '🧘‍♀️';
      default:
        return '📝';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      className="mb-4"
    >
      <View className="bg-white rounded-3xl p-5" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}>
        {/* Header with date and mood */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center">
            {mood && (
              <View
                className="rounded-full px-3 py-1 mr-2"
                style={{ backgroundColor: getMoodColor() }}
              >
                <Text className="text-base">{getMoodEmoji()}</Text>
              </View>
            )}
            <Text className="text-gray-500 text-sm">{date}</Text>
          </View>
          {isFavorite && (
            <Star size={18} color={colors.primary.yellow} fill={colors.primary.yellow} />
          )}
        </View>

        {/* Title */}
        <Text className="text-gray-800 text-lg font-semibold mb-2">
          {title}
        </Text>

        {/* Preview */}
        {preview && (
          <Text className="text-gray-600 text-sm leading-5 mb-3" numberOfLines={2}>
            {preview}
          </Text>
        )}

        {/* Image if exists */}
        {image && (
          <View className="rounded-2xl overflow-hidden mb-3">
            <Image
              source={{ uri: image }}
              className="w-full h-40"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Bottom action row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <FileText size={16} color={colors.gray[400]} />
            <Text className="text-gray-400 text-xs ml-1">Read more</Text>
          </View>
          <View className="flex-row items-center">
            <Heart size={16} color={colors.gray[400]} />
            <Text className="text-gray-400 text-xs ml-1">12</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};