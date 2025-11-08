/**
 * Focus Programs Screen
 *
 * Displays guided focus programs and challenges
 * Features:
 * - Hero banner with description
 * - Quick action buttons (Skin Tasks, Focus Timer, Stretch, Weekly Tasks)
 * - New This Month section
 * - Popular Programs section
 * - Coming Soon section
 * - Unlock All Programs CTA
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  CheckSquare,
  Timer,
  Sparkles,
  CalendarDays,
  Lock,
  Sunrise,
} from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function FocusScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <ChevronLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="font-sans text-lg font-semibold text-gray-900">
            Focus Programs
          </Text>
          <View className="w-10 h-10" />
        </View>

        {/* Hero Banner */}
        <View className="px-6 mb-6">
          <LinearGradient
            colors={['#FFB89A', '#FFD4C4', '#FFF5F0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 shadow-sm"
          >
            <Text className="font-sans text-2xl font-bold text-brown leading-tight mb-2">
              Build lasting habits and{'\n'}find your focus with{'\n'}guided programs.
            </Text>
          </LinearGradient>
        </View>

        {/* Quick Action Buttons */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between gap-3">
            <QuickActionButton
              icon={CheckSquare}
              label="Skin Tasks"
              onPress={() => {}}
            />
            <QuickActionButton
              icon={Timer}
              label="Focus Timer"
              onPress={() => {}}
            />
            <QuickActionButton
              icon={Sparkles}
              label="Stretch"
              onPress={() => {}}
            />
            <QuickActionButton
              icon={CalendarDays}
              label="Weekly Tasks"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* New This Month Section */}
        <View className="mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4 px-6">
            New This Month
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
          >
            {/* Morning Charge - Active Program */}
            <ProgramCard
              title="5-Min Morning Charge"
              subtitle="Daily • Start your day right"
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              gradient={['#FFB89A', '#FFD4C4', '#FFF5F0']}
              locked={false}
              onPress={() => router.push('/morning-charge/onboarding-welcome')}
            />

            {/* Mindful Mornings */}
            <ProgramCard
              title="Mindful Mornings"
              subtitle="30 Days • Build a mindful morning"
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              gradient={['#8B7355', '#D4A574', '#FFD4C4']}
              locked
            />

            {/* Gratitude Pause - Active Program */}
            <ProgramCard
              title="Gratitude Pause"
              subtitle="5 Min • Deep dive gratitude"
              image="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop"
              gradient={['#FFD4C4', '#FFB89A', '#FF9F7F']}
              locked={false}
              onPress={() => router.push('/gratitude-pause/arrive')}
            />
          </ScrollView>
        </View>

        {/* Popular Programs Section */}
        <View className="mb-6">
          <Text className="font-sans text-xl font-bold text-gray-900 mb-4 px-6">
            Popular Programs
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
          >
            {/* Brain Dump Reset - Active Program */}
            <ProgramCard
              title="Brain Dump Reset"
              subtitle="5 Min • Clear your mind"
              image="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop"
              gradient={['#D4B5F0', '#E8D4F8', '#F5F0FF']}
              locked={false}
              onPress={() => router.push('/brain-dump/welcome')}
            />

            {/* Digital Detox */}
            <ProgramCard
              title="Digital Detox"
              subtitle="60 Days • Build a digital wellness"
              image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop"
              gradient={['#B8E6D5', '#7DD3B0', '#5FB89C']}
              locked
            />

            {/* Creative Flow */}
            <ProgramCard
              title="Creative Flow"
              subtitle="30 Days • Unlock cr..."
              image="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop"
              gradient={['#FFB89A', '#FF9F7F', '#FF8C6B']}
              locked
            />
          </ScrollView>
        </View>

        {/* Coming Soon Section */}
        <View className="px-6 mb-6">
          <View className="bg-peach-light rounded-3xl p-6 items-center">
            <Sparkles size={32} color="#FFB89A" strokeWidth={2} />
            <Text className="font-sans text-lg font-bold text-brown mt-3 mb-1 text-center">
              Coming Soon!
            </Text>
            <Text className="font-sans text-sm text-brown-dark text-center">
              More programs are on the way. Stay tuned for more ways to grow.
            </Text>
          </View>
        </View>

        {/* Unlock All Programs CTA */}
        <View className="px-6 pb-24">
          <TouchableOpacity
            className="bg-coral rounded-full py-4 shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Unlock All Programs
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="focus" />
    </SafeAreaView>
  );
}

// Quick Action Button Component
interface QuickActionButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
}

function QuickActionButton({ icon: Icon, label, onPress }: QuickActionButtonProps) {
  return (
    <TouchableOpacity
      className="flex-1 items-center"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center mb-2 shadow-sm">
        <Icon size={20} color="#FFB89A" strokeWidth={2} />
      </View>
      <Text className="font-sans text-[10px] font-medium text-gray-600 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// Program Card Component
interface ProgramCardProps {
  title: string;
  subtitle: string;
  image: string;
  gradient: string[];
  locked?: boolean;
  onPress?: () => void;
}

function ProgramCard({ title, subtitle, image, gradient, locked, onPress }: ProgramCardProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden shadow-md"
      activeOpacity={0.8}
      style={{ width: 180 }}
      onPress={onPress}
      disabled={locked}
    >
      {/* Image Background */}
      <View className="h-40 relative">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
          style={{ opacity: locked ? 0.6 : 1 }}
        />
        {/* Gradient Overlay - Lighter for active cards */}
        <LinearGradient
          colors={
            locked
              ? ['rgba(0,0,0,0.3)', ...gradient.map(c => `${c}CC`)] as any
              : ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', ...gradient.map(c => `${c}99`)] as any
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0"
        />

        {/* Lock Icon */}
        {locked && (
          <View className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 items-center justify-center">
            <Lock size={16} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        )}

        {/* Unlocked/Active Badge */}
        {!locked && (
          <View className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 shadow-sm">
            <Text className="font-sans text-xs font-bold text-mint">Active</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="bg-white p-3">
        <Text className="font-sans text-sm font-bold text-gray-900 mb-1" numberOfLines={1}>
          {title}
        </Text>
        <Text className="font-sans text-xs text-gray-500" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
