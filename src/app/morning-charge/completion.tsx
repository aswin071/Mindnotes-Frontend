/**
 * Morning Charge - Completion & Streak Screen
 *
 * Shows completion celebration, streak tracking, and progress
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Trophy,
  Flame,
  Calendar,
  Share2,
  Award,
  TrendingUp,
  Heart,
  Zap,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MorningChargeCompletion() {
  const router = useRouter();
  const chargeAnim = useRef(new Animated.Value(0)).current;
  const streakDay = 7; // Example: Day 7 streak
  const totalDays = 30;

  useEffect(() => {
    // Animate charge bar
    Animated.timing(chargeAnim, {
      toValue: 100,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Just completed my Morning Charge! 🌅 Day ${streakDay} streak - building momentum one morning at a time! #MorningCharge #Mindfulness`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const chargeWidth = chargeAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#FFB89A', '#FFD4C4', '#FFF5F0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="px-6 pt-12 pb-16 rounded-b-3xl"
        >
          <View className="items-center">
            <View className="w-24 h-24 rounded-full bg-white/30 items-center justify-center mb-6">
              <Trophy size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            <Text className="font-sans text-4xl font-bold text-white mb-3 text-center">
              You're Charged!
            </Text>

            <Text className="font-sans text-lg text-white/90 text-center mb-6">
              Day {streakDay} — You're building momentum!
            </Text>

            {/* Energy Bar */}
            <View className="w-full max-w-xs">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-sans text-sm font-semibold text-white">
                  Morning Energy
                </Text>
                <Zap size={16} color="#FFFFFF" />
              </View>
              <View className="h-4 bg-white/30 rounded-full overflow-hidden">
                <Animated.View
                  className="h-full bg-white rounded-full"
                  style={{ width: chargeWidth }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Streak Section */}
        <View className="px-6 -mt-8 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="flex-row items-center justify-center gap-3 mb-4">
              <Flame size={32} color="#FF6B5A" strokeWidth={2} />
              <Text className="font-sans text-4xl font-bold text-gray-900">
                {streakDay}
              </Text>
              <Text className="font-sans text-lg text-gray-600">Day Streak</Text>
            </View>

            {/* Progress Bar */}
            <View className="mb-4">
              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-coral rounded-full"
                  style={{ width: `${(streakDay / totalDays) * 100}%` }}
                />
              </View>
              <Text className="font-sans text-xs text-gray-500 text-center mt-2">
                {streakDay} / {totalDays} days
              </Text>
            </View>

            <Text className="font-sans text-sm text-gray-600 text-center">
              Keep going! You're {totalDays - streakDay} days away from completing the challenge
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-6 mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4">
            Your Progress
          </Text>

          <View className="flex-row gap-3 mb-3">
            <StatCard
              icon={Calendar}
              iconColor="#7DD3B0"
              iconBg="#B8E6D5"
              label="Total Days"
              value={streakDay.toString()}
            />
            <StatCard
              icon={TrendingUp}
              iconColor="#FFB89A"
              iconBg="#FFD4C4"
              label="This Week"
              value="7/7"
            />
          </View>

          <View className="flex-row gap-3">
            <StatCard
              icon={Heart}
              iconColor="#FF6B5A"
              iconBg="#FFD4C4"
              label="Gratitude Notes"
              value={streakDay.toString()}
            />
            <StatCard
              icon={Award}
              iconColor="#D4B5F0"
              iconBg="#E8D4F8"
              label="Badges Earned"
              value="2"
            />
          </View>
        </View>

        {/* Badges Section */}
        <View className="px-6 mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4">
            Badges Unlocked
          </Text>

          <View className="flex-row gap-3">
            <BadgeCard
              emoji="🌱"
              title="First Steps"
              subtitle="Completed Day 1"
              unlocked
            />
            <BadgeCard
              emoji="⚡"
              title="Week Warrior"
              subtitle="7 Day Streak"
              unlocked
            />
            <BadgeCard
              emoji="🏆"
              title="Momentum Master"
              subtitle="30 Day Streak"
              unlocked={false}
            />
          </View>
        </View>

        {/* Share Section */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            className="bg-mint rounded-2xl p-4 flex-row items-center justify-center gap-3 mb-3"
            activeOpacity={0.8}
            onPress={handleShare}
          >
            <Share2 size={20} color="#FFFFFF" />
            <Text className="font-sans text-base font-bold text-white">
              Share Your Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-coral rounded-full py-4 shadow-lg mb-3"
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Back to Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3"
            activeOpacity={0.7}
            onPress={() => router.push('/morning-charge/program')}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Do Another Session
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
}

function StatCard({ icon: Icon, iconColor, iconBg, label, value }: StatCardProps) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} color={iconColor} strokeWidth={2} />
      </View>
      <Text className="font-sans text-xs text-gray-500 mb-1">{label}</Text>
      <Text className="font-sans text-2xl font-bold text-gray-900">{value}</Text>
    </View>
  );
}

// Badge Card Component
interface BadgeCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
}

function BadgeCard({ emoji, title, subtitle, unlocked }: BadgeCardProps) {
  return (
    <View
      className={`flex-1 rounded-2xl p-4 ${
        unlocked ? 'bg-white shadow-sm' : 'bg-gray-100'
      }`}
    >
      <Text className={`text-3xl mb-2 text-center ${!unlocked && 'opacity-30'}`}>
        {emoji}
      </Text>
      <Text
        className={`font-sans text-sm font-bold text-center mb-1 ${
          unlocked ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        {title}
      </Text>
      <Text
        className={`font-sans text-xs text-center ${
          unlocked ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        {subtitle}
      </Text>
      {!unlocked && (
        <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-[10px]">🔒</Text>
        </View>
      )}
    </View>
  );
}
