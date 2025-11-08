/**
 * Gratitude Pause - List Three Items
 *
 * List 3 things you're grateful for
 * Timer: 0:30 - 2:00 (1.5 minutes)
 */

import React, { useState, useEffect } from 'react';
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
import { Heart, Mic, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function GratitudeList() {
  const router = useRouter();
  const [items, setItems] = useState(['', '', '']);
  const [showHints, setShowHints] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  const hints = ['a kind message', 'morning coffee', 'a quiet moment'];

  // Show hints after 10 seconds of inactivity
  useEffect(() => {
    const hasContent = items.some((item) => item.trim().length > 0);

    if (!hasContent) {
      const timer = setTimeout(() => {
        setShowHints(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [items]);

  const handleItemChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index] = text;
    setItems(newItems);
  };

  const handleNext = () => {
    const filledItems = items.filter((item) => item.trim().length > 0);
    if (filledItems.length >= 3) {
      router.push({
        pathname: '/gratitude-pause/deep-dive',
        params: {
          items: JSON.stringify(items),
        },
      });
    }
  };

  const filledCount = items.filter((item) => item.trim().length > 0).length;
  const canProceed = filledCount === 3;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-3">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="font-sans text-2xl font-bold text-gray-900 mb-2">
                List Three
              </Text>
              <Text className="font-sans text-sm text-gray-600">
                What are you grateful for in life?
              </Text>
            </View>

            <View className="w-16 h-16 rounded-full bg-peach-light items-center justify-center">
              <Heart size={28} color="#FFB89A" strokeWidth={2} />
            </View>
          </View>

          {/* Progress Dots */}
          <View className="flex-row items-center gap-2 mt-3">
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                className={`flex-1 h-1.5 rounded-full ${
                  items[index].trim() ? 'bg-peach' : 'bg-gray-200'
                }`}
              />
            ))}
          </View>

          <Text className="font-sans text-xs text-gray-500 mt-2">
            {filledCount} / 3 items
          </Text>
        </View>

        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          {/* Input Fields */}
          <View className="space-y-4 mb-6">
            {items.map((item, index) => (
              <View key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <View className="p-4">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="w-8 h-8 rounded-full bg-peach-light items-center justify-center">
                      <Text className="font-sans text-sm font-bold text-peach">
                        {index + 1}
                      </Text>
                    </View>
                    <Text className="font-sans text-sm font-semibold text-gray-700">
                      I'm grateful for...
                    </Text>
                  </View>

                  <TextInput
                    className="font-sans text-base text-gray-900 min-h-[60px] px-2"
                    placeholder={`Enter your ${['first', 'second', 'third'][index]} gratitude`}
                    placeholderTextColor="#9CA3AF"
                    value={item}
                    onChangeText={(text) => handleItemChange(index, text)}
                    multiline
                    textAlignVertical="top"
                    returnKeyType={index < 2 ? 'next' : 'done'}
                  />
                </View>

                {/* Voice Note Option */}
                <TouchableOpacity
                  className="border-t border-gray-100 px-4 py-3 flex-row items-center justify-center gap-2"
                  activeOpacity={0.8}
                >
                  <Mic size={16} color="#FFB89A" />
                  <Text className="font-sans text-xs font-semibold text-peach">
                    Or use voice
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Hints Section */}
          {showHints && (
            <View className="bg-peach-light rounded-2xl p-5 mb-6">
              <View className="flex-row items-center gap-2 mb-3">
                <HelpCircle size={20} color="#FFB89A" />
                <Text className="font-sans text-base font-bold text-brown">
                  Need inspiration?
                </Text>
              </View>

              <Text className="font-sans text-sm text-brown mb-3">
                Here are some examples:
              </Text>

              <View className="space-y-2">
                {hints.map((hint, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-white rounded-xl px-4 py-3"
                    activeOpacity={0.8}
                    onPress={() => {
                      const emptyIndex = items.findIndex((item) => !item.trim());
                      if (emptyIndex !== -1) {
                        handleItemChange(emptyIndex, hint);
                      }
                    }}
                  >
                    <Text className="font-sans text-sm text-gray-700">
                      • {hint}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Tip Box */}
          <View className="bg-mint-light rounded-2xl p-4 mb-6">
            <Text className="font-sans text-xs font-semibold text-mint mb-2">
              💡 Tip
            </Text>
            <Text className="font-sans text-xs text-gray-700">
              Think of small, everyday moments — they often hold the deepest gratitude
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
          <TouchableOpacity
            className={`rounded-full py-4 ${
              canProceed ? 'bg-peach' : 'bg-gray-300'
            }`}
            activeOpacity={0.8}
            onPress={handleNext}
            disabled={!canProceed}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Next →
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
