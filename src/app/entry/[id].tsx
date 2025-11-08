/**
 * Entry Detail / View Screen
 * View individual journal entries with a clean, simple design
 * Displays entry content, images, audio, tags, and date
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MoreVertical, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EntryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // TODO: Fetch entry data by ID from API/store
  const entry = {
    id,
    title: 'A Day to Remember',
    date: 'Thursday, October 26, 2023 at 9:45 PM',
    content: [
      'Today was such an incredibly fulfilling day. I started the morning with a quiet moment of reflection, just focusing on the things I\'m grateful for. It really set a positive tone for everything that followed.',
      'Work was busy, but I managed to finish the big project I\'ve been working on for weeks. It felt so good to finally hit "send" on that final presentation. My team was really happy with the result, which made all the hard work feel worthwhile. The view from the office was spectacular today.',
      'Later in the evening, I met up with friends for dinner. We laughed so much my cheeks hurt. It\'s moments like these that I\'ll cherish forever. Feeling incredibly happy and content right now.',
    ],
    tags: ['Gratitude', 'Work', 'Travel'],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=400&h=300&fit=crop',
    ],
    audio: {
      duration: '3:12',
      currentTime: '1:24',
      progress: 0.4,
    },
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ChevronLeft size={24} color="#1F2937" strokeWidth={2.5} />
        </TouchableOpacity>
        <View className="w-10 h-10 items-center justify-center">
          <MoreVertical size={24} color="#1F2937" strokeWidth={2} />
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Content Container */}
        <View className="px-6 pt-6 pb-12">
          {/* Title */}
          <Text className="font-sans text-2xl font-bold text-gray-900 mb-3">
            {entry.title}
          </Text>

          {/* Date and Tags */}
          <View className="mb-6">
            <Text className="font-sans text-sm text-gray-500 mb-3">
              {entry.date}
            </Text>

            {/* Tags */}
            <View className="flex-row flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <View
                  key={index}
                  className="px-4 py-1.5 rounded-full bg-peach-light"
                >
                  <Text className="font-sans text-sm font-medium text-gray-700">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* First Content Paragraph */}
          <Text className="font-sans text-base text-gray-900 leading-relaxed mb-6">
            {entry.content[0]}
          </Text>

          {/* Image Attachments */}
          {entry.images.length > 0 && (
            <View className="mb-6">
              <View className="flex-row gap-3">
                {entry.images.map((imageUri, index) => (
                  <View
                    key={index}
                    className="flex-1 rounded-2xl overflow-hidden"
                    style={{ height: 160 }}
                  >
                    <RNImage
                      source={{ uri: imageUri }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Second Content Paragraph */}
          <Text className="font-sans text-base text-gray-900 leading-relaxed mb-6">
            {entry.content[1]}
          </Text>

          {/* Audio Player */}
          {entry.audio && (
            <View className="mb-6">
              <LinearGradient
                colors={['#FFB89A', '#FFD4C4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-2xl p-4 flex-row items-center justify-between"
              >
                <TouchableOpacity
                  className="w-10 h-10 bg-white rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Play size={20} color="#FFB89A" fill="#FFB89A" />
                </TouchableOpacity>

                <View className="flex-1 mx-4">
                  <View className="h-1 bg-white/30 rounded-full">
                    <View
                      className="h-1 bg-white rounded-full"
                      style={{ width: `${entry.audio.progress * 100}%` }}
                    />
                  </View>
                </View>

                <Text className="font-sans text-sm font-medium text-white">
                  {entry.audio.currentTime}
                </Text>

                <Text className="font-sans text-sm text-white/70 ml-1">
                  / {entry.audio.duration}
                </Text>
              </LinearGradient>
            </View>
          )}

          {/* Third Content Paragraph */}
          <Text className="font-sans text-base text-gray-900 leading-relaxed">
            {entry.content[2]}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
