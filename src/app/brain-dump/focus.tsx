/**
 * Brain Dump - Focus Task Selection
 *
 * Choose one actionable task to focus on today
 * Timer: 4:00 - 4:45
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Check } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface DumpItem {
  id: string;
  text: string;
  category?: string;
}

export default function BrainDumpFocus() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const items: DumpItem[] = params.items ? JSON.parse(params.items as string) : [];

  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Filter only actionable items
  const actionableItems = items.filter((item) => item.category === 'actionable');

  const handleConfirm = () => {
    if (selectedTask) {
      router.push({
        pathname: '/brain-dump/complete',
        params: {
          focusTask: selectedTask,
          totalItems: items.length.toString(),
          actionableCount: actionableItems.length.toString(),
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-mint-light items-center justify-center mb-4">
            <Target size={32} color="#7DD3B0" strokeWidth={2} />
          </View>

          <Text className="font-sans text-3xl font-bold text-gray-900 mb-3 text-center">
            Choose One Task
          </Text>

          <Text className="font-sans text-base text-gray-600 text-center">
            Pick one thing that feels light and doable today
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {actionableItems.length > 0 ? (
          <View className="space-y-3 mb-6">
            {actionableItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`rounded-2xl p-4 ${
                  selectedTask === item.text
                    ? 'bg-mint-light border-2 border-mint'
                    : 'bg-white border border-gray-200'
                }`}
                activeOpacity={0.8}
                onPress={() => setSelectedTask(item.text)}
              >
                <View className="flex-row items-center gap-3">
                  {/* Radio Button */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      selectedTask === item.text
                        ? 'border-mint bg-mint'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedTask === item.text && (
                      <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>

                  {/* Task Text */}
                  <Text
                    className={`flex-1 font-sans text-base ${
                      selectedTask === item.text
                        ? 'font-semibold text-gray-900'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="bg-peach-light rounded-2xl p-6 mb-6">
            <Text className="font-sans text-base text-brown text-center mb-2">
              No actionable tasks found
            </Text>
            <Text className="font-sans text-sm text-brown-dark text-center">
              You didn't categorize any items as "Actionable Task". That's okay! Let's complete your dump anyway.
            </Text>
          </View>
        )}

        {/* Confirmation Box */}
        {selectedTask && (
          <View className="bg-mint-light rounded-2xl p-5 mb-6">
            <Text className="font-sans text-sm font-semibold text-mint mb-2">
              ✨ Your Focus for Today
            </Text>
            <Text className="font-sans text-lg font-bold text-gray-900 mb-3">
              "{selectedTask}"
            </Text>
            <Text className="font-sans text-xs text-gray-600">
              This will be saved to your "Today's Task" and added to your focus timer.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-full py-4 mb-3 ${
            selectedTask || actionableItems.length === 0
              ? 'bg-mint'
              : 'bg-gray-300'
          }`}
          activeOpacity={0.8}
          onPress={handleConfirm}
          disabled={!selectedTask && actionableItems.length > 0}
        >
          <Text className="font-sans text-base font-bold text-white text-center">
            {selectedTask ? 'Confirm → Finish' : 'Skip → Finish'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3"
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text className="font-sans text-sm font-medium text-gray-500 text-center">
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
