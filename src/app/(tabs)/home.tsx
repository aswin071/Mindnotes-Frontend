import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';

// Mock data for calendar
const getDaysInMonth = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
};

const MOOD_DATES = [
  { date: 13, mood: '#FFD4C4' },
  { date: 14, mood: '#E8D4F8' },
  { date: 15, mood: '#FFB89A' },
  { date: 16, mood: '#FFD4C4' },
];

const WEEK_MOODS = [
  { day: 'M', height: 60, color: '#FFB89A' },
  { day: 'T', height: 40, color: '#FF9B8A' },
  { day: 'W', height: 80, color: '#B8E6D5' },
  { day: 'T', height: 70, color: '#E8D4F8' },
  { day: 'F', height: 65, color: '#FFD4C4' },
  { day: 'S', height: 75, color: '#FFD4C4' },
  { day: 'S', height: 70, color: '#FFB89A' },
];

const RECENT_ENTRIES = [
  {
    id: '1',
    date: 'May 14',
    mood: '#E8D4F8',
    preview: 'Had a lovely, quiet evening. Read a few chapters of my book...',
  },
  {
    id: '2',
    date: 'May 13',
    mood: '#FFD4C4',
    preview: 'Finished that big project at work. Feeling accomplished...',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [currentMonth] = useState(4); // May = 4
  const [currentYear] = useState(2024);

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth, currentYear);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleNewEntry = () => {
    router.push('/(tabs)/create-entry');
  };

  const handleViewEntry = () => {
    router.push('/(tabs)/journal');
  };

  const getMoodForDate = (day: number) => {
    const moodDate = MOOD_DATES.find(m => m.date === day);
    return moodDate ? moodDate.mood : null;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-3 pb-2 flex-row justify-between items-center">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Settings size={18} color="#999" strokeWidth={2} />
              <Text className="font-sans text-xs text-gray-400">May 15</Text>
            </View>
            <Text className="font-journal text-2xl font-bold text-gray-900">
              Good Morning, Olivia!
            </Text>
          </View>
        </View>

        {/* Streak Badge */}
        <View className="px-5 pt-2 pb-4">
          <View className="bg-gray-50 rounded-2xl px-4 py-2 self-start">
            <Text className="font-sans text-sm text-gray-700">
              You're on a <Text className="font-bold">5-day</Text> streak!
            </Text>
          </View>
        </View>

        {/* Calendar Card */}
        <View className="px-5 pb-5">
          <View className="bg-gray-50 rounded-3xl p-5">
            {/* Calendar Header */}
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity>
                <ChevronLeft size={20} color="#666" />
              </TouchableOpacity>
              <Text className="font-journal text-base font-semibold text-gray-900">
                {monthNames[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity>
                <ChevronRight size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Day Labels */}
            <View className="flex-row justify-between mb-3">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <View key={idx} className="w-[36px] items-center">
                  <Text className="font-sans text-xs text-gray-400 font-medium">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View className="gap-2">
              {[...Array(Math.ceil((firstDay + daysInMonth) / 7))].map((_, weekIdx) => (
                <View key={weekIdx} className="flex-row justify-between">
                  {[...Array(7)].map((_, dayIdx) => {
                    const dayNumber = weekIdx * 7 + dayIdx - firstDay + 1;
                    const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                    const moodColor = isValidDay ? getMoodForDate(dayNumber) : null;
                    const isToday = dayNumber === 15;

                    return (
                      <View key={dayIdx} className="w-[36px] h-[36px] items-center justify-center">
                        {isValidDay && (
                          <View
                            className="w-[32px] h-[32px] rounded-full items-center justify-center"
                            style={{
                              backgroundColor: moodColor || (isToday ? '#FFB89A' : 'transparent'),
                              borderWidth: isToday && !moodColor ? 2 : 0,
                              borderColor: '#FFB89A',
                            }}
                          >
                            <Text
                              className={`font-sans text-sm ${isToday || moodColor ? 'font-semibold text-gray-900' : 'text-gray-600'}`}
                            >
                              {dayNumber}
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Your Week In Moods */}
        <View className="px-5 pb-5">
          <Text className="font-journal text-lg font-bold text-gray-900 mb-3">
            Your Week In Moods
          </Text>
          <View className="bg-gray-50 rounded-3xl p-5">
            <View className="flex-row items-end justify-between h-[120px]">
              {WEEK_MOODS.map((item, idx) => (
                <View key={idx} className="items-center gap-2" style={{ flex: 1 }}>
                  <View
                    className="w-[28px] rounded-full"
                    style={{
                      height: item.height,
                      backgroundColor: item.color,
                    }}
                  />
                  <Text className="font-sans text-xs text-gray-400 font-medium">
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Today's Reflection */}
        <View className="px-5 pb-5">
          <Text className="font-journal text-lg font-bold text-gray-900 mb-3">
            Today's Reflection
          </Text>
          <View className="bg-gray-50 rounded-3xl p-5">
            <Text className="font-journal text-sm text-gray-600 leading-6">
              What's one small thing you can do today that would make you feel proud?
            </Text>
          </View>
        </View>

        {/* Recent Moments */}
        <View className="px-5 pb-24">
          <Text className="font-journal text-lg font-bold text-gray-900 mb-3">
            Recent Moments
          </Text>
          {RECENT_ENTRIES.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              className="bg-gray-50 rounded-3xl p-5 mb-3 flex-row"
              onPress={handleViewEntry}
              activeOpacity={0.7}
            >
              <View
                className="w-2 h-2 rounded-full mt-1.5 mr-3"
                style={{ backgroundColor: entry.mood }}
              />
              <View className="flex-1">
                <Text className="font-journal text-sm font-semibold text-gray-900 mb-1">
                  {entry.date}
                </Text>
                <Text className="font-journal text-sm text-gray-600 leading-5">
                  {entry.preview}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />

      {/* Floating New Entry Button - Right side above bottom nav */}
      <View className="absolute right-5" style={{ bottom: 100 }}>
        <TouchableOpacity
          className="bg-coral rounded-full px-6 py-3 flex-row items-center justify-center gap-2"
          style={{
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
          onPress={handleNewEntry}
          activeOpacity={0.85}
        >
          <Plus size={18} color="#FFF" strokeWidth={2.5} />
          <Text className="font-sans text-sm font-semibold text-white">
            New Entry
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
