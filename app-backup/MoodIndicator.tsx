import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MoodIndicatorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-400' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-400' },
  { emoji: '😐', label: 'Neutral', color: 'bg-gray-400' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-600' },
  { emoji: '😤', label: 'Stressed', color: 'bg-red-400' },
];

export const MoodIndicator: React.FC<MoodIndicatorProps> = ({ 
  selectedMood = null, 
  onMoodSelect = () => {} 
}) => {
  return (
    <View>
      <Text className="text-lg font-semibold text-black mb-3">How are you feeling today?</Text>
      <View className="flex-row justify-between">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            onPress={() => onMoodSelect(mood.label)}
            className={`items-center p-3 rounded-xl ${
              selectedMood === mood.label ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'
            }`}
          >
            <Text className="text-2xl mb-1">{mood.emoji}</Text>
            <Text className="text-xs text-gray-600 font-medium">{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};