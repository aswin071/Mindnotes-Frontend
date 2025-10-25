import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface JournalEntryProps {
  entry: {
    id: string;
    title: string;
    content: string;
    date: Date;
    mood: string;
    tags: string[];
    type: string;
  };
}

const moodColors = {
  Happy: 'bg-green-400',
  Calm: 'bg-blue-400',
  Neutral: 'bg-gray-400',
  Sad: 'bg-blue-600',
  Stressed: 'bg-red-400',
};

export const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/entry/${entry.id}`)}
      className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 active:bg-gray-100 mb-4"
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <Text className="text-sm text-gray-500 font-medium">
            {formatDate(entry.date)}, {formatTime(entry.date)}
          </Text>
        </View>
        <View className={`w-6 h-6 rounded-full ${moodColors[entry.mood] || 'bg-gray-400'}`} />
      </View>

      {/* Content */}
      <Text className="text-black font-semibold text-lg mb-2">{entry.title}</Text>
      <Text className="text-gray-600 text-base leading-relaxed mb-3" numberOfLines={3}>
        {entry.content}
      </Text>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <View className="flex-row flex-wrap">
          {entry.tags.slice(0, 3).map((tag, index) => (
            <View key={index} className="bg-gray-200 rounded-full px-3 py-2 mr-2 mb-1">
              <Text className="text-gray-700 text-sm font-semibold">#{tag}</Text>
            </View>
          ))}
          {entry.tags.length > 3 && (
            <View className="bg-gray-200 rounded-full px-3 py-2">
              <Text className="text-gray-700 text-sm font-semibold">
                +{entry.tags.length - 3} more
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};