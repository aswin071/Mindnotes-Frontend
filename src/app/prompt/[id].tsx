/**
 * Prompt Response Screen
 * User responds to daily reflection prompts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, TextInput } from '@/components/common';
import { theme } from '@/constants/theme';
import { X } from 'lucide-react-native';

export default function PromptResponseScreen() {
  const router = useRouter();
  const [responses, setResponses] = useState(['', '', '', '', '']);

  const prompts = [
    'What are three things you\'re grateful for?',
    'How did you challenge yourself?',
    'What made you smile?',
    'How are you feeling?',
    'What would you tell your younger self?',
  ];

  const handleClose = () => {
    router.back();
  };

  const handleSave = () => {
    // TODO: Save responses as journal entry
    console.log('Save responses');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.beige }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing[4],
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.neutral.gray[200],
          }}
        >
          <Text style={{ fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', color: theme.colors.neutral.black }}>
            Daily Prompts
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <X size={24} color={theme.colors.neutral.black} />
          </TouchableOpacity>
        </View>

        {/* Responses */}
        <ScrollView contentContainerStyle={{ padding: theme.spacing[4], paddingBottom: theme.spacing[8] }}>
          {prompts.map((prompt, idx) => (
            <View key={idx} style={{ marginBottom: theme.spacing[6] }}>
              <Text style={{ fontSize: theme.typography.fontSize.base, fontWeight: 'semibold', marginBottom: theme.spacing[2], color: theme.colors.neutral.black }}>
                {idx + 1}. {prompt}
              </Text>
              <TextInput
                placeholder="Your response..."
                value={responses[idx]}
                onChangeText={(text) => {
                  const newResponses = [...responses];
                  newResponses[idx] = text;
                  setResponses(newResponses);
                }}
                multiline
                numberOfLines={4}
              />
            </View>
          ))}

          <Button title="Save Responses" onPress={handleSave} variant="primary" size="large" fullWidth />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
