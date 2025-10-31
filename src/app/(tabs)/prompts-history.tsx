/**
 * Prompts History Screen
 *
 * Displays all previously answered prompts organized by date
 * Features:
 * - View all answered prompts with their responses
 * - Organized chronologically by date
 * - Search functionality to find specific prompts
 * - Mood indicators for each prompt answer
 * - Expandable cards to view full responses
 * - Statistics showing completion rate
 *
 * Design: Clean, organized, encouraging reflection on past answers
 * Colors: From global theme with mood accents
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Search,
  Calendar,
  Star,
  Leaf,
  Heart,
  Lightbulb,
  Zap,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

interface PromptAnswer {
  id: string;
  date: string;
  dayOfWeek: string;
  prompts: Array<{
    id: string;
    number: number;
    question: string;
    answer: string;
    icon: 'star' | 'leaf' | 'heart' | 'lightbulb' | 'zap';
    moodColor: string;
  }>;
}

// Mock data - in production, this would come from an API/database
const MOCK_PROMPTS_HISTORY: PromptAnswer[] = [
  {
    id: '1',
    date: 'October 29, 2024',
    dayOfWeek: 'Tuesday',
    prompts: [
      {
        id: '1',
        number: 1,
        question: 'What brought you a moment of joy today?',
        answer:
          'Had a wonderful coffee meeting with an old friend. We talked for hours and it felt like no time had passed. Reminded me how important those connections are.',
        icon: 'star',
        moodColor: theme.colors.mood.happy,
      },
      {
        id: '2',
        number: 2,
        question: 'A challenge I faced was...',
        answer:
          'Struggled with finishing my project on time. Had to work late but finally pushed through. Feeling tired but accomplished.',
        icon: 'leaf',
        moodColor: theme.colors.mood.reflective,
      },
      {
        id: '3',
        number: 3,
        question: 'I feel most grateful for...',
        answer:
          'My supportive family and their patience while I work on this big project. They believe in me even when I doubt myself.',
        icon: 'heart',
        moodColor: theme.colors.mood.peaceful,
      },
    ],
  },
  {
    id: '2',
    date: 'October 28, 2024',
    dayOfWeek: 'Monday',
    prompts: [
      {
        id: '1',
        number: 1,
        question: 'What brought you a moment of joy today?',
        answer: 'Started the day with a workout. Feeling energized and motivated.',
        icon: 'star',
        moodColor: theme.colors.mood.happy,
      },
      {
        id: '4',
        number: 4,
        question: 'One thing I learned about myself is...',
        answer:
          'I learn better in a structured environment. Realized I need more organization to be productive.',
        icon: 'lightbulb',
        moodColor: theme.colors.mood.productive,
      },
      {
        id: '5',
        number: 5,
        question: 'What is a goal I can work towards tomorrow?',
        answer: 'Complete the design phase of my project and start implementation.',
        icon: 'zap',
        moodColor: theme.colors.mood.excited,
      },
    ],
  },
  {
    id: '3',
    date: 'October 27, 2024',
    dayOfWeek: 'Sunday',
    prompts: [
      {
        id: '1',
        number: 1,
        question: 'What brought you a moment of joy today?',
        answer:
          'Spent the day outdoors with family. The weather was perfect and we just enjoyed being together.',
        icon: 'star',
        moodColor: theme.colors.mood.happy,
      },
      {
        id: '2',
        number: 2,
        question: 'A challenge I faced was...',
        answer: 'Nothing major today. It was a peaceful, relaxing day.',
        icon: 'leaf',
        moodColor: theme.colors.mood.reflective,
      },
    ],
  },
];

export default function PromptsHistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scaleAnim = new Animated.Value(1);

  const handleBack = () => {
    router.back();
  };

  const toggleExpand = (promptId: string) => {
    setExpandedId(expandedId === promptId ? null : promptId);
    Animated.spring(scaleAnim, {
      toValue: expandedId === promptId ? 1 : 1.02,
      useNativeDriver: true,
      speed: 16,
      bounciness: 8,
    }).start();
  };

  const renderIcon = (iconName: string) => {
    const iconProps = {
      size: 20,
      color: theme.colors.neutral.black,
      strokeWidth: 2,
    };

    switch (iconName) {
      case 'star':
        return <Star {...iconProps} />;
      case 'leaf':
        return <Leaf {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  // Filter prompts based on search query
  const filteredHistory = MOCK_PROMPTS_HISTORY.filter((dayEntry) =>
    dayEntry.prompts.some(
      (prompt) =>
        prompt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalAnswers = MOCK_PROMPTS_HISTORY.reduce(
    (acc, day) => acc + day.prompts.length,
    0
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.neutral.beige }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary.main }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ChevronLeft
            size={24}
            color={theme.colors.neutral.black}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.neutral.black }]}>
            Prompts History
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.neutral.gray[600] }]}>
            {totalAnswers} answers saved
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.colors.neutral.white,
              borderColor: searchQuery ? theme.colors.primary.main : '#E5E7EB',
            },
          ]}
        >
          <Search
            size={18}
            color={
              searchQuery ? theme.colors.primary.main : theme.colors.neutral.gray[400]
            }
            strokeWidth={2}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.neutral.black }]}
            placeholder="Search your answers..."
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {filteredHistory.length > 0 ? (
          filteredHistory.map((dayEntry) => (
            <View key={dayEntry.id} style={styles.daySection}>
              {/* Date Header */}
              <View style={styles.dateHeader}>
                <Calendar
                  size={16}
                  color={theme.colors.primary.main}
                  strokeWidth={2}
                />
                <View style={styles.dateInfo}>
                  <Text style={[styles.dateText, { color: theme.colors.neutral.black }]}>
                    {dayEntry.date}
                  </Text>
                  <Text style={[styles.dayText, { color: theme.colors.neutral.gray[500] }]}>
                    {dayEntry.dayOfWeek}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.answerCount,
                    { color: theme.colors.primary.main, backgroundColor: `${theme.colors.primary.main}15` },
                  ]}
                >
                  {dayEntry.prompts.length}
                </Text>
              </View>

              {/* Prompts for this day */}
              <View style={styles.promptsList}>
                {dayEntry.prompts.map((prompt) => (
                  <Animated.View
                    key={prompt.id}
                    style={[
                      styles.promptCardWrapper,
                      { transform: [{ scale: scaleAnim }] },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.promptCard,
                        {
                          backgroundColor: `${prompt.moodColor}20`,
                          borderColor: `${prompt.moodColor}40`,
                        },
                      ]}
                      onPress={() => toggleExpand(prompt.id)}
                      activeOpacity={0.7}
                    >
                      {/* Prompt Header */}
                      <View style={styles.promptHeader}>
                        <View style={styles.promptTitleSection}>
                          <View
                            style={[
                              styles.iconContainer,
                              { backgroundColor: `${prompt.moodColor}40` },
                            ]}
                          >
                            {renderIcon(prompt.icon)}
                          </View>
                          <View style={styles.titleContainer}>
                            <Text
                              style={[
                                styles.promptNumber,
                                { color: theme.colors.neutral.gray[500] },
                              ]}
                            >
                              Prompt {prompt.number}
                            </Text>
                            <Text
                              style={[styles.promptQuestion, { color: theme.colors.neutral.black }]}
                              numberOfLines={expandedId === prompt.id ? undefined : 2}
                            >
                              {prompt.question}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Answer Preview / Full Answer */}
                      {expandedId === prompt.id ? (
                        <View style={styles.fullAnswer}>
                          <Text
                            style={[styles.answerText, { color: theme.colors.neutral.black }]}
                          >
                            {prompt.answer}
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={[styles.answerPreview, { color: theme.colors.neutral.gray[600] }]}
                          numberOfLines={2}
                        >
                          {prompt.answer}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateIcon, { color: theme.colors.primary.main }]}>
              📝
            </Text>
            <Text style={[styles.emptyStateTitle, { color: theme.colors.neutral.black }]}>
              No answers found
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: theme.colors.neutral.gray[500] }]}>
              Your answered prompts will appear here
            </Text>
          </View>
        )}

        {/* Spacer */}
        <View style={{ height: theme.spacing[6] }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="mood" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: theme.spacing[2],
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    marginBottom: theme.spacing[1],
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    gap: theme.spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    paddingBottom: 120, // Space for bottom nav
  },
  daySection: {
    marginBottom: theme.spacing[5],
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    marginBottom: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary.main}10`,
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}25`,
  },
  dateInfo: {
    flex: 1,
    marginLeft: theme.spacing[3],
  },
  dateText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    marginBottom: theme.spacing[1],
  },
  dayText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '400',
  },
  answerCount: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    overflow: 'hidden',
  },
  promptsList: {
    gap: theme.spacing[3],
  },
  promptCardWrapper: {
    width: '100%',
  },
  promptCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    borderWidth: 2,
  },
  promptHeader: {
    marginBottom: theme.spacing[3],
  },
  promptTitleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[3],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  titleContainer: {
    flex: 1,
  },
  promptNumber: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    marginBottom: theme.spacing[1],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptQuestion: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 20,
  },
  answerPreview: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 18,
  },
  fullAnswer: {
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  answerText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing[12],
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing[4],
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    marginBottom: theme.spacing[2],
  },
  emptyStateSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
  },
});
