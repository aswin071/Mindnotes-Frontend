/**
 * Home / Dashboard Screen (Redesigned)
 *
 * New home design with:
 * - Welcome back header with background pattern
 * - Personalized greeting and motivational quote
 * - "Create New Entry" prominent button
 * - 5-Day Streak card with mini calendar (M-F)
 * - Moods quick access button
 * - Recent Moments horizontal scroll
 * - Bottom navigation bar
 *
 * Design: Attractive, playful, using global theme colors
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Sparkles, Smile } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

// Mock data
const RECENT_ENTRIES = [
  {
    id: '1',
    date: 'May 14',
    mood: 'reflective',
    preview: 'Had a lovely, quiet evening. Read a few chapters of my book and just relaxed. It\'s nice to have these moments...',
  },
  {
    id: '2',
    date: 'May 13',
    mood: 'productive',
    preview: 'Felt so productive today! Finished that big project at work and even had energy to go for a long walk. The weather was perfect.',
  },
  {
    id: '3',
    date: 'May 12',
    mood: 'excited',
    preview: 'A bit of a stressful day. Feeling a little overwhelmed with everything on my plate. Hoping for a better day tomorrow.',
  },
];

const STREAK_DAYS = [
  { day: 'M', date: 11, mood: 'happy' },
  { day: 'T', date: 12, mood: 'excited' },
  { day: 'W', date: 13, mood: 'calm' },
  { day: 'T', date: 14, mood: 'reflective' },
  { day: 'F', date: 15, mood: 'productive' },
];

const getMoodColor = (moodName: string | undefined) => {
  const moodColors: { [key: string]: string } = {
    happy: theme.colors.mood.happy,
    excited: theme.colors.mood.excited,
    calm: theme.colors.mood.calm,
    reflective: theme.colors.mood.reflective,
    peaceful: theme.colors.mood.peaceful,
    productive: theme.colors.mood.productive,
  };
  return moodColors[moodName || 'peaceful'] || theme.colors.neutral.gray[200];
};

export default function HomeScreen() {
  const router = useRouter();

  const handleCreateEntry = () => {
    router.push('/(tabs)/journal');
  };

  const handleViewEntry = () => {
    router.push('/(tabs)/journal');
  };

  const handleMoods = () => {
    router.push('/(tabs)/mood');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.neutral.beige },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Welcome Header with Background Pattern */}
        <View style={[styles.headerSection, { backgroundColor: `${theme.colors.primary.main}20` }]}>
          {/* Decorative circles background */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          {/* Content */}
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <Sparkles
                size={28}
                color={theme.colors.neutral.black}
                strokeWidth={1.5}
              />
              <Text style={[styles.dateText, { color: theme.colors.neutral.gray[500] }]}>
                May 15
              </Text>
            </View>

            <Text style={[styles.welcomeText, { color: theme.colors.neutral.black }]}>
              Welcome Back, Olivia!
            </Text>

            <Text style={[styles.quoteText, { color: theme.colors.neutral.gray[500] }]}>
              "The secret of getting ahead is getting started."
            </Text>
          </View>
        </View>

        {/* Create New Entry Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: theme.colors.primary.main },
            ]}
            onPress={handleCreateEntry}
            activeOpacity={0.85}
          >
            <Text style={[styles.createButtonText, { color: theme.colors.neutral.black }]}>
              Create New Entry
            </Text>
          </TouchableOpacity>
        </View>

        {/* Streak Section with Moods Button */}
        <View style={styles.streakSection}>
          {/* 5-Day Streak Card */}
          <View
            style={[
              styles.streakCard,
              { backgroundColor: theme.colors.neutral.white },
            ]}
          >
            <Text style={[styles.streakTitle, { color: theme.colors.neutral.black }]}>
              5-Day Streak
            </Text>

            {/* Mini Calendar */}
            <View style={styles.miniCalendar}>
              {STREAK_DAYS.map((day, idx) => (
                <View key={idx} style={styles.streakDay}>
                  <Text style={[styles.dayLabel, { color: theme.colors.neutral.gray[500] }]}>
                    {day.day}
                  </Text>
                  <View
                    style={[
                      styles.dayCircle,
                      {
                        backgroundColor: idx === 4 ? getMoodColor(day.mood) : getMoodColor(day.mood),
                        borderWidth: idx === 4 ? 3 : 0,
                        borderColor: idx === 4 ? theme.colors.primary.main : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNumber,
                        {
                          color:
                            day.mood === 'productive' || day.mood === 'excited'
                              ? theme.colors.neutral.white
                              : theme.colors.neutral.black,
                          fontWeight: idx === 4 ? '700' : '500',
                        },
                      ]}
                    >
                      {day.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Moods Button */}
          <TouchableOpacity
            style={[
              styles.moodsButton,
              { backgroundColor: theme.colors.neutral.white },
            ]}
            onPress={handleMoods}
            activeOpacity={0.7}
          >
            <Smile
              size={32}
              color={theme.colors.primary.main}
              strokeWidth={1.5}
            />
            <Text style={[styles.moodsButtonText, { color: theme.colors.neutral.gray[500] }]}>
              Moods
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Moments Section */}
        <View style={styles.recentSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral.black }]}>
            Recent Moments
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.entriesScroll}
            contentContainerStyle={styles.entriesScrollContent}
            scrollEventThrottle={16}
          >
            {RECENT_ENTRIES.map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={[
                  styles.entryCard,
                  { backgroundColor: theme.colors.neutral.white },
                ]}
                onPress={handleViewEntry}
                activeOpacity={0.7}
              >
                <View style={styles.entryHeader}>
                  <Text
                    style={[
                      styles.entryDate,
                      { color: theme.colors.neutral.black },
                    ]}
                  >
                    {entry.date}
                  </Text>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: getMoodColor(entry.mood),
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.entryPreview,
                    { color: theme.colors.neutral.gray[500] },
                  ]}
                  numberOfLines={3}
                >
                  {entry.preview}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Spacing for bottom nav */}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 28,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: `${theme.colors.primary.main}30`,
    top: -50,
    left: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: `${theme.colors.primary.main}20`,
    bottom: -80,
    right: -80,
  },
  headerContent: {
    position: 'relative',
    zIndex: 10,
    gap: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 4,
  },
  buttonSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  createButton: {
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  streakSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    flexDirection: 'row',
  },
  streakCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  miniCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  streakDay: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  moodsButton: {
    width: 88,
    height: 88,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  moodsButtonText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  recentSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  entriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  entriesScrollContent: {
    gap: 12,
    paddingRight: 16,
  },
  entryCard: {
    width: 200,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  entryPreview: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
});
