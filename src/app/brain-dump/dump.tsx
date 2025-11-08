/**
 * Brain Dump - Writing Screen
 *
 * Main screen for writing brain dump entries
 * Timer: 1:00 - 3:00 (2 minutes)
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
import { HelpCircle, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BrainDumpWriting() {
  const router = useRouter();
  const [dumpText, setDumpText] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [idleTimer, setIdleTimer] = useState(0);

  // Track idle time and show help after 10 seconds
  useEffect(() => {
    if (dumpText.trim().length === 0) {
      const timer = setTimeout(() => {
        setShowHelp(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [dumpText]);

  const guidedQuestions = [
    "What's taking up most of your mental space today?",
    "Is there something you keep postponing?",
    "What thought keeps replaying in your head?",
  ];

  const handleNext = () => {
    // Parse bullet points and navigate
    if (dumpText.trim()) {
      router.push({
        pathname: '/brain-dump/categorize',
        params: { dump: dumpText },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-3">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-sans text-2xl font-bold text-gray-900">
              Write Your Dump
            </Text>
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center"
              onPress={() => setShowHelp(!showHelp)}
            >
              <HelpCircle size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <Text className="font-sans text-sm text-gray-600">
            Write down whatever's on your mind — tasks, worries, reminders. Don't filter, just unload.
          </Text>

          {/* Timer */}
          <View className="mt-3 bg-lavender-light rounded-full px-4 py-2 self-start">
            <Text className="font-sans text-xs font-semibold text-lavender">
              ⏱ 2:00 minutes
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          {/* Text Input */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <TextInput
              className="font-sans text-base text-gray-900 min-h-[300px]"
              placeholder={'• unfinished tasks\n• thoughts bothering me\n• random things to remember'}
              placeholderTextColor="#9CA3AF"
              value={dumpText}
              onChangeText={setDumpText}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {/* Help Section */}
          {showHelp && (
            <View className="bg-lavender-light rounded-2xl p-5 mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-sans text-base font-bold text-lavender">
                  Need help dumping?
                </Text>
                <TouchableOpacity onPress={() => setShowHelp(false)}>
                  <X size={20} color="#D4B5F0" />
                </TouchableOpacity>
              </View>

              <Text className="font-sans text-sm text-gray-700 mb-3">
                Try answering these guided questions:
              </Text>

              <View className="space-y-3">
                {guidedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-white rounded-xl p-3"
                    activeOpacity={0.8}
                    onPress={() => {
                      setDumpText(dumpText + '\n• ' + question + ' ');
                      setShowHelp(false);
                    }}
                  >
                    <Text className="font-sans text-sm text-gray-900">
                      {index + 1}. {question}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Quick Tips */}
          <View className="bg-mint-light rounded-2xl p-4 mb-4">
            <Text className="font-sans text-xs font-semibold text-mint mb-2">
              💡 Quick Tips
            </Text>
            <Text className="font-sans text-xs text-gray-700">
              • Use bullet points{'\n'}
              • Don't overthink or edit{'\n'}
              • Include tasks, worries, ideas, reminders{'\n'}
              • Write fast, organize later
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
          <TouchableOpacity
            className={`rounded-full py-4 ${
              dumpText.trim() ? 'bg-lavender' : 'bg-gray-300'
            }`}
            activeOpacity={0.8}
            onPress={handleNext}
            disabled={!dumpText.trim()}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Next → Categorize
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
