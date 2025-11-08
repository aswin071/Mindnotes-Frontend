/**
 * Brain Dump - Completion & Breathing
 *
 * Final breathing exercise and summary
 * Timer: 4:45 - 5:00
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wind } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function BrainDumpComplete() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const breatheAnim = useRef(new Animated.Value(1)).current;
  const [breathPhase, setBreathPhase] = React.useState<'in' | 'hold' | 'out'>('in');
  const [breathCount, setBreathCount] = React.useState(0);

  useEffect(() => {
    // Breathing animation: 4 in, 2 hold, 6 out
    const breathCycle = () => {
      // Breathe in (4 seconds)
      setBreathPhase('in');
      Animated.timing(breatheAnim, {
        toValue: 1.3,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        // Hold (2 seconds)
        setBreathPhase('hold');
        setTimeout(() => {
          // Breathe out (6 seconds)
          setBreathPhase('out');
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
          }).start(() => {
            setBreathCount((prev) => prev + 1);
          });
        }, 2000);
      });
    };

    breathCycle();
    const interval = setInterval(breathCycle, 12000); // Total cycle: 12 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    router.push({
      pathname: '/brain-dump/summary',
      params: {
        ...params,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#B8E6D5', '#7DD3B0', '#5FB89C']}
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
            Close & Breathe
          </Text>

          <Text className="font-sans text-base text-white/90 mb-12 text-center">
            You just cleared your mental desk.{'\n'}
            Take one calm breath.
          </Text>

          {/* Breathing Circle */}
          <Animated.View
            className="w-56 h-56 rounded-full bg-white/30 items-center justify-center mb-8"
            style={{ transform: [{ scale: breatheAnim }] }}
          >
            <View className="w-40 h-40 rounded-full bg-white/40 items-center justify-center">
              <View className="w-24 h-24 rounded-full bg-white items-center justify-center">
                <Text className="font-sans text-4xl font-bold text-mint">
                  {breathPhase === 'in' ? '4' : breathPhase === 'hold' ? '2' : '6'}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Breathing Instructions */}
          <View className="items-center mb-12">
            <Text className="font-sans text-2xl font-bold text-white mb-2">
              {breathPhase === 'in' && 'Breathe In'}
              {breathPhase === 'hold' && 'Hold'}
              {breathPhase === 'out' && 'Breathe Out'}
            </Text>
            <Text className="font-sans text-sm text-white/80">
              {breathPhase === 'in' && 'for 4 seconds'}
              {breathPhase === 'hold' && 'for 2 seconds'}
              {breathPhase === 'out' && 'for 6 seconds'}
            </Text>
          </View>

          {/* Completion Message */}
          <View className="bg-white/20 rounded-2xl p-4 mb-8">
            <Text className="font-sans text-sm text-white text-center">
              🌿 Your mind is lighter now
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-white rounded-full px-12 py-4 shadow-lg"
            activeOpacity={0.8}
            onPress={handleFinish}
          >
            <Text className="font-sans text-lg font-bold text-mint text-center">
              Save My Dump
            </Text>
          </TouchableOpacity>

          {/* Skip Option */}
          <TouchableOpacity
            className="mt-4 py-3"
            activeOpacity={0.7}
            onPress={handleFinish}
          >
            <Text className="font-sans text-sm font-medium text-white/70 text-center">
              Skip Breathing
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
