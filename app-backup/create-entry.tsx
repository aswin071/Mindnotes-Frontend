import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Mic, Sparkles, Hash, X, Lightbulb } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MoodSelector } from '@/components/MoodSelector';
import { colors } from '@/constants/theme';

export default function CreateEntryScreen() {
  const params = useLocalSearchParams();
  const entryType = params.type as string || 'text';
  const promptQuestion = params.promptQuestion as string;
  const promptCategory = params.promptCategory as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const suggestedTags = ['gratitude', 'reflection', 'goals', 'challenge', 'growth', 'work', 'family', 'health'];

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveEntry = () => {
    if (!content.trim()) {
      Alert.alert('Missing Content', 'Please write something in your journal entry.');
      return;
    }

    // In a real app, this would save to a database
    console.log('Saving entry:', {
      title: title || 'Untitled Entry',
      content,
      mood: selectedMood,
      tags,
      type: entryType,
      date: new Date(),
    });

    Alert.alert(
      'Entry Saved! ✨',
      'Your thoughts have been captured.',
      [{ text: 'Great!', onPress: () => router.back() }]
    );
  };

  const getEntryTypeIcon = () => {
    switch (entryType) {
      case 'photo': return <Camera color={colors.primary.yellow} size={20} />;
      case 'voice': return <Mic color={colors.primary.yellow} size={20} />;
      case 'prompt': return <Lightbulb color={colors.primary.yellow} size={20} />;
      default: return <Sparkles color={colors.primary.yellow} size={20} />;
    }
  };

  const getEntryTypeTitle = () => {
    switch (entryType) {
      case 'photo': return 'Photo Memory';
      case 'voice': return 'Voice Note';
      case 'prompt': return 'Guided Reflection';
      default: return 'Free Writing';
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: colors.neutral.beige }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView className="flex-1" edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.beige} />
        {/* Header */}
        <View className="px-5 py-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2"
            activeOpacity={0.7}
          >
            <ArrowLeft color={colors.gray[700]} size={24} />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <View className="bg-yellow-100 rounded-full p-2 mr-2">
              {getEntryTypeIcon()}
            </View>
            <Text className="text-lg font-bold text-gray-800">
              {getEntryTypeTitle()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={saveEntry}
            className="bg-yellow-400 rounded-full px-5 py-2.5"
            activeOpacity={0.8}
          >
            <Text className="text-gray-800 font-bold">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
        {/* Prompt Question (if applicable) */}
        {entryType === 'prompt' && promptQuestion && (
          <View className="mx-5 mt-6 mb-4 bg-yellow-50 rounded-2xl p-5 border-2 border-yellow-200">
            <View className="flex-row items-center mb-3">
              <Lightbulb color="#F59E0B" size={18} />
              <Text className="text-yellow-700 font-bold ml-2 text-base">
                {promptCategory}
              </Text>
            </View>
            <Text className="text-black font-medium leading-relaxed text-base">
              {promptQuestion}
            </Text>
          </View>
        )}

        {/* Title Input */}
        <View className="mx-5 mt-6">
          <Text className="text-black font-bold mb-3 text-base">Title</Text>
          <TextInput
            placeholder="Give your entry a title..."
            value={title}
            onChangeText={setTitle}
            className="bg-gray-50 rounded-2xl p-5 text-black text-lg border-2 border-gray-200"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Content Input */}
        <View className="mx-5 mt-6">
          <Text className="text-black font-bold mb-3 text-base">Content</Text>
          <TextInput
            placeholder={entryType === 'prompt'
              ? "Share your thoughts and reflections..."
              : "What's on your mind today?"
            }
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            className="bg-gray-50 rounded-2xl p-5 text-black text-base leading-relaxed border-2 border-gray-200"
            placeholderTextColor="#9CA3AF"
            style={{ minHeight: 200 }}
          />
        </View>

        {/* Mood Selection */}
        <View className="mx-5 mt-6">
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
          />
        </View>

        {/* Tags */}
        <View className="mx-5 mt-6 mb-20">
          <Text className="text-black font-bold mb-4 text-base">Tags</Text>

          {/* Current Tags */}
          {tags.length > 0 && (
            <View className="flex-row flex-wrap mb-4">
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => removeTag(tag)}
                  className="bg-yellow-100 rounded-full px-4 py-2 mr-2 mb-3 border-2 border-yellow-300 active:bg-yellow-200"
                  activeOpacity={0.7}
                >
                  <Text className="text-yellow-700 font-bold text-base">#{tag} ×</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Add Tag Input */}
          <View className="flex-row mb-5">
            <TextInput
              placeholder="Add a tag..."
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={() => addTag(newTag)}
              className="flex-1 bg-gray-50 rounded-2xl p-4 text-black text-base border-2 border-gray-200"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => addTag(newTag)}
              className="bg-yellow-400 rounded-2xl px-6 py-4 ml-3 active:bg-yellow-500"
              activeOpacity={0.8}
            >
              <Text className="text-black font-bold text-base">Add</Text>
            </TouchableOpacity>
          </View>

          {/* Suggested Tags */}
          <Text className="text-gray-600 text-base font-semibold mb-3">Suggested:</Text>
          <View className="flex-row flex-wrap">
            {suggestedTags.filter(tag => !tags.includes(tag)).map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => addTag(tag)}
                className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-3 border-2 border-gray-200 active:bg-gray-200"
                activeOpacity={0.7}
              >
                <Text className="text-gray-600 font-semibold text-base">#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}