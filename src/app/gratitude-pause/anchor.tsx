/**
 * Gratitude Pause - Anchor & Completion
 *
 * Final breathing and summary with unlocks
 * Timer: 4:45 - 5:00 (15 seconds)
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Sparkles, Award, TrendingUp, Wind } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function GratitudeAnchor() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const gratitudeLine = params.gratitudeLine as string;

  const breatheAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const [breathPhase, setBreathPhase] = React.useState<'in' | 'out'>('in');
  const [showSummary, setShowSummary] = React.useState(false);

  useEffect(() => {
    // Breathing animation
    const breathCycle = () => {
      setBreathPhase('in');
      Animated.timing(breatheAnim, {
        toValue: 1.3,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setBreathPhase('out');
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }).start();
      });
    };

    breathCycle();

    // Auto-show summary after 10 seconds
    const timer = setTimeout(() => {
      setShowSummary(true);
      // Animate pulse bar
      Animated.timing(pulseAnim, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const pulseWidth = pulseAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  if (!showSummary) {
    // Breathing Screen
    return (
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={['#FFD4C4', '#FFB89A', '#FF9F7F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
          <View className="flex-1 items-center justify-center px-6">
            {/* Icon */}
            <View className="mb-8">
              <Wind size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            {/* Title */}
            <Text className="font-sans text-3xl font-bold text-white mb-4 text-center">
              Anchor
            </Text>

            <Text className="font-sans text-lg text-white/90 mb-12 text-center">
              Inhale gratitude, exhale tension
            </Text>

            {/* Breathing Circle */}
            <Animated.View
              className="w-56 h-56 rounded-full bg-white/30 items-center justify-center mb-8"
              style={{ transform: [{ scale: breatheAnim }] }}
            >
              <View className="w-40 h-40 rounded-full bg-white/40 items-center justify-center">
                <View className="w-24 h-24 rounded-full bg-white items-center justify-center">
                  <Heart size={40} color="#FFB89A" fill="#FFB89A" strokeWidth={0} />
                </View>
              </View>
            </Animated.View>

            {/* Breathing Instructions */}
            <View className="items-center mb-12">
              <Text className="font-sans text-2xl font-bold text-white mb-2">
                {breathPhase === 'in' ? 'Inhale Gratitude' : 'Exhale Tension'}
              </Text>
              <Text className="font-sans text-sm text-white/80">
                {breathPhase === 'in' ? 'Breathe in deeply' : 'Let go slowly'}
              </Text>
            </View>

            {/* Quote Card */}
            <View className="bg-white/20 rounded-2xl p-5 mb-8 max-w-sm">
              <Text className="font-sans text-sm text-white/70 mb-2 text-center">
                Your gratitude:
              </Text>
              <Text className="font-sans text-base font-bold text-white text-center italic">
                "{gratitudeLine}"
              </Text>
            </View>

            {/* Skip Button */}
            <TouchableOpacity
              className="bg-white/20 rounded-full px-8 py-3"
              activeOpacity={0.8}
              onPress={() => setShowSummary(true)}
            >
              <Text className="font-sans text-sm font-semibold text-white">
                Continue →
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // Summary/Completion Screen
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Pulse Bar */}
        <View className="bg-peach px-6 pt-12 pb-8 rounded-b-3xl">
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-white/30 items-center justify-center mb-4">
              <Sparkles size={48} color="#FFFFFF" strokeWidth={1.5} />
            </View>

            <Text className="font-sans text-4xl font-bold text-white mb-3 text-center">
              Flow Moment{'\n'}Unlocked! ✨
            </Text>

            <Text className="font-sans text-base text-white/90 text-center">
              You've completed your first gratitude flow today
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-sans text-sm font-semibold text-white">
                Positivity Pulse
              </Text>
              <Sparkles size={16} color="#FFFFFF" />
            </View>
            <View className="h-3 bg-white/30 rounded-full overflow-hidden">
              <Animated.View
                className="h-full rounded-full bg-white"
                style={{ width: pulseWidth }}
              />
            </View>
          </View>

          {/* Summary Message */}
          <View className="bg-white/20 rounded-2xl p-4">
            <Text className="font-sans text-sm font-bold text-white text-center">
              You explored 3 gratitudes deeply and chose one to express 🌸
            </Text>
          </View>
        </View>

        {/* Gratitude Card */}
        <View className="px-6 -mt-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-peach">
            <Text className="font-sans text-xs font-semibold text-gray-500 mb-3">
              SAVED AS QUOTE CARD
            </Text>
            <Text className="font-sans text-xl font-bold text-gray-900 italic mb-4">
              "{gratitudeLine}"
            </Text>
            <Text className="font-sans text-xs text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4">
            Your Progress
          </Text>

          <View className="flex-row gap-3">
            <StatCard
              icon={Heart}
              iconColor="#FFB89A"
              iconBg="#FFD4C4"
              label="Gratitudes Today"
              value="3"
            />
            <StatCard
              icon={TrendingUp}
              iconColor="#7DD3B0"
              iconBg="#B8E6D5"
              label="Total Sessions"
              value="8"
            />
          </View>
        </View>

        {/* Growth Hook */}
        <View className="px-6 mb-6">
          <View className="bg-mint-light rounded-2xl p-5">
            <View className="flex-row items-start gap-3">
              <Award size={24} color="#7DD3B0" strokeWidth={2} />
              <View className="flex-1">
                <Text className="font-sans text-base font-bold text-mint mb-2">
                  💡 Ready for more?
                </Text>
                <Text className="font-sans text-sm text-gray-700 mb-3">
                  After a week of practice, try our 10-minute Deep Gratitude Sprint for even deeper insights.
                </Text>
                <Text className="font-sans text-xs text-gray-600">
                  Unlocks after 7 consecutive days
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 border border-gray-200 mb-3"
            activeOpacity={0.8}
          >
            <Text className="font-sans text-base font-semibold text-gray-900 text-center">
              View All Quote Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-peach rounded-full py-4 shadow-lg mb-3"
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Save My Gratitude
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3"
            activeOpacity={0.7}
            onPress={() => router.push('/gratitude-pause/arrive')}
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
