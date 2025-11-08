/**
 * Brain Dump - Categorization Screen
 *
 * Categorize each thought into different buckets
 * Timer: 3:00 - 4:00 (1 minute)
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CheckSquare,
  Brain,
  AlertCircle,
  Calendar,
  Heart,
  Briefcase,
  DollarSign,
  Activity,
  Target,
  X as XIcon,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Category definitions with icons and colors
const CATEGORIES = [
  {
    id: 'actionable',
    label: 'Actionable Task',
    icon: CheckSquare,
    color: '#7DD3B0',
    bg: '#B8E6D5',
    emoji: '✅',
  },
  {
    id: 'reflection',
    label: 'Thought / Reflection',
    icon: Brain,
    color: '#D4B5F0',
    bg: '#E8D4F8',
    emoji: '💭',
  },
  {
    id: 'worry',
    label: 'Worry / Anxiety',
    icon: AlertCircle,
    color: '#FF6B5A',
    bg: '#FFD4C4',
    emoji: '⚠️',
  },
  {
    id: 'reminder',
    label: 'Reminder / To-Do Later',
    icon: Calendar,
    color: '#FFB89A',
    bg: '#FFD4C4',
    emoji: '🗓',
  },
  {
    id: 'personal',
    label: 'Personal / Relationship',
    icon: Heart,
    color: '#FF6B5A',
    bg: '#FFD4C4',
    emoji: '❤️',
  },
  {
    id: 'work',
    label: 'Work / Career',
    icon: Briefcase,
    color: '#6B7280',
    bg: '#E5E7EB',
    emoji: '💼',
  },
  {
    id: 'finance',
    label: 'Finance / Money',
    icon: DollarSign,
    color: '#7DD3B0',
    bg: '#B8E6D5',
    emoji: '💰',
  },
  {
    id: 'health',
    label: 'Health / Mind / Body',
    icon: Activity,
    color: '#FFB89A',
    bg: '#FFD4C4',
    emoji: '🧘‍♂️',
  },
  {
    id: 'goal',
    label: 'Goal / Dream',
    icon: Target,
    color: '#D4B5F0',
    bg: '#E8D4F8',
    emoji: '🎯',
  },
  {
    id: 'letgo',
    label: 'Let Go / Not Important',
    icon: XIcon,
    color: '#9CA3AF',
    bg: '#F3F4F6',
    emoji: '❌',
  },
];

interface DumpItem {
  id: string;
  text: string;
  category?: string;
}

export default function BrainDumpCategorize() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dumpText = params.dump as string;

  // Parse dump text into items (bullet points)
  const [items, setItems] = useState<DumpItem[]>(() => {
    const lines = dumpText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[•\-\*]\s*/, ''));

    return lines.map((text, index) => ({
      id: `item-${index}`,
      text,
      category: undefined,
    }));
  });

  const [showAllCategories, setShowAllCategories] = useState(false);

  const mainCategories = CATEGORIES.slice(0, 4); // First 4 categories
  const moreCategories = CATEGORIES.slice(4); // Remaining categories

  const handleCategorySelect = (itemId: string, categoryId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, category: categoryId } : item
      )
    );
  };

  const handleNext = () => {
    const categorizedItems = items.filter((item) => item.category);
    router.push({
      pathname: '/brain-dump/focus',
      params: {
        items: JSON.stringify(categorizedItems),
      },
    });
  };

  const categorizedCount = items.filter((item) => item.category).length;
  const allCategorized = categorizedCount === items.length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-3">
        <Text className="font-sans text-2xl font-bold text-gray-900 mb-2">
          Categorize Your Thoughts
        </Text>
        <Text className="font-sans text-sm text-gray-600 mb-3">
          Label each item quickly. Don't overthink — just trust your instinct.
        </Text>

        {/* Progress */}
        <View className="flex-row items-center gap-2">
          <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-lavender rounded-full"
              style={{ width: `${(categorizedCount / items.length) * 100}%` }}
            />
          </View>
          <Text className="font-sans text-xs font-semibold text-gray-600">
            {categorizedCount}/{items.length}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Items List */}
        <View className="space-y-4 mb-6">
          {items.map((item) => (
            <DumpItemCard
              key={item.id}
              item={item}
              categories={showAllCategories ? CATEGORIES : mainCategories}
              onCategorySelect={handleCategorySelect}
            />
          ))}
        </View>

        {/* More Categories Toggle */}
        {!showAllCategories && (
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-6 shadow-sm"
            activeOpacity={0.8}
            onPress={() => setShowAllCategories(true)}
          >
            <Text className="font-sans text-sm font-semibold text-lavender text-center">
              + More Categories ({moreCategories.length} more)
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-6 pb-6 pt-3 bg-white border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-full py-4 ${
            allCategorized ? 'bg-lavender' : 'bg-gray-300'
          }`}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={!allCategorized}
        >
          <Text className="font-sans text-base font-bold text-white text-center">
            Next → Focus Task
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Dump Item Card Component
interface DumpItemCardProps {
  item: DumpItem;
  categories: typeof CATEGORIES;
  onCategorySelect: (itemId: string, categoryId: string) => void;
}

function DumpItemCard({ item, categories, onCategorySelect }: DumpItemCardProps) {
  const selectedCategory = categories.find((cat) => cat.id === item.category);

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Item Text */}
      <Text className="font-sans text-base text-gray-900 mb-3">{item.text}</Text>

      {/* Category Buttons */}
      <View className="flex-row flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = item.category === category.id;

          return (
            <TouchableOpacity
              key={category.id}
              className={`flex-row items-center gap-2 px-3 py-2 rounded-full ${
                isSelected ? 'border-2' : 'border'
              }`}
              style={{
                backgroundColor: isSelected ? category.bg : '#FFFFFF',
                borderColor: category.color,
              }}
              activeOpacity={0.8}
              onPress={() => onCategorySelect(item.id, category.id)}
            >
              <Text className="text-sm">{category.emoji}</Text>
              <Text
                className={`font-sans text-xs ${
                  isSelected ? 'font-bold' : 'font-medium'
                }`}
                style={{ color: category.color }}
              >
                {category.label.split('/')[0].trim()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
