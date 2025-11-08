/**
 * Morning Charge - Onboarding Welcome Screen
 *
 * First screen introducing the 5-Minute Morning Charge program
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sunrise, Sparkles, Target, Heart, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MorningChargeWelcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#FFD4C4', '#FFB89A', '#FF9F7F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        {/* Content Container */}
        <View className="flex-1 px-6 pt-8 pb-6 justify-between">
          {/* Hero Icon */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
              <Sunrise size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            <Text className="font-sans text-3xl font-bold text-white text-center mb-2">
              Morning Charge
            </Text>

            <Text className="font-sans text-base text-white/90 text-center">
              Your 5-Minute Morning Ritual
            </Text>
          </View>

          {/* Features List */}
          <View className="mb-8">
            <FeatureItem
              icon={Sparkles}
              title="Start with Intention"
              description="Wake up mindfully with guided breathing and gratitude"
            />

            <View className="h-4" />

            <FeatureItem
              icon={Heart}
              title="Build Your Momentum"
              description="Daily affirmations and clarity prompts to set your focus"
            />

            <View className="h-4" />

            <FeatureItem
              icon={Target}
              title="Track Your Progress"
              description="Build streaks, unlock badges, and watch your growth"
            />
          </View>

          {/* Bottom Spacer */}
          <View className="flex-1" />

          {/* CTA Buttons */}
          <View>
            <TouchableOpacity
              className="bg-white rounded-full py-4 shadow-lg mb-3"
              activeOpacity={0.8}
              onPress={() => router.push('/morning-charge/onboarding-overview')}
            >
              <Text className="font-sans text-lg font-bold text-peach text-center">
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3"
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text className="font-sans text-sm font-medium text-white/80 text-center">
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

// Feature Item Component
interface FeatureItemProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mt-0.5">
        <Icon size={20} color="#FFFFFF" strokeWidth={2} />
      </View>

      <View className="flex-1">
        <Text className="font-sans text-base font-bold text-white mb-1">
          {title}
        </Text>
        <Text className="font-sans text-sm text-white/80 leading-relaxed">
          {description}
        </Text>
      </View>
    </View>
  );
}
