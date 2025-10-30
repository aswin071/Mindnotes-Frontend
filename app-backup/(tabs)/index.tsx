import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Flame } from 'lucide-react-native';
import { router } from 'expo-router';

// Color scheme
const colors = {
  primary: '#fbcd51',
  background: '#fcfbf8',
  card: '#ffffff',
  text: '#1c180d',
  textMuted: '#9e8747',
  peach: '#ffc8b2',
  coral: '#ff8f8f',
  mint: '#a9efd5',
  lavender: '#d2bfff',
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getWeekDays = (date: Date) => {
    const current = new Date(date);
    const first = current.getDate() - current.getDay();
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(current.setDate(first + i));
      weekDays.push(new Date(d));
    }

    return weekDays;
  };

  const renderWeekCalendar = () => {
    const weekDays = getWeekDays(selectedDate);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return weekDays.map((day, index) => {
      const isSelected =
        selectedDate.getDate() === day.getDate() &&
        selectedDate.getMonth() === day.getMonth() &&
        selectedDate.getFullYear() === day.getFullYear();
      const isToday =
        new Date().getDate() === day.getDate() &&
        new Date().getMonth() === day.getMonth() &&
        new Date().getFullYear() === day.getFullYear();

      const moodColors = [colors.peach, colors.coral, colors.mint, colors.lavender];
      const moodColor = moodColors[day.getDate() % 4];

      let bgColor = moodColor + '30';
      if (isSelected) {
        bgColor = colors.primary;
      } else if (isToday) {
        bgColor = colors.primary + '40';
      }

      return (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedDate(day)}
          className="items-center gap-1"
        >
          <Text className="text-xs font-bold text-gray-500" style={{ color: colors.textMuted }}>
            {dayLabels[index]}
          </Text>
          <View
            className="items-center justify-center rounded-full"
            style={{
              width: 50,
              height: 50,
              backgroundColor: bgColor,
            }}
          >
            <Text
              style={{
                color: isSelected ? colors.text : colors.text,
                fontWeight: isSelected ? '700' : '500',
                fontSize: 16,
              }}
            >
              {day.getDate()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const moodData = [
    { day: 'M', height: 60, color: colors.peach },
    { day: 'T', height: 40, color: colors.coral },
    { day: 'W', height: 80, color: colors.mint },
    { day: 'T', height: 50, color: colors.lavender },
    { day: 'F', height: 90, color: colors.primary },
    { day: 'S', height: 75, color: colors.primary },
    { day: 'S', height: 65, color: colors.primary },
  ];

  const recentEntries = [
    {
      id: '1',
      date: 'May 14',
      title: 'Quiet Evening',
      preview: 'Had a lovely, quiet evening. Read a few chapters of my book...',
      moodColor: colors.lavender,
    },
    {
      id: '2',
      date: 'May 13',
      title: 'Productive Day',
      preview: 'Felt so productive today! Finished that big project...',
      moodColor: colors.mint,
    },
    {
      id: '3',
      date: 'May 12',
      title: 'Stressed Day',
      preview: 'A bit of a stressful day. Feeling overwhelmed with everything...',
      moodColor: colors.coral,
    },
    {
      id: '4',
      date: 'May 11',
      title: 'Fun Brunch',
      preview: 'Brunch with the girls was so much fun! We laughed so hard...',
      moodColor: colors.peach,
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        scrollEventThrottle={16}
      >
        {/* Profile Bar */}
        <View className="mx-4 mb-4 bg-white rounded-2xl p-3 shadow-sm flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            {/* Avatar */}
            <View
              className="items-center justify-center rounded-full"
              style={{
                width: 50,
                height: 50,
                backgroundColor: colors.primary + '30',
              }}
            >
              <Text className="text-xl font-bold" style={{ color: colors.text }}>
                O
              </Text>
            </View>

            {/* User Info */}
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-800">
                Olivia
              </Text>
              <Text className="text-xs text-gray-500">
                Keep it going! You're building a great habit.
              </Text>
            </View>
          </View>

          {/* Streak Badge */}
          <View
            className="items-center justify-center rounded-full px-3 py-2"
            style={{
              backgroundColor: colors.primary + '30',
            }}
          >
            <View className="flex-row items-center gap-1">
              <Flame size={16} color={colors.primary} strokeWidth={2} />
              <Text className="text-sm font-bold" style={{ color: colors.text }}>
                7
              </Text>
            </View>
          </View>
        </View>

        {/* Week Calendar Card */}
        <View className="mx-4 mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1" />
            <Text className="text-base font-bold text-gray-800">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
            <View className="flex-1" />
          </View>

          {/* Week Days */}
          <View className="flex-row justify-between gap-1 px-1">
            {renderWeekCalendar()}
          </View>
        </View>

        {/* Mood Chart */}
        <View className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Your Week in Moods</Text>
          <View className="flex-row items-end justify-between h-32 gap-1">
            {moodData.map((mood, index) => (
              <View key={index} className="flex-1 items-center h-full">
                <View
                  className="w-full rounded-full"
                  style={{
                    height: `${mood.height}%`,
                    backgroundColor: mood.color,
                  }}
                />
                <Text className="text-xs font-bold text-gray-400 mt-2">
                  {mood.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Reflection */}
        <View className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Today's Reflection
          </Text>
          <Text className="text-sm text-gray-600 leading-5">
            What's one small thing you can do today that would make you feel proud?
          </Text>
        </View>

        {/* Recent Moments */}
        <View className="mb-4 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Recent Moments
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            {recentEntries.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/entry/${item.id}`)}
                className={`py-3 ${index !== recentEntries.length - 1 ? 'border-b' : ''}`}
                style={{
                  borderBottomColor: index !== recentEntries.length - 1 ? colors.background : 'transparent',
                }}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-gray-800">
                      {item.date}
                    </Text>
                  </View>
                  <View
                    className="w-3 h-3 rounded-full mt-0.5"
                    style={{ backgroundColor: item.moodColor }}
                  />
                </View>
                <Text
                  className="text-xs text-gray-600 leading-4"
                  numberOfLines={2}
                >
                  {item.preview}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-24 right-4 bg-yellow-400 rounded-full px-6 py-3 flex-row items-center"
        style={{
          backgroundColor: colors.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={() => router.push('/create-entry')}
      >
        <Plus size={24} color={colors.text} strokeWidth={2.5} />
        <Text
          className="text-sm font-bold ml-2"
          style={{ color: colors.text }}
        >
          New Entry
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
