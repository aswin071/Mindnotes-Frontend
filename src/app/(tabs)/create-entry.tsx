/**
 * Create Journal Entry Screen
 *
 * Allows users to write a new journal entry with:
 * - Title input
 * - Main text area for thoughts
 * - Media attachments (photos, audio)
 * - Tags/categories
 * - Voice-to-text toggle
 * - Save functionality
 *
 * Design: Clean, playful, responsive with Tailwind CSS
 * Colors: Global Tailwind colors (coral, peach, mint, lavender)
 * Fonts: Global journal and sans fonts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image as RNImage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Image, Mic, X } from 'lucide-react-native';

interface MediaAttachment {
  id: string;
  type: 'image' | 'audio';
  uri: string;
}

export default function CreateEntryScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>(['Grateful', 'Work']);
  const [newTag, setNewTag] = useState('');
  const [media, setMedia] = useState<MediaAttachment[]>([
    {
      id: '1',
      type: 'image',
      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJgQ20dPs7HPgiEWkgGG7e5Uu2GFJ-3hw1_3po6xLxlWT1DqM6rTG37nhCB5YZqJ2MTefo-JqQLBqy1AwUKZ2B8Wsmf3HCL-L-xD6_nN-pgqQieUACdtCx6ITZzl49WG3vsaa6bNtOu3-YiHzCYrPLMIoi3Wqm6UYwhyzIsxS5bjfkkdtbxfLEhRdEmtbkjJK834THAr68TCGEYHDC1CZIV3W8xAwEJrG9wEpLNK2PLlECcHcjpiTtbrl2PSRoyWgWZS69JK-O7t3',
    },
    {
      id: '2',
      type: 'audio',
      uri: 'audio-placeholder',
    },
  ]);
  const [voiceToText, setVoiceToText] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    console.log('Saving entry:', { title, content, tags, media });
    // TODO: Call API to save entry
    router.back();
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  const handleAddPhoto = () => {
    console.log('Add photo');
    // TODO: Implement image picker
  };

  const handleAddAudio = () => {
    console.log('Add audio');
    // TODO: Implement audio recorder
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-peach">
        <TouchableOpacity
          className="p-2"
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ChevronLeft size={24} color="#1F2937" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="font-journal text-lg font-bold text-gray-800 flex-1 text-center">
          New Entry
        </Text>
        <TouchableOpacity
          className="px-4 py-2 bg-coral rounded-lg shadow-md"
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text className="font-sans text-base font-bold text-white">
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Display */}
        <Text className="font-journal text-base text-gray-500 mb-4">
          {getCurrentDate()}
        </Text>

        {/* Title Input */}
        <View className="mb-5">
          <Text className="font-sans text-base font-medium text-gray-800 mb-2">
            Title
          </Text>
          <TextInput
            className="font-journal border border-gray-200 rounded-2xl px-4 py-3 text-base text-gray-800 bg-gray-50 min-h-[56px]"
            placeholder="Give your entry a title... (optional)"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Content Textarea */}
        <View className="mb-5">
          <Text className="font-sans text-base font-medium text-gray-800 mb-2">
            Today's Thoughts
          </Text>
          <TextInput
            className="font-journal border border-gray-200 rounded-2xl px-4 py-4 text-base text-gray-800 bg-gray-50 min-h-[200px]"
            placeholder="Tell me about your day..."
            placeholderTextColor="#9CA3AF"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Media Attachments */}
        {media.length > 0 && (
          <View className="flex-row gap-3 mb-4 flex-wrap">
            {media.map((item) => (
              <View key={item.id} className="relative mb-2">
                {item.type === 'image' ? (
                  <View className="w-20 h-20 bg-white rounded-xl overflow-hidden">
                    <RNImage
                      source={{ uri: item.uri }}
                      className="w-full h-full"
                    />
                  </View>
                ) : (
                  <View className="w-20 h-20 bg-white rounded-xl justify-center items-center">
                    <Mic size={24} color="#FFB89A" strokeWidth={2} />
                  </View>
                )}
                <TouchableOpacity
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 rounded-full justify-center items-center"
                  onPress={() => handleRemoveMedia(item.id)}
                  activeOpacity={0.7}
                >
                  <X size={14} color="#FFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Tags Section */}
        <View className="mb-4">
          <Text className="font-sans text-base font-medium text-gray-800 mb-2">
            Add Tags
          </Text>
          <View className="flex-row flex-wrap gap-2 items-center">
            {tags.map((tag, index) => (
              <View
                key={index}
                className="flex-row items-center px-3 py-1.5 rounded-full bg-peach-light"
              >
                <Text className="font-sans text-sm font-medium text-gray-800">
                  {tag}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveTag(index)}
                  className="ml-1.5"
                >
                  <X size={14} color="#1F2937" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              className="font-sans flex-1 min-w-[120px] text-sm text-gray-800 py-2 border-b border-gray-200"
              placeholder="Type new tag..."
              placeholderTextColor="#9CA3AF"
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={handleAddTag}
            />
          </View>
        </View>

        {/* Spacer */}
        <View className="h-6" />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-4 border-t border-gray-200 flex-row justify-between items-end">
        <View className="flex-row gap-5">
          <TouchableOpacity
            className="items-center gap-2"
            onPress={handleAddPhoto}
            activeOpacity={0.7}
          >
            <View className="w-11 h-11 bg-gray-50 rounded-full justify-center items-center shadow-sm">
              <Image size={20} color="#1F2937" strokeWidth={1.5} />
            </View>
            <Text className="font-sans text-xs font-medium text-gray-600">
              Add Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center gap-2"
            onPress={handleAddAudio}
            activeOpacity={0.7}
          >
            <View className="w-11 h-11 bg-gray-50 rounded-full justify-center items-center shadow-sm">
              <Mic size={20} color="#1F2937" strokeWidth={1.5} />
            </View>
            <Text className="font-sans text-xs font-medium text-gray-600">
              Record
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voice-to-Text Toggle */}
        <View className="items-center gap-2">
          <Text className="font-sans text-xs font-medium text-gray-600">
            Voice-to-Text
          </Text>
          <TouchableOpacity
            className="w-11 h-6 rounded-full justify-center"
            style={{
              backgroundColor: voiceToText ? '#FFB89A' : '#D1D5DB',
            }}
            onPress={() => setVoiceToText(!voiceToText)}
            activeOpacity={0.7}
          >
            <View
              className="w-5 h-5 bg-white rounded-full"
              style={{
                transform: [{ translateX: voiceToText ? 22 : 2 }],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
