import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Download, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { JournalEntry } from '@/components/JournalEntry';
import { FilterModal } from '@/components/FilterModal';

// Mock data for journal entries
const mockEntries = [
  {
    id: '1',
    title: 'Morning Reflection',
    content: 'Started the day with gratitude practice. Feeling optimistic about the challenges ahead and ready to tackle my goals.',
    date: new Date(),
    mood: 'Happy',
    tags: ['gratitude', 'morning', 'goals'],
    type: 'text'
  },
  {
    id: '2',
    title: 'Evening Wind Down',
    content: 'Reflected on today\'s accomplishments. Three things I\'m grateful for: family time, productive work session, and a beautiful sunset.',
    date: new Date(Date.now() - 86400000),
    mood: 'Calm',
    tags: ['evening', 'gratitude', 'reflection'],
    type: 'text'
  },
  {
    id: '3',
    title: 'Challenging Day',
    content: 'Today was tough, but I learned something valuable about resilience. Sometimes the hardest days teach us the most.',
    date: new Date(Date.now() - 172800000),
    mood: 'Stressed',
    tags: ['challenge', 'growth', 'resilience'],
    type: 'text'
  },
];

export default function JournalScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    mood: null,
    tags: [],
    dateRange: null,
  });

  const filteredEntries = mockEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMood = !selectedFilters.mood || entry.mood === selectedFilters.mood;

    const matchesTags = selectedFilters.tags.length === 0 ||
                       selectedFilters.tags.some(tag => entry.tags.includes(tag));

    return matchesSearch && matchesMood && matchesTags;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header - Mobile Optimized */}
      <View className="px-5 pt-2 pb-4">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-black mb-1">Journal</Text>
            <Text className="text-base text-gray-600">{mockEntries.length} entries</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/create-entry')}
            className="bg-yellow-400 rounded-full p-4 active:bg-yellow-500 shadow-sm"
            activeOpacity={0.8}
          >
            <Plus color="#000000" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter - Better mobile UX */}
      <View className="px-5 py-3">
        <View className="flex-row">
          <View className="flex-1 bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border-2 border-gray-200 mr-3">
            <Search color="#9CA3AF" size={22} />
            <TextInput
              placeholder="Search entries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-black text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 active:bg-gray-200 mr-3"
            activeOpacity={0.7}
          >
            <Filter color="#374151" size={24} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 active:bg-gray-200"
            activeOpacity={0.7}
          >
            <Download color="#374151" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Filters - Mobile optimized */}
      {(selectedFilters.mood || selectedFilters.tags.length > 0) && (
        <View className="px-5 pb-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {selectedFilters.mood && (
                <View className="bg-yellow-100 rounded-full px-5 py-2 border-2 border-yellow-300 mr-3">
                  <Text className="text-yellow-700 text-base font-semibold">
                    Mood: {selectedFilters.mood}
                  </Text>
                </View>
              )}
              {selectedFilters.tags.map((tag, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-5 py-2 border-2 border-gray-300 mr-3">
                  <Text className="text-gray-700 text-base font-semibold">#{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Journal Entries - Better mobile spacing */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredEntries.length > 0 ? (
          <View className="pt-2">
            {filteredEntries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-20 px-8">
            <Text className="text-gray-500 text-xl font-semibold mb-3">No entries found</Text>
            <Text className="text-gray-400 text-center text-base leading-relaxed">
              {searchQuery || selectedFilters.mood || selectedFilters.tags.length > 0
                ? 'Try adjusting your search or filters'
                : 'Start your journaling journey by creating your first entry'
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />
    </SafeAreaView>
  );
}
