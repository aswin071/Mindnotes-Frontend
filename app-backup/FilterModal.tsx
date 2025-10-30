import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    mood: string | null;
    tags: string[];
    dateRange: string | null;
  };
  onFiltersChange: (filters: any) => void;
}

const moods = ['Happy', 'Calm', 'Neutral', 'Sad', 'Stressed'];
const availableTags = ['gratitude', 'morning', 'evening', 'goals', 'reflection', 'challenge', 'growth', 'resilience', 'work', 'family'];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible = false,
  onClose = () => {},
  filters = { mood: null, tags: [], dateRange: null },
  onFiltersChange = () => {}
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const toggleMood = (mood: string) => {
    setLocalFilters(prev => ({
      ...prev,
      mood: prev.mood === mood ? null : mood
    }));
  };

  const toggleTag = (tag: string) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = { mood: null, tags: [], dateRange: null };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
          <Text className="text-xl font-bold text-black">Filter Entries</Text>
          <TouchableOpacity onPress={onClose}>
            <X color="#374151" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-6">
          {/* Mood Filter */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-black mb-4">Mood</Text>
            <View className="flex-row flex-wrap">
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood}
                  onPress={() => toggleMood(mood)}
                  className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                    localFilters.mood === mood
                      ? 'bg-yellow-400 border-yellow-400'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text className={`font-medium ${
                    localFilters.mood === mood ? 'text-black' : 'text-gray-600'
                  }`}>
                    {mood}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags Filter */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-black mb-4">Tags</Text>
            <View className="flex-row flex-wrap">
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                    localFilters.tags.includes(tag)
                      ? 'bg-yellow-400 border-yellow-400'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text className={`font-medium ${
                    localFilters.tags.includes(tag) ? 'text-black' : 'text-gray-600'
                  }`}>
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View className="p-6 border-t border-gray-200">
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={clearFilters}
              className="flex-1 bg-gray-100 rounded-xl py-4 items-center"
            >
              <Text className="text-gray-700 font-semibold">Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={applyFilters}
              className="flex-1 bg-yellow-400 rounded-xl py-4 items-center"
            >
              <Text className="text-black font-semibold">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};