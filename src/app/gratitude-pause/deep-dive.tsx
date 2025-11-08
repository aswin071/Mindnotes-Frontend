/**
 * Gratitude Pause - Deep Dive
 *
 * Select one gratitude item and answer 5 prompts
 * Timer: 2:00 - 4:15 (2 minutes 15 seconds, ~25s each)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Heart } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PROMPTS = [
  {
    id: 'precise',
    title: 'Name it precisely',
    question: 'What exactly are you grateful for? One sentence.',
    placeholder: 'Be specific about what you appreciate...',
  },
  {
    id: 'why',
    title: 'Why it matters (today)',
    question: 'How did this help your day, mood, or stress?',
    placeholder: 'Describe the impact it had...',
  },
  {
    id: 'who',
    title: 'Who/what made it possible',
    question: 'Is there a person or factor to appreciate?',
    placeholder: 'Who or what enabled this...',
  },
  {
    id: 'sensory',
    title: 'Replay a moment (sensory)',
    question: 'Close your eyes: what did you see/hear/feel?',
    placeholder: 'Describe the sensory details...',
  },
  {
    id: 'complete',
    title: 'Gratitude line',
    question: "Complete: I'm grateful for ___ because ___.",
    placeholder: "I'm grateful for... because...",
  },
];

export default function GratitudeDeepDive() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const items: string[] = params.items ? JSON.parse(params.items as string) : [];

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentPrompt = PROMPTS[currentPromptIndex];
  const isLastPrompt = currentPromptIndex === PROMPTS.length - 1;

  // Selection Screen
  if (!selectedItem) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 pt-8 pb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-full bg-peach-light items-center justify-center mb-4">
              <Heart size={32} color="#FFB89A" strokeWidth={2} />
            </View>

            <Text className="font-sans text-3xl font-bold text-gray-900 mb-3 text-center">
              Deep Dive on One
            </Text>

            <Text className="font-sans text-base text-gray-600 text-center">
              Choose one gratitude to explore deeply
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6">
          <View className="space-y-3 mb-6">
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-2xl p-5 shadow-sm flex-row items-center justify-between"
                activeOpacity={0.8}
                onPress={() => setSelectedItem(item)}
              >
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="w-6 h-6 rounded-full bg-peach-light items-center justify-center">
                      <Text className="font-sans text-xs font-bold text-peach">
                        {index + 1}
                      </Text>
                    </View>
                    <Text className="font-sans text-xs font-semibold text-gray-500">
                      I'm grateful for
                    </Text>
                  </View>
                  <Text className="font-sans text-lg font-semibold text-gray-900">
                    {item}
                  </Text>
                </View>

                <ChevronRight size={24} color="#FFB89A" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Deep Dive Prompts Screen
  const handleNext = () => {
    const currentAnswer = answers[currentPrompt.id] || '';

    if (currentAnswer.trim()) {
      if (isLastPrompt) {
        // Navigate to express screen
        router.push({
          pathname: '/gratitude-pause/express',
          params: {
            selectedItem,
            gratitudeLine: answers.complete || currentAnswer,
          },
        });
      } else {
        setCurrentPromptIndex(currentPromptIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
    } else {
      setSelectedItem(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header with Progress */}
        <View className="px-6 pt-4 pb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-sans text-sm font-semibold text-gray-500">
              Deep Dive
            </Text>
            <Text className="font-sans text-sm font-semibold text-peach">
              {currentPromptIndex + 1} / {PROMPTS.length}
            </Text>
          </View>

          {/* Progress Dots */}
          <View className="flex-row items-center gap-2 mb-4">
            {PROMPTS.map((_, index) => (
              <View
                key={index}
                className={`flex-1 h-1.5 rounded-full ${
                  index <= currentPromptIndex ? 'bg-peach' : 'bg-gray-200'
                }`}
              />
            ))}
          </View>

          {/* Selected Item */}
          <View className="bg-peach-light rounded-2xl p-4">
            <Text className="font-sans text-xs font-semibold text-peach mb-1">
              Exploring:
            </Text>
            <Text className="font-sans text-base font-bold text-brown">
              {selectedItem}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          {/* Prompt Card */}
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <View className="mb-4">
              <Text className="font-sans text-sm font-semibold text-peach mb-2">
                {currentPrompt.title}
              </Text>
              <Text className="font-sans text-xl font-bold text-gray-900">
                {currentPrompt.question}
              </Text>
            </View>

            {/* Text Input */}
            <TextInput
              className="font-sans text-base text-gray-900 bg-gray-50 rounded-xl p-4 min-h-[120px]"
              placeholder={currentPrompt.placeholder}
              placeholderTextColor="#9CA3AF"
              value={answers[currentPrompt.id] || ''}
              onChangeText={(text) =>
                setAnswers({ ...answers, [currentPrompt.id]: text })
              }
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {/* Instruction for Sensory Prompt */}
          {currentPrompt.id === 'sensory' && (
            <View className="bg-mint-light rounded-2xl p-4 mb-6">
              <Text className="font-sans text-xs font-semibold text-mint mb-2">
                💡 Take a moment
              </Text>
              <Text className="font-sans text-xs text-gray-700">
                Close your eyes for a few seconds. Visualize the moment. What colors, sounds, or feelings come up?
              </Text>
            </View>
          )}

          {/* Time Estimate */}
          <View className="items-center mb-6">
            <Text className="font-sans text-xs text-gray-500">
              ~25 seconds per prompt
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-gray-100 rounded-full py-4"
              activeOpacity={0.8}
              onPress={handleBack}
            >
              <Text className="font-sans text-base font-semibold text-gray-600 text-center">
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 rounded-full py-4 ${
                answers[currentPrompt.id]?.trim() ? 'bg-peach' : 'bg-gray-300'
              }`}
              activeOpacity={0.8}
              onPress={handleNext}
              disabled={!answers[currentPrompt.id]?.trim()}
            >
              <Text className="font-sans text-base font-bold text-white text-center">
                {isLastPrompt ? 'Continue' : 'Next →'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
