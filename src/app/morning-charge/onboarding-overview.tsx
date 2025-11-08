/**
 * Morning Charge - Program Overview Screen
 *
 * Shows detailed breakdown of the 5-minute program structure
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Wind,
  Heart,
  Sparkles,
  Lightbulb,
  Trophy,
  ChevronRight,
  Clock,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MorningChargeOverview() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#FFB89A', '#FFD4C4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="px-6 pt-8 pb-12 rounded-b-3xl"
        >
          <Text className="font-sans text-3xl font-bold text-white mb-2">
            Your 5-Minute{'\n'}Morning Ritual
          </Text>
          <View className="flex-row items-center gap-2 mt-2">
            <Clock size={16} color="#FFFFFF" />
            <Text className="font-sans text-sm text-white/90">
              Just 5 minutes to transform your day
            </Text>
          </View>
        </LinearGradient>

        {/* Program Steps */}
        <View className="px-6 py-8 space-y-4">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-2">
            Here's What You'll Do:
          </Text>

          {/* Step 1: Wake & Breathe */}
          <StepCard
            step={1}
            icon={Wind}
            iconColor="#7DD3B0"
            iconBg="#B8E6D5"
            title="Wake & Breathe"
            duration="1 min"
            description="Guided breathing with calming animation. Take your first intentional breath of the day."
            features={['Animated breathing guide', 'Gentle wake-up routine']}
          />

          {/* Step 2: Gratitude Spark */}
          <StepCard
            step={2}
            icon={Heart}
            iconColor="#FF6B5A"
            iconBg="#FFD4C4"
            title="Gratitude Spark"
            duration="1 min"
            description="Write or speak one thing you're grateful for today."
            features={['Text or voice note', 'Quick journaling']}
          />

          {/* Step 3: Positive Affirmation */}
          <StepCard
            step={3}
            icon={Sparkles}
            iconColor="#D4B5F0"
            iconBg="#E8D4F8"
            title="Positive Affirmation"
            duration="1 min"
            description="Choose or auto-generate: 'I am focused, calm, and ready to grow today.'"
            features={['Save favorites', 'Daily repetition']}
          />

          {/* Step 4: Daily Clarity Prompt */}
          <StepCard
            step={4}
            icon={Lightbulb}
            iconColor="#FFB89A"
            iconBg="#FFD4C4"
            title="Daily Clarity Prompt"
            duration="1-2 min"
            description="Set your intention: What's the one thing that will make today great?"
            features={['Rotating prompts', 'Single-choice questions']}
          />

          {/* Step 5: Charge Close */}
          <StepCard
            step={5}
            icon={Trophy}
            iconColor="#FFB89A"
            iconBg="#FFD4C4"
            title="Charge Complete"
            duration="30 sec"
            description="Short motivational boost and streak tracker celebration!"
            features={['Track your streak', 'Unlock badges']}
          />
        </View>

        {/* Bottom CTA */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            className="bg-coral rounded-full py-4 shadow-lg"
            activeOpacity={0.8}
            onPress={() => router.push('/morning-charge/program')}
          >
            <Text className="font-sans text-lg font-bold text-white text-center">
              Start My Morning Charge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-3 py-3"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Step Card Component
interface StepCardProps {
  step: number;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  title: string;
  duration: string;
  description: string;
  features: string[];
}

function StepCard({
  step,
  icon: Icon,
  iconColor,
  iconBg,
  title,
  duration,
  description,
  features,
}: StepCardProps) {
  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <View className="flex-row items-start gap-4 mb-3">
        {/* Step Number & Icon */}
        <View className="items-center">
          <View
            className="w-14 h-14 rounded-full items-center justify-center mb-1"
            style={{ backgroundColor: iconBg }}
          >
            <Icon size={24} color={iconColor} strokeWidth={2} />
          </View>
          <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center -mt-3">
            <Text className="font-sans text-xs font-bold text-gray-600">
              {step}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-sans text-lg font-bold text-gray-900">
              {title}
            </Text>
            <View className="bg-peach-light px-3 py-1 rounded-full">
              <Text className="font-sans text-xs font-semibold text-peach-dark">
                {duration}
              </Text>
            </View>
          </View>

          <Text className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
            {description}
          </Text>

          {/* Features */}
          <View className="space-y-1">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <View className="w-1.5 h-1.5 rounded-full bg-peach" />
                <Text className="font-sans text-xs text-gray-500">
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
