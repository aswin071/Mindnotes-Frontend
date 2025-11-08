/**
 * Gratitude Pause - Arrive Screen
 *
 * Welcome and initial breathing exercise
 * Timer: 0:00 - 0:30
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function GratitudeArrive() {
  const router = useRouter();
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const [breathPhase, setBreathPhase] = React.useState<'in' | 'out'>('in');

  useEffect(() => {
    // Single deep breath animation
    const breathCycle = () => {
      setBreathPhase('in');
      Animated.timing(breatheAnim, {
        toValue: 1.4,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setBreathPhase('out');
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }).start();
      });
    };

    breathCycle();
    const interval = setInterval(breathCycle, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#FFD4C4', '#FFB89A', '#FF9F7F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-8 pb-6 justify-between">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
              <Heart size={48} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />
            </View>

            <Text className="font-sans text-3xl font-bold text-white text-center mb-2">
              Gratitude Pause
            </Text>

            <Text className="font-sans text-base text-white/90 text-center">
              Deep Dive — 5 Minutes
            </Text>
          </View>

          {/* Main Message */}
          <View className="mb-8">
            <Text className="font-sans text-xl font-bold text-white text-center mb-3">
              One calm breath.{'\n'}Let's notice what's good.
            </Text>

            <Text className="font-sans text-sm text-white/80 text-center mb-6">
              Fill your mind with positivity and motivation
            </Text>

            {/* Science Note */}
            <View className="bg-white/10 rounded-xl p-3">
              <Text className="font-sans text-xs text-white/80 text-center">
                <Text className="font-bold">Science:</Text> Practicing gratitude activates dopamine and serotonin pathways
              </Text>
            </View>
          </View>

          {/* Breathing Circle */}
          <View className="items-center mb-8">
            <Animated.View
              className="w-40 h-40 rounded-full bg-white/30 items-center justify-center mb-6"
              style={{ transform: [{ scale: breatheAnim }] }}
            >
              <View className="w-28 h-28 rounded-full bg-white/40 items-center justify-center">
                <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
                  <Heart size={28} color="#FFB89A" fill="#FFB89A" strokeWidth={0} />
                </View>
              </View>
            </Animated.View>

            {/* Breathing Instruction */}
            <Text className="font-sans text-lg font-semibold text-white mb-1">
              {breathPhase === 'in' ? 'Breathe In' : 'Breathe Out'}
            </Text>
            <Text className="font-sans text-sm text-white/70">
              One deep breath
            </Text>
          </View>

          {/* Bottom Spacer */}
          <View className="flex-1" />

          {/* CTA Buttons */}
          <View>
            <TouchableOpacity
              className="bg-white rounded-full py-4 shadow-lg mb-3"
              activeOpacity={0.8}
              onPress={() => router.push('/gratitude-pause/list')}
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
