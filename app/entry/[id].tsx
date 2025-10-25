import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Edit, Trash2, Share } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Mock entry data - in a real app, this would be fetched based on the ID
const mockEntry = {
  id: '1',
  title: 'Morning Reflection',
  content: 'Started the day with gratitude practice. Feeling optimistic about the challenges ahead and ready to tackle my goals. There\'s something powerful about beginning each morning with intention and appreciation for what I have.\n\nI\'ve been thinking about how small daily practices can compound into significant personal growth. Today I want to focus on being present in each moment and approaching challenges with curiosity rather than resistance.',
  date: new Date(),
  mood: 'Happy',
  tags: ['gratitude', 'morning', 'goals', 'mindfulness'],
  type: 'text'
};

const moodColors = {
  Happy: 'bg-green-400',
  Calm: 'bg-blue-400',
  Neutral: 'bg-gray-400',
  Sad: 'bg-blue-600',
  Stressed: 'bg-red-400',
};

export default function EntryDetailScreen() {
  const params = useLocalSearchParams();
  const entryId = params.id as string;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleEdit = () => {
    // In a real app, this would navigate to edit mode
    router.push(`/create-entry?id=${entryId}&mode=edit`);
  };

  const handleDelete = () => {
    // In a real app, this would show a confirmation dialog
    console.log('Delete entry:', entryId);
    router.back();
  };

  const handleShare = () => {
    // In a real app, this would open share dialog
    console.log('Share entry:', entryId);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b-2 border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 active:bg-gray-100 rounded-full" activeOpacity={0.7}>
          <X color="#374151" size={26} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">Journal Entry</Text>
        <View className="flex-row">
          <TouchableOpacity onPress={handleShare} className="p-2 active:bg-gray-100 rounded-full mr-2" activeOpacity={0.7}>
            <Share color="#374151" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} className="p-2 active:bg-gray-100 rounded-full mr-2" activeOpacity={0.7}>
            <Edit color="#374151" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} className="p-2 active:bg-red-100 rounded-full" activeOpacity={0.7}>
            <Trash2 color="#EF4444" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Entry Header */}
        <View className="px-5 py-6">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-sm text-gray-500 font-medium flex-1">
              {formatDate(mockEntry.date)}
            </Text>
            <View className={`w-6 h-6 rounded-full ${moodColors[mockEntry.mood] || 'bg-gray-400'}`} />
          </View>

          <Text className="text-3xl font-bold text-black mb-6">
            {mockEntry.title}
          </Text>

          {/* Tags */}
          <View className="flex-row flex-wrap">
            {mockEntry.tags.map((tag, index) => (
              <View key={index} className="bg-yellow-100 rounded-full px-4 py-2 mr-2 mb-3 border-2 border-yellow-300">
                <Text className="text-yellow-700 font-bold text-base">#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Entry Content */}
        <View className="px-5 pb-8">
          <View className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
            <Text className="text-black text-base leading-relaxed">
              {mockEntry.content}
            </Text>
          </View>
        </View>

        {/* Related Entries */}
        <View className="px-5">
          <Text className="text-xl font-bold text-black mb-5">Related Entries</Text>
          <View>
            <TouchableOpacity className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 active:bg-gray-100 mb-4" activeOpacity={0.7}>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm text-gray-500 font-medium">Yesterday, 7:30 PM</Text>
                <View className="w-5 h-5 bg-blue-400 rounded-full" />
              </View>
              <Text className="text-black font-bold mb-2 text-base">Evening Gratitude</Text>
              <Text className="text-gray-600 text-base leading-relaxed" numberOfLines={2}>
                Reflecting on today's small victories and moments of joy...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 active:bg-gray-100" activeOpacity={0.7}>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm text-gray-500 font-medium">3 days ago, 8:15 AM</Text>
                <View className="w-5 h-5 bg-green-400 rounded-full" />
              </View>
              <Text className="text-black font-bold mb-2 text-base">Weekly Goals Review</Text>
              <Text className="text-gray-600 text-base leading-relaxed" numberOfLines={2}>
                Looking back at this week's progress and setting intentions...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}