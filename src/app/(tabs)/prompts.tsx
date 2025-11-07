/**
 * Prompts / Daily Reflection Screen
 *
 * Pre-defined journal questions for daily reflection
 * Features:
 * - 5 daily reflection prompts with colorful icons
 * - Answer tracking with completion status
 * - Smooth spring animations
 * - Tailwind CSS styling with global colors/fonts
 * - Save entry functionality
 * - View previous prompt answers
 *
 * Design: Clean, modern with Tailwind styling
 * Colors: Global Tailwind colors (peach, coral, mint, lavender)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Star, Leaf, Heart, Lightbulb, Zap, History } from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';

interface Prompt {
  id: string;
  number: number;
  question: string;
  icon: 'star' | 'leaf' | 'heart' | 'lightbulb' | 'zap';
  placeholder: string;
  bgColor: string;
  answered: boolean;
  answer: string;
}

const DAILY_PROMPTS: Prompt[] = [
  {
    id: '1',
    number: 1,
    question: 'What brought you a moment of joy today?',
    icon: 'star',
    placeholder: 'Describe that joyful moment...',
    bgColor: '#FFB89A', // peach (Tailwind: peach)
    answered: false,
    answer: '',
  },
  {
    id: '2',
    number: 2,
    question: 'A challenge I faced was...',
    icon: 'leaf',
    placeholder: 'Share the challenge and how you handled it...',
    bgColor: '#7DD3B0', // mint (Tailwind: mint)
    answered: false,
    answer: '',
  },
  {
    id: '3',
    number: 3,
    question: 'I feel most grateful for...',
    icon: 'heart',
    placeholder: 'Express your gratitude...',
    bgColor: '#FF6B5A', // coral (Tailwind: coral)
    answered: false,
    answer: '',
  },
  {
    id: '4',
    number: 4,
    question: 'One thing I learned about myself is...',
    icon: 'lightbulb',
    placeholder: 'Reflect on your discovery...',
    bgColor: '#D4B5F0', // lavender (Tailwind: lavender)
    answered: false,
    answer: '',
  },
  {
    id: '5',
    number: 5,
    question: 'What is a goal I can work towards tomorrow?',
    icon: 'zap',
    placeholder: 'Set an intention for tomorrow...',
    bgColor: '#FF9F7F', // peach-dark (Tailwind: peach-dark)
    answered: false,
    answer: '',
  },
];

// Individual Prompt Card with Animations
function PromptCard({
  prompt,
  isExpanded,
  onToggle,
  onUpdateAnswer,
}: {
  prompt: Prompt;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateAnswer: (text: string) => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isExpanded ? 1 : 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(fadeAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isExpanded, scaleAnim, fadeAnim]);

  const renderIcon = (iconName: string, bgColor: string) => {
    const iconProps = {
      size: 26,
      color: '#FFFFFF',
      strokeWidth: 2.5,
    };

    let IconComponent;
    switch (iconName) {
      case 'star':
        IconComponent = Star;
        break;
      case 'leaf':
        IconComponent = Leaf;
        break;
      case 'heart':
        IconComponent = Heart;
        break;
      case 'lightbulb':
        IconComponent = Lightbulb;
        break;
      case 'zap':
        IconComponent = Zap;
        break;
      default:
        IconComponent = Star;
    }

    return (
      <View
        className="w-14 h-14 rounded-2xl justify-center items-center shadow-md"
        style={{ backgroundColor: bgColor }}
      >
        <IconComponent {...iconProps} />
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        className={`bg-white rounded-3xl p-5 mb-4 shadow-lg ${
          isExpanded ? 'border-2 border-coral' : 'border-0'
        }`}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        {/* Prompt Header */}
        <View className="flex-row items-center gap-4 mb-3">
          {renderIcon(prompt.icon, prompt.bgColor)}

          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                <Text className="font-sans text-xs font-bold text-gray-600">
                  Q{prompt.number}
                </Text>
              </View>
              {prompt.answered && (
                <View className="bg-green-500 px-2 py-0.5 rounded-full flex-row items-center gap-1">
                  <Text className="text-white text-xs font-bold">✓ Done</Text>
                </View>
              )}
            </View>
            <Text className="font-sans text-base font-bold text-gray-800 leading-5">
              {prompt.question}
            </Text>
          </View>

          {/* Expand Indicator */}
          <View className={`w-8 h-8 rounded-full bg-gray-100 justify-center items-center ${isExpanded ? 'rotate-180' : ''}`}>
            <Text className="text-gray-600 text-lg font-bold">{isExpanded ? '−' : '+'}</Text>
          </View>
        </View>

        {/* Expandable Content */}
        {isExpanded && (
          <Animated.View
            className="mt-2"
            style={{ opacity: fadeAnim }}
          >
            <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <TextInput
                className="font-sans text-base text-gray-800 min-h-[140px]"
                placeholder={prompt.placeholder}
                placeholderTextColor="#9CA3AF"
                value={prompt.answer}
                onChangeText={onUpdateAnswer}
                multiline
                textAlignVertical="top"
                maxLength={500}
              />
            </View>
            <View className="flex-row justify-between items-center mt-2 px-1">
              <Text className="font-sans text-xs text-gray-400 italic">
                💭 Be honest with yourself
              </Text>
              <Text className="font-sans text-xs font-semibold text-gray-500">
                {prompt.answer.length}/500
              </Text>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function PromptsScreen() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>(DAILY_PROMPTS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const togglePromptExpand = (promptId: string) => {
    setExpandedId(expandedId === promptId ? null : promptId);
  };

  const handleUpdateAnswer = (promptId: string, text: string) => {
    setPrompts(
      prompts.map((p) =>
        p.id === promptId ? { ...p, answer: text, answered: text.trim().length > 0 } : p
      )
    );
  };

  const handleSaveEntry = () => {
    const answeredPrompts = prompts.filter((p) => p.answered);
    console.log('Saving prompts:', answeredPrompts);
    // TODO: Call API to save prompts
    router.push('/(tabs)/home');
  };

  const answeredCount = prompts.filter((p) => p.answered).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Gradient Feel */}
      <View className="bg-gradient-to-r from-peach-light to-lavender-light px-5 py-4">
        <View className="flex-row items-center justify-between mb-3">
          <TouchableOpacity
            className="w-10 h-10 bg-white/40 rounded-xl justify-center items-center"
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#1F2937" strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 bg-white/40 rounded-xl justify-center items-center"
            onPress={() => router.push('/(tabs)/prompts-history')}
            activeOpacity={0.7}
          >
            <History size={20} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="font-sans text-sm font-medium text-gray-600 mb-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Text className="font-sans text-2xl font-extrabold text-gray-800 mb-2">
            Daily Reflection
          </Text>

          {/* Progress Bar */}
          <View className="flex-row items-center gap-2">
            <View className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
              <View
                className="h-full bg-coral rounded-full"
                style={{ width: `${(answeredCount / prompts.length) * 100}%` }}
              />
            </View>
            <Text className="font-sans text-xs font-bold text-gray-700">
              {answeredCount}/{prompts.length}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Motivational Message */}
        {answeredCount === 0 && (
          <View className="bg-gradient-to-r from-peach-light/30 to-mint-light/30 rounded-3xl p-5 mb-5">
            <Text className="font-sans text-lg font-bold text-gray-800 mb-1">
              ✨ Start Your Reflection
            </Text>
            <Text className="font-sans text-sm text-gray-600 leading-5">
              Take a moment to connect with yourself. Each answer brings you closer to self-discovery.
            </Text>
          </View>
        )}

        {answeredCount > 0 && answeredCount < prompts.length && (
          <View className="bg-mint-light/20 rounded-3xl p-4 mb-5">
            <Text className="font-sans text-sm font-semibold text-gray-700">
              🎯 Keep going! You're doing great.
            </Text>
          </View>
        )}

        {/* Prompts List */}
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            isExpanded={expandedId === prompt.id}
            onToggle={() => togglePromptExpand(prompt.id)}
            onUpdateAnswer={(text) => handleUpdateAnswer(prompt.id, text)}
          />
        ))}
      </ScrollView>

      {/* Floating Save Button */}
      <View className="absolute bottom-20 left-0 right-0 px-5 pb-3">
        <TouchableOpacity
          className={`h-14 rounded-2xl justify-center items-center shadow-2xl ${
            answeredCount > 0
              ? 'bg-coral'
              : 'bg-gray-300'
          }`}
          onPress={handleSaveEntry}
          activeOpacity={0.9}
          disabled={answeredCount === 0}
        >
          <Text
            className={`font-sans text-base font-bold ${
              answeredCount > 0 ? 'text-white' : 'text-gray-500'
            }`}
          >
            {answeredCount === 0
              ? 'Start Answering'
              : answeredCount === prompts.length
              ? '✓ Save All Answers'
              : `Save Progress (${answeredCount}/${prompts.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="prompts" />
    </SafeAreaView>
  );
}
