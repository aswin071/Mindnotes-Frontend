import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../constants/theme';

interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodSelect,
}) => {
  const moods: Mood[] = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: colors.primary.yellow },
    { id: 'grateful', emoji: '🙏', label: 'Grateful', color: colors.accent.peach },
    { id: 'excited', emoji: '🎉', label: 'Excited', color: colors.accent.coral },
    { id: 'calm', emoji: '😌', label: 'Calm', color: colors.accent.mint },
    { id: 'reflective', emoji: '💭', label: 'Reflective', color: colors.accent.lavender },
    { id: 'loved', emoji: '🥰', label: 'Loved', color: '#FFB6C1' },
  ];

  return (
    <View>
      <Text className="text-base font-semibold text-gray-800 mb-3">How are you feeling?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              onPress={() => onMoodSelect(mood.id)}
              className={`mr-3 ${selectedMood === mood.id ? 'scale-110' : ''}`}
              activeOpacity={0.7}
            >
              <View
                className={`items-center justify-center rounded-2xl p-3 ${
                  selectedMood === mood.id ? 'border-2 border-yellow-400' : ''
                }`}
                style={{
                  backgroundColor: selectedMood === mood.id ? mood.color : colors.neutral.cream,
                  minWidth: 80,
                }}
              >
                <Text className="text-2xl mb-1">{mood.emoji}</Text>
                <Text
                  className={`text-xs font-medium ${
                    selectedMood === mood.id ? 'text-gray-800' : 'text-gray-600'
                  }`}
                >
                  {mood.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};