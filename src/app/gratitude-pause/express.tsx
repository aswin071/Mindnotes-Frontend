/**
 * Gratitude Pause - Express It Now
 *
 * Choose a quick action to express gratitude
 * Timer: 4:15 - 4:45 (30 seconds)
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, FileText, Gift, Bell, Check } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ACTIONS = [
  {
    id: 'text',
    icon: MessageCircle,
    title: 'Send a thank-you text',
    description: 'Message someone who made a difference',
    color: '#7DD3B0',
    bg: '#B8E6D5',
  },
  {
    id: 'note',
    icon: FileText,
    title: 'Leave a kind note',
    description: 'Write a note of appreciation',
    color: '#FFB89A',
    bg: '#FFD4C4',
  },
  {
    id: 'act',
    icon: Gift,
    title: 'Do a tiny helpful act',
    description: 'Show gratitude through action',
    color: '#D4B5F0',
    bg: '#E8D4F8',
  },
  {
    id: 'reminder',
    icon: Bell,
    title: 'Set reminder to say thanks later',
    description: 'Schedule a moment to express gratitude',
    color: '#FF6B5A',
    bg: '#FFD4C4',
  },
];

export default function GratitudeExpress() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selectedItem = params.selectedItem as string;
  const gratitudeLine = params.gratitudeLine as string;

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);
    // Show checkmark animation
    setTimeout(() => {
      setIsCompleted(true);
    }, 300);
  };

  const handleContinue = () => {
    router.push({
      pathname: '/gratitude-pause/anchor',
      params: {
        selectedItem,
        gratitudeLine,
        action: selectedAction || 'none',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-8 pb-6">
        <Text className="font-sans text-3xl font-bold text-gray-900 mb-3">
          Express It Now
        </Text>
        <Text className="font-sans text-base text-gray-600">
          Choose one quick action to express your gratitude
        </Text>

        {/* Timer */}
        <View className="mt-4 bg-peach-light rounded-full px-4 py-2 self-start">
          <Text className="font-sans text-xs font-semibold text-peach">
            ⏱ 30 seconds
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Quote Card */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6 border-l-4 border-peach">
          <Text className="font-sans text-xs font-semibold text-gray-500 mb-2">
            Your Gratitude Line:
          </Text>
          <Text className="font-sans text-lg font-bold text-gray-900 italic">
            "{gratitudeLine}"
          </Text>
        </View>

        {/* Action Options */}
        <View className="space-y-3 mb-6">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const isSelected = selectedAction === action.id;

            return (
              <TouchableOpacity
                key={action.id}
                className={`rounded-2xl p-5 ${
                  isSelected ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{
                  backgroundColor: isSelected ? action.bg : '#FFFFFF',
                  borderWidth: isSelected ? 2 : 0,
                  borderColor: action.color,
                }}
                activeOpacity={0.8}
                onPress={() => handleActionSelect(action.id)}
                disabled={isCompleted && !isSelected}
              >
                <View className="flex-row items-center gap-4">
                  {/* Icon */}
                  <View
                    className="w-14 h-14 rounded-full items-center justify-center"
                    style={{ backgroundColor: isSelected ? action.color : action.bg }}
                  >
                    {isCompleted && isSelected ? (
                      <Check size={28} color="#FFFFFF" strokeWidth={3} />
                    ) : (
                      <Icon
                        size={24}
                        color={isSelected ? '#FFFFFF' : action.color}
                        strokeWidth={2}
                      />
                    )}
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <Text
                      className={`font-sans text-base font-bold mb-1 ${
                        isSelected ? 'text-gray-900' : 'text-gray-900'
                      }`}
                    >
                      {action.title}
                    </Text>
                    <Text className="font-sans text-sm text-gray-600">
                      {action.description}
                    </Text>
                  </View>

                  {/* Checkmark */}
                  {isCompleted && isSelected && (
                    <View className="w-8 h-8 rounded-full bg-mint items-center justify-center">
                      <Check size={18} color="#FFFFFF" strokeWidth={3} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Completion Message */}
        {isCompleted && (
          <View className="bg-mint-light rounded-2xl p-5 mb-6">
            <View className="flex-row items-center gap-2 mb-2">
              <Check size={20} color="#7DD3B0" strokeWidth={3} />
              <Text className="font-sans text-base font-bold text-mint">
                Action Selected! ✓
              </Text>
            </View>
            <Text className="font-sans text-sm text-gray-700">
              Great choice! Remember to follow through when you can.
            </Text>
          </View>
        )}

        {/* Skip Option */}
        {!isCompleted && (
          <TouchableOpacity
            className="py-4"
            activeOpacity={0.7}
            onPress={() => {
              setSelectedAction('skip');
              setIsCompleted(true);
            }}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Skip for now
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-full py-4 ${
            isCompleted ? 'bg-peach' : 'bg-gray-300'
          }`}
          activeOpacity={0.8}
          onPress={handleContinue}
          disabled={!isCompleted}
        >
          <Text className="font-sans text-base font-bold text-white text-center">
            Continue →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
