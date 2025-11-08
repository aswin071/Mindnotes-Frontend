/**
 * Brain Dump - Summary & Streak Screen
 *
 * Shows completion summary, pulse bar, streaks, and badges
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CheckCircle,
  Flame,
  Award,
  Share2,
  Globe,
  Zap,
  Brain,
  Target,
  TrendingUp,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function BrainDumpSummary() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const totalItems = parseInt((params.totalItems as string) || '0');
  const actionableCount = parseInt((params.actionableCount as string) || '0');
  const focusTask = params.focusTask as string;

  const currentStreak = 3; // Example: 3-day streak
  const globalUsers = 1247; // Example: global users who completed today

  useEffect(() => {
    // Pulse bar animation
    Animated.timing(pulseAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const pulseWidth = pulseAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Just completed my Brain Dump! 🧠✨\nCleared ${totalItems} thoughts and chose my focus for today. Feeling lighter!\n#BrainDumpReset #MentalClarity`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Pulse Bar */}
        <View className="bg-lavender px-6 pt-12 pb-8 rounded-b-3xl">
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-white/30 items-center justify-center mb-4">
              <CheckCircle size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            <Text className="font-sans text-4xl font-bold text-white mb-3 text-center">
              Brain Cleared! 🌿
            </Text>

            <Text className="font-sans text-base text-white/90 text-center">
              You just organized your mental space
            </Text>
          </View>

          {/* Pulse Energy Bar */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-sans text-sm font-semibold text-white">
                Daily Pulse
              </Text>
              <Zap size={16} color="#FFFFFF" />
            </View>
            <View className="h-3 bg-white/30 rounded-full overflow-hidden">
              <Animated.View
                className="h-full rounded-full"
                style={{
                  width: pulseWidth,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </View>
          </View>

          {/* Quick Summary */}
          <View className="bg-white/20 rounded-2xl p-4">
            <Text className="font-sans text-sm font-bold text-white text-center">
              You cleared {totalItems} thoughts, categorized {actionableCount} actions, and chose 1 focus. 🌿
            </Text>
          </View>
        </View>

        {/* Streak Section */}
        <Animated.View
          className="px-6 -mt-6 mb-6"
          style={{ opacity: fadeAnim }}
        >
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="flex-row items-center justify-center gap-3 mb-4">
              <Flame size={32} color="#FF6B5A" strokeWidth={2} />
              <Text className="font-sans text-4xl font-bold text-gray-900">
                {currentStreak}
              </Text>
              <Text className="font-sans text-lg text-gray-600">Day Streak</Text>
            </View>

            <Text className="font-sans text-sm text-gray-600 text-center mb-4">
              🔥 Brain Dump Streak — your mind's getting lighter
            </Text>

            {/* Progress Bar */}
            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <View
                className="h-full bg-coral rounded-full"
                style={{ width: `${(currentStreak / 7) * 100}%` }}
              />
            </View>
            <Text className="font-sans text-xs text-gray-500 text-center mt-2">
              {currentStreak} / 7 days this week
            </Text>
          </View>
        </Animated.View>

        {/* Focus Task Card */}
        {focusTask && (
          <View className="px-6 mb-6">
            <Text className="font-sans text-xl font-bold text-gray-900 mb-4">
              Your Focus for Today
            </Text>

            <View className="bg-mint-light rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-start gap-3 mb-3">
                <Target size={24} color="#7DD3B0" strokeWidth={2} />
                <Text className="flex-1 font-sans text-lg font-bold text-gray-900">
                  {focusTask}
                </Text>
              </View>

              <Text className="font-sans text-xs text-gray-600 mb-3">
                Added to your "Today's Task" list
              </Text>

              <TouchableOpacity
                className="bg-mint rounded-full py-3"
                activeOpacity={0.8}
              >
                <Text className="font-sans text-sm font-bold text-white text-center">
                  Start Focus Timer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Stats Grid */}
        <View className="px-6 mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4">
            Session Stats
          </Text>

          <View className="flex-row gap-3 mb-3">
            <StatCard
              icon={Brain}
              iconColor="#D4B5F0"
              iconBg="#E8D4F8"
              label="Thoughts Cleared"
              value={totalItems.toString()}
            />
            <StatCard
              icon={CheckCircle}
              iconColor="#7DD3B0"
              iconBg="#B8E6D5"
              label="Actions Found"
              value={actionableCount.toString()}
            />
          </View>

          <View className="flex-row gap-3">
            <StatCard
              icon={Target}
              iconColor="#FFB89A"
              iconBg="#FFD4C4"
              label="Focus Chosen"
              value={focusTask ? '1' : '0'}
            />
            <StatCard
              icon={TrendingUp}
              iconColor="#FF6B5A"
              iconBg="#FFD4C4"
              label="Total Dumps"
              value="12"
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
              title="Pulse Starter"
              subtitle="First dump"
              unlocked
            />
            <BadgeCard
              emoji="⚡"
              title="Steady Beat"
              subtitle="7-day streak"
              unlocked={currentStreak >= 7}
            />
            <BadgeCard
              emoji="🔥"
              title="Flow Charger"
              subtitle="30-day streak"
              unlocked={false}
            />
          </View>
        </View>

        {/* Community Pulse */}
        <View className="px-6 mb-6">
          <View className="bg-peach-light rounded-2xl p-5">
            <View className="flex-row items-center justify-center gap-2 mb-2">
              <Globe size={20} color="#FFB89A" />
              <Text className="font-sans text-base font-bold text-brown">
                Community Pulse
              </Text>
            </View>
            <Text className="font-sans text-sm text-brown-dark text-center">
              {globalUsers.toLocaleString()} people globally just completed their brain dump today 🌍
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 pb-8">
          {/* Share Button */}
          <TouchableOpacity
            className="bg-lavender rounded-2xl p-4 flex-row items-center justify-center gap-3 mb-3 shadow-sm"
            activeOpacity={0.8}
            onPress={handleShare}
          >
            <Share2 size={20} color="#FFFFFF" />
            <Text className="font-sans text-base font-bold text-white">
              Share Your Progress
            </Text>
          </TouchableOpacity>

          {/* View History */}
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 border border-gray-200 mb-3"
            activeOpacity={0.8}
          >
            <Text className="font-sans text-base font-semibold text-gray-900 text-center">
              View Brain Dump History
            </Text>
          </TouchableOpacity>

          {/* Back to Home */}
          <TouchableOpacity
            className="bg-coral rounded-full py-4 shadow-lg mb-3"
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Back to Home
            </Text>
          </TouchableOpacity>

          {/* Do Another Dump */}
          <TouchableOpacity
            className="py-3"
            activeOpacity={0.7}
            onPress={() => router.push('/brain-dump/welcome')}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Do Another Dump
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
