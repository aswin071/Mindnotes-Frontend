/**
 * Prompts / Daily Reflection Screen
 *
 * Displays daily prompts for users to answer and reflect
 * Features:
 * - 5 daily reflection prompts with playful icons
 * - Answer tracking with completion status
 * - Smooth animations and interactions
 * - Responsive design for all mobile devices
 * - Save entry functionality
 * - View previous prompt answers
 *
 * Design: Playful, inviting, and encouraging reflection
 * Colors: From global theme with mood colors for variety
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
import { ChevronLeft, Star, Leaf, Heart, Lightbulb, Zap, History } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

interface Prompt {
  id: string;
  number: number;
  question: string;
  icon: 'star' | 'leaf' | 'heart' | 'lightbulb' | 'zap';
  placeholder: string;
  moodColor: string;
  answered: boolean;
  answer: string;
}

const DAILY_PROMPTS: Prompt[] = [
  {
    id: '1',
    number: 1,
    question: 'What brought you a moment of joy today?',
    icon: 'star',
    placeholder: 'Write your thoughts here...',
    moodColor: theme.colors.mood.happy,
    answered: false,
    answer: '',
  },
  {
    id: '2',
    number: 2,
    question: 'A challenge I faced was...',
    icon: 'leaf',
    placeholder: 'Write your thoughts here...',
    moodColor: theme.colors.mood.reflective,
    answered: false,
    answer: '',
  },
  {
    id: '3',
    number: 3,
    question: 'I feel most grateful for...',
    icon: 'heart',
    placeholder: 'Write your thoughts here...',
    moodColor: theme.colors.mood.peaceful,
    answered: false,
    answer: '',
  },
  {
    id: '4',
    number: 4,
    question: 'One thing I learned about myself is...',
    icon: 'lightbulb',
    placeholder: 'Write your thoughts here...',
    moodColor: theme.colors.mood.productive,
    answered: false,
    answer: '',
  },
  {
    id: '5',
    number: 5,
    question: 'What is a goal I can work towards tomorrow?',
    icon: 'zap',
    placeholder: 'Write your thoughts here...',
    moodColor: theme.colors.mood.excited,
    answered: false,
    answer: '',
  },
];

export default function PromptsScreen() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>(DAILY_PROMPTS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scaleAnims = prompts.reduce((acc, prompt) => {
    acc[prompt.id] = new Animated.Value(1);
    return acc;
  }, {} as Record<string, Animated.Value>);

  const handleBack = () => {
    router.back();
  };

  const togglePromptExpand = (promptId: string) => {
    const anim = scaleAnims[promptId];
    if (expandedId === promptId) {
      Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 16,
        bounciness: 8,
      }).start();
      setExpandedId(null);
    } else {
      Animated.spring(anim, {
        toValue: 1.02,
        useNativeDriver: true,
        speed: 16,
        bounciness: 8,
      }).start();
      setExpandedId(promptId);
    }
  };

  const handleUpdateAnswer = (promptId: string, text: string) => {
    setPrompts(prompts.map((p) =>
      p.id === promptId ? { ...p, answer: text, answered: text.trim().length > 0 } : p
    ));
  };

  const handleSaveEntry = () => {
    const answeredPrompts = prompts.filter((p) => p.answered);
    console.log('Saving prompts:', answeredPrompts);
    // TODO: Call API to save prompts
    router.push('/(tabs)/home');
  };

  const answeredCount = prompts.filter((p) => p.answered).length;

  const renderIcon = (iconName: string) => {
    const iconProps = {
      size: 24,
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
          <Text style={[styles.headerDate, { color: theme.colors.neutral.black }]}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <View style={styles.progressBadge}>
            <Text style={[styles.progressText, { color: theme.colors.neutral.black }]}>
              {answeredCount}/{prompts.length}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push('/(tabs)/prompts-history')}
          activeOpacity={0.7}
        >
          <History
            size={24}
            color={theme.colors.neutral.black}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Main Headline */}
        <View style={styles.headlineSection}>
          <Text style={[styles.headline, { color: theme.colors.neutral.black }]}>
            Reflect on your day...
          </Text>
          <Text style={[styles.subheadline, { color: theme.colors.neutral.gray[500] }]}>
            Answer the prompts below to capture your thoughts and emotions
          </Text>
        </View>

        {/* Prompts Grid */}
        <View style={styles.promptsContainer}>
          {prompts.map((prompt) => (
            <Animated.View
              key={prompt.id}
              style={[
                styles.promptCardWrapper,
                {
                  transform: [{ scale: scaleAnims[prompt.id] }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.promptCard,
                  {
                    backgroundColor: theme.colors.neutral.white,
                    borderColor: expandedId === prompt.id ? theme.colors.primary.main : '#E5E7EB',
                    borderWidth: expandedId === prompt.id ? 2 : 1,
                  },
                ]}
                onPress={() => togglePromptExpand(prompt.id)}
                activeOpacity={0.7}
              >
                {/* Prompt Header - Always Visible */}
                <View style={styles.promptHeader}>
                  <View style={styles.iconAndQuestion}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${prompt.moodColor}80` },
                      ]}
                    >
                      {renderIcon(prompt.icon)}
                    </View>
                    <View style={styles.questionSection}>
                      <Text style={[styles.promptNumber, { color: theme.colors.neutral.gray[500] }]}>
                        {prompt.number}
                      </Text>
                      <Text
                        style={[styles.promptQuestion, { color: theme.colors.neutral.black }]}
                        numberOfLines={expandedId === prompt.id ? undefined : 2}
                      >
                        {prompt.question}
                      </Text>
                    </View>
                  </View>

                  {/* Answered Status Indicator */}
                  {prompt.answered && (
                    <View
                      style={[
                        styles.checkmarkBadge,
                        { backgroundColor: theme.colors.status.success },
                      ]}
                    >
                      <Text style={[styles.checkmark, { color: theme.colors.neutral.white }]}>
                        ✓
                      </Text>
                    </View>
                  )}
                </View>

                {/* Expandable Content */}
                {expandedId === prompt.id && (
                  <View style={styles.promptContent}>
                    <TextInput
                      style={[
                        styles.textarea,
                        {
                          color: theme.colors.neutral.black,
                          borderColor: theme.colors.neutral.gray[200],
                        },
                      ]}
                      placeholder={prompt.placeholder}
                      placeholderTextColor={theme.colors.neutral.gray[400]}
                      value={prompt.answer}
                      onChangeText={(text) => handleUpdateAnswer(prompt.id, text)}
                      multiline
                      textAlignVertical="top"
                      maxLength={500}
                    />
                    <Text style={[styles.charCount, { color: theme.colors.neutral.gray[400] }]}>
                      {prompt.answer.length}/500
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Spacer for bottom button */}
        <View style={{ height: theme.spacing[6] }} />
      </ScrollView>

      {/* Floating Save Button */}
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.neutral.beige }]}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor:
                answeredCount > 0 ? theme.colors.primary.main : theme.colors.neutral.gray[300],
            },
          ]}
          onPress={handleSaveEntry}
          activeOpacity={0.85}
          disabled={answeredCount === 0}
        >
          <Text
            style={[
              styles.saveButtonText,
              {
                color: answeredCount > 0 ? theme.colors.neutral.black : theme.colors.neutral.gray[500],
              },
            ]}
          >
            Save Entry {answeredCount > 0 ? `(${answeredCount} answered)` : ''}
          </Text>
        </TouchableOpacity>
      </View>

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
  historyButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: theme.spacing[2],
  },
  headerDate: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBadge: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
    backgroundColor: `${theme.colors.primary.main}30`,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  progressText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    paddingBottom: 200, // Space for bottom button and nav
  },
  headlineSection: {
    marginBottom: theme.spacing[6],
  },
  headline: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: theme.spacing[2],
  },
  subheadline: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 20,
  },
  promptsContainer: {
    gap: theme.spacing[3],
  },
  promptCardWrapper: {
    width: '100%',
  },
  promptCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    overflow: 'hidden',
    ...theme.shadows.base,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconAndQuestion: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[3],
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  questionSection: {
    flex: 1,
  },
  promptNumber: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptQuestion: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 22,
  },
  checkmarkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing[2],
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '700',
  },
  promptContent: {
    marginTop: theme.spacing[4],
    paddingTop: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  textarea: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    fontSize: theme.typography.fontSize.base,
    fontWeight: '400',
    minHeight: 120,
    maxHeight: 200,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '400',
    marginTop: theme.spacing[2],
    textAlign: 'right',
  },
  bottomBar: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    height: 56,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
