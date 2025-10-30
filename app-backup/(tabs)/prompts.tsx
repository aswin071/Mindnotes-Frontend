import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lightbulb, ArrowRight, Shuffle } from 'lucide-react-native';
import { router } from 'expo-router';

const dailyPrompts = [
  {
    id: 1,
    category: 'Gratitude',
    question: 'What are three things you\'re genuinely grateful for today, and why do they matter to you?',
    color: 'bg-green-50 border-green-200',
    iconColor: '#10B981'
  },
  {
    id: 2,
    category: 'Growth',
    question: 'What challenge are you currently facing, and what is it teaching you about yourself?',
    color: 'bg-blue-50 border-blue-200',
    iconColor: '#3B82F6'
  },
  {
    id: 3,
    category: 'Reflection',
    question: 'If you could give your past self one piece of advice, what would it be and why?',
    color: 'bg-purple-50 border-purple-200',
    iconColor: '#8B5CF6'
  },
  {
    id: 4,
    category: 'Mindfulness',
    question: 'How are you feeling right now, both physically and emotionally? What does your body need?',
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: '#F59E0B'
  },
  {
    id: 5,
    category: 'Purpose',
    question: 'What small action can you take today that aligns with your values and long-term goals?',
    color: 'bg-red-50 border-red-200',
    iconColor: '#EF4444'
  }
];

export default function PromptsScreen() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);

  const shufflePrompts = () => {
    // In a real app, this would shuffle the prompts or fetch new ones
    console.log('Shuffling prompts...');
  };

  const handlePromptSelect = (promptId: number) => {
    const prompt = dailyPrompts.find(p => p.id === promptId);
    if (prompt) {
      router.push({
        pathname: '/create-entry',
        params: {
          type: 'prompt',
          promptId: promptId,
          promptQuestion: prompt.question,
          promptCategory: prompt.category
        }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header - Mobile Optimized */}
        <View className="px-5 pt-2 pb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl font-bold text-black">Daily Prompts</Text>
            <TouchableOpacity
              onPress={shufflePrompts}
              className="bg-gray-100 rounded-full p-3 active:bg-gray-200"
              activeOpacity={0.7}
            >
              <Shuffle color="#374151" size={22} />
            </TouchableOpacity>
          </View>
          <Text className="text-base text-gray-600 leading-relaxed">
            Thoughtful questions to inspire meaningful reflection
          </Text>
        </View>

        {/* Today's Featured Prompt - Better touch target */}
        <View className="px-5 mb-8">
          <Text className="text-xl font-semibold text-black mb-5">Today's Featured</Text>
          <TouchableOpacity
            onPress={() => handlePromptSelect(dailyPrompts[0].id)}
            className={`${dailyPrompts[0].color} rounded-3xl p-6 border-2 active:opacity-90`}
            activeOpacity={0.95}
          >
            <View className="flex-row items-start justify-between mb-5">
              <View className="flex-1 pr-3">
                <View className="flex-row items-center mb-3">
                  <Lightbulb color={dailyPrompts[0].iconColor} size={22} />
                  <Text className="text-base font-bold ml-2" style={{ color: dailyPrompts[0].iconColor }}>
                    {dailyPrompts[0].category}
                  </Text>
                </View>
                <Text className="text-black text-lg font-semibold leading-relaxed">
                  {dailyPrompts[0].question}
                </Text>
              </View>
              <ArrowRight color="#374151" size={24} />
            </View>
            <View className="bg-white/60 rounded-xl px-4 py-2 self-start">
              <Text className="text-sm font-semibold text-gray-700">Tap to reflect</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* All Prompts - Mobile optimized cards */}
        <View className="px-5 mb-6">
          <Text className="text-xl font-bold text-black mb-5">All Prompts</Text>
          <View>
            {dailyPrompts.map((prompt, index) => (
              <TouchableOpacity
                key={prompt.id}
                onPress={() => handlePromptSelect(prompt.id)}
                className={`${prompt.color} rounded-2xl p-6 border-2 active:opacity-90 ${
                  index < dailyPrompts.length - 1 ? 'mb-4' : ''
                }`}
                activeOpacity={0.95}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <View className="flex-row items-center mb-3">
                      <Lightbulb color={prompt.iconColor} size={20} />
                      <Text className="text-base font-bold ml-2" style={{ color: prompt.iconColor }}>
                        {prompt.category}
                      </Text>
                    </View>
                    <Text className="text-black font-semibold text-base leading-relaxed">
                      {prompt.question}
                    </Text>
                  </View>
                  <ArrowRight color="#9CA3AF" size={22} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips Section - Better mobile readability */}
        <View className="px-5 mb-6">
          <View className="bg-gray-50 rounded-3xl p-6 border-2 border-gray-200">
            <Text className="text-xl font-bold text-black mb-5">💡 Reflection Tips</Text>
            <View>
              <Text className="text-gray-700 text-base leading-relaxed mb-3">
                • Take your time - there's no rush to answer perfectly
              </Text>
              <Text className="text-gray-700 text-base leading-relaxed mb-3">
                • Be honest with yourself - authenticity leads to growth
              </Text>
              <Text className="text-gray-700 text-base leading-relaxed mb-3">
                • Write freely - don't worry about grammar or structure
              </Text>
              <Text className="text-gray-700 text-base leading-relaxed">
                • Come back later - your perspective might evolve
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
