/**
 * Journal Entries Screen
 *
 * Displays a chronological list of all journal entries
 * Features:
 * - Header with entries count
 * - Search/filter functionality
 * - Journal entries list with mood indicators
 * - Responsive card layout with Tailwind CSS
 * - Smooth animations and interactions
 *
 * Design: Clean, modern cards with global colors
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView as RNScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ChevronRight, MessageCircle, Plus, Calendar, X, ChevronLeft, ChevronDown } from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  preview: string;
  mood: 'happy' | 'excited' | 'calm' | 'reflective' | 'peaceful' | 'productive' | 'sad' | 'anxious';
  readTime: number;
}

const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: 'May 15, 2024',
    title: 'A Perfect Day',
    preview: 'Started the day with a productive morning routine. Had a great meeting at work and finished my big project ahead of schedule. Feeling accomplished...',
    mood: 'excited',
    readTime: 4,
  },
  {
    id: '2',
    date: 'May 14, 2024',
    title: 'Quiet Evening Reflections',
    preview: 'Had a lovely, quiet evening. Read a few chapters of my book and just relaxed. It\'s nice to have these moments of peace to myself...',
    mood: 'peaceful',
    readTime: 3,
  },
  {
    id: '3',
    date: 'May 13, 2024',
    title: 'Productive Day',
    preview: 'Felt so productive today! Finished that big project at work and even had energy to go for a long walk. The weather was perfect...',
    mood: 'calm',
    readTime: 5,
  },
];

export default function JournalScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleEntryPress = (entryId: string) => {
    router.push(`/entry/${entryId}`);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return date >= selectedStartDate;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isBoundaryDate = (date: Date) => {
    if (!selectedStartDate) return false;
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    return isSameDay(date, selectedStartDate) || (selectedEndDate && isSameDay(date, selectedEndDate));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    if (!selectedStartDate) {
      setSelectedStartDate(selected);
    } else if (!selectedEndDate) {
      if (selected >= selectedStartDate) {
        setSelectedEndDate(selected);
      } else {
        setSelectedStartDate(selected);
        setSelectedEndDate(null);
      }
    } else {
      setSelectedStartDate(selected);
      setSelectedEndDate(null);
    }
  };

  const clearDateFilter = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const closeDateFilter = () => {
    setShowDateFilter(false);
  };

  const handleCreateNew = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
    ]).start();

    router.push('/(tabs)/create-entry');
  };

  const getMoodColor = (mood: string): string => {
    const moodMap: Record<string, string> = {
      happy: '#FFD4C4',
      excited: '#FFB89A',
      calm: '#B8E6D5',
      reflective: '#E8D4F8',
      peaceful: '#D4B5F0',
      productive: '#7DD3B0',
      sad: '#FFB89A',
      anxious: '#FF9F7F',
    };
    return moodMap[mood] || '#FFB89A';
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-peach-light px-5 py-6 rounded-b-3xl">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="font-sans text-3xl font-extrabold text-gray-800 mb-1">
              Your Entries
            </Text>
            <Text className="font-sans text-sm font-medium text-peach-dark">
              {SAMPLE_ENTRIES.length} moments captured
            </Text>
          </View>
        </View>
      </View>

      {/* Search & Filter Bar */}
      <View className="px-5 py-4">
        <View className="flex-row gap-3 items-center">
          <TouchableOpacity
            onPress={() => setSearchActive(!searchActive)}
            activeOpacity={0.7}
            className="flex-1"
          >
            <View className={`flex-row items-center bg-white px-4 py-3.5 rounded-2xl border ${searchActive ? 'border-peach' : 'border-gray-200'} shadow-sm`}>
              <Search
                size={18}
                color={searchActive ? '#FFB89A' : '#9CA3AF'}
                strokeWidth={2}
              />
              <Text className="font-sans text-sm text-gray-400 ml-2 flex-1">
                Search entries...
              </Text>
            </View>
          </TouchableOpacity>

          {/* Date Filter Button */}
          <TouchableOpacity
            onPress={() => setShowDateFilter(true)}
            className={`w-12 h-12 rounded-2xl border ${selectedStartDate ? 'bg-peach border-peach' : 'bg-white border-gray-200'} items-center justify-center shadow-sm`}
            activeOpacity={0.7}
          >
            <Calendar
              size={20}
              color={selectedStartDate ? '#1F2937' : '#9CA3AF'}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        {/* Active Filter Display */}
        {selectedStartDate && (
          <View className="flex-row items-center gap-2 bg-peach-light px-4 py-2.5 rounded-full mt-3">
            <Text className="font-sans text-sm font-semibold text-gray-800">
              {formatDate(selectedStartDate)}
              {selectedEndDate && ` - ${formatDate(selectedEndDate)}`}
            </Text>
            <TouchableOpacity onPress={clearDateFilter} activeOpacity={0.7}>
              <X size={16} color="#1F2937" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Date Filter Modal */}
      <Modal
        visible={showDateFilter}
        transparent
        animationType="fade"
        onRequestClose={closeDateFilter}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-5">
          <View className="w-full max-w-sm bg-gray-50 rounded-3xl overflow-hidden">
            {/* Modal Header */}
            <View className="bg-peach flex-row justify-between items-center h-14 px-5">
              <TouchableOpacity onPress={closeDateFilter} className="w-11 h-11 justify-center items-center">
                <X size={24} color="#1F2937" strokeWidth={2.5} />
              </TouchableOpacity>
              <Text className="font-sans text-lg font-bold text-gray-800 flex-1 text-center">
                Filter by Date
              </Text>
              <TouchableOpacity onPress={clearDateFilter} className="w-11 h-11 justify-center items-center">
                <Text className="font-sans text-sm font-semibold text-gray-800">
                  Clear
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Range Display */}
            <View className="flex-row justify-center items-center gap-2 px-4 py-3">
              <View className="flex-1 min-w-[100px] bg-white border-2 border-peach rounded-2xl px-3 py-2.5 items-center">
                <Text className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  From
                </Text>
                <Text className="font-sans text-sm font-bold text-gray-800 mt-1 text-center">
                  {formatDate(selectedStartDate)}
                </Text>
              </View>

              {selectedEndDate && (
                <>
                  <ChevronRight size={24} color="#FFB89A" strokeWidth={2} />
                  <View className="flex-1 min-w-[100px] bg-white border-2 border-peach rounded-2xl px-3 py-2.5 items-center">
                    <Text className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      To
                    </Text>
                    <Text className="font-sans text-sm font-bold text-gray-800 mt-1 text-center">
                      {formatDate(selectedEndDate)}
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* Calendar */}
            <RNScrollView
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Month/Year Header */}
              <View className="flex-row justify-between items-center py-2 mb-2">
                <TouchableOpacity
                  onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 w-9 h-9 justify-center items-center"
                >
                  <ChevronLeft size={20} color="#FFB89A" strokeWidth={2} />
                </TouchableOpacity>
                <Text className="font-sans text-base font-bold text-gray-800 flex-1 text-center">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity
                  onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 w-9 h-9 justify-center items-center"
                >
                  <ChevronDown size={20} color="#FFB89A" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Day Labels */}
              <View className="flex-row my-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={day} className="flex-1 text-center font-sans text-xs font-semibold text-gray-500">
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar Days */}
              <View className="flex-row flex-wrap gap-1 mb-2">
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <View key={`empty-${i}`} className="w-[13.33%] aspect-square" />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const inRange = isDateInRange(date);
                  const isBoundary = isBoundaryDate(date);

                  return (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDateSelect(day)}
                      className={`w-[13.33%] aspect-square rounded-xl justify-center items-center ${inRange ? 'bg-peach-light' : ''} ${isBoundary ? 'bg-peach' : ''}`}
                      activeOpacity={0.7}
                    >
                      <Text className={`font-sans text-base ${isBoundary ? 'font-bold text-gray-800' : 'font-medium text-gray-800'}`}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </RNScrollView>

            {/* Footer Action */}
            <TouchableOpacity
              onPress={closeDateFilter}
              className="h-12 bg-peach rounded-full justify-center items-center mx-4 my-4 shadow-md"
              activeOpacity={0.8}
            >
              <Text className="font-sans text-sm font-bold text-gray-800 tracking-wide">
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Entries List */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {(() => {
          const filteredEntries = SAMPLE_ENTRIES.filter((entry) => {
            if (!selectedStartDate) return true;
            const entryDate = new Date(entry.date);
            return isDateInRange(entryDate);
          });

          if (filteredEntries.length === 0 && selectedStartDate) {
            return (
              <View className="flex-1 justify-center items-center py-16 min-h-[200px]">
                <Text className="font-sans text-base font-medium text-gray-500 text-center">
                  No entries found in this date range
                </Text>
              </View>
            );
          }

          return filteredEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
              onPress={() => handleEntryPress(entry.id)}
              activeOpacity={0.7}
            >
              {/* Card Header */}
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="font-sans text-sm font-medium text-gray-800 mb-1">
                    {entry.date}
                  </Text>
                  <Text className="font-sans text-base font-bold text-gray-800" numberOfLines={1}>
                    {entry.title}
                  </Text>
                </View>
                <View
                  className="w-3 h-3 rounded-full mt-1"
                  style={{ backgroundColor: getMoodColor(entry.mood) }}
                />
              </View>

              {/* Card Preview */}
              <Text className="font-sans text-sm text-gray-600 leading-5 mb-3" numberOfLines={3}>
                {entry.preview}
              </Text>

              {/* Card Footer */}
              <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                <View className="flex-row items-center gap-1.5">
                  <MessageCircle size={14} color="#9CA3AF" strokeWidth={2} />
                  <Text className="font-sans text-xs font-medium text-gray-400">
                    {entry.readTime} min read
                  </Text>
                </View>
                <ChevronRight size={18} color="#FFB89A" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          ));
        })()}
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        className="absolute bottom-28 right-6 w-16 h-16 rounded-full bg-peach justify-center items-center shadow-xl"
        style={{
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleCreateNew}
          className="w-full h-full justify-center items-center"
          activeOpacity={0.8}
        >
          <Plus size={30} color="#1F2937" strokeWidth={2.5} />
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="journal" />
    </SafeAreaView>
  );
}
