/**
 * Brain Dump Reset - Welcome Screen
 *
 * Introduction to the 5-minute brain dump program
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Brain, Wind, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BrainDumpWelcome() {
  const router = useRouter();
  const breatheAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Breathing circle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.2,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#D4B5F0', '#E8D4F8', '#F5F0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-8 pb-6 justify-between">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
              <Brain size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            <Text className="font-sans text-3xl font-bold text-white text-center mb-2">
              Brain Dump Reset
            </Text>

            <Text className="font-sans text-base text-white/90 text-center">
              5 Minutes to Clear Your Mind
            </Text>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="font-sans text-lg font-bold text-white text-center mb-4">
              Take a deep breath. For the next 5 minutes, let's clear your head.
            </Text>

            <View className="space-y-3">
              <BenefitItem
                icon={Wind}
                text="Clear mental clutter and reduce anxiety"
              />
              <BenefitItem
                icon={Sparkles}
                text="Organize thoughts into actionable steps"
              />
              <BenefitItem
                icon={Brain}
                text="Choose one doable focus for today"
              />
            </View>

            {/* Info Box */}
            <View className="bg-white/10 rounded-xl p-3 mt-6">
              <Text className="font-sans text-xs text-white/80 text-center">
                <Text className="font-bold">Science-backed:</Text> Writing thoughts reduces anxiety and frees working memory
              </Text>
            </View>
          </View>

          {/* Bottom Spacer */}
          <View className="flex-1" />

          {/* CTA Buttons */}
          <View>
            <TouchableOpacity
              className="bg-white rounded-full py-4 shadow-lg mb-3"
              activeOpacity={0.8}
              onPress={() => router.push('/brain-dump/dump')}
            >
              <Text className="font-sans text-lg font-bold text-lavender text-center">
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

// Benefit Item Component
interface BenefitItemProps {
  icon: React.ComponentType<any>;
  text: string;
}

function BenefitItem({ icon: Icon, text }: BenefitItemProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
        <Icon size={20} color="#FFFFFF" strokeWidth={2} />
      </View>
      <Text className="flex-1 font-sans text-sm text-white/90 leading-relaxed">
        {text}
      </Text>
    </View>
  );
}
