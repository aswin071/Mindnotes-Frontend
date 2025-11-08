/**
 * Morning Charge - Main Program Screen
 *
 * Interactive 5-minute morning charge program with all steps
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Wind,
  Heart,
  Sparkles,
  Lightbulb,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Mic,
  Check,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

type Step = 'breathe' | 'gratitude' | 'affirmation' | 'clarity' | 'complete';

export default function MorningChargeProgram() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('breathe');
  const [gratitudeText, setGratitudeText] = useState('');
  const [selectedAffirmation, setSelectedAffirmation] = useState('');
  const [clarityAnswer, setClarityAnswer] = useState('');
  const [breathCount, setBreathCount] = useState(0);

  const affirmations = [
    'I am focused, calm, and ready to grow today',
    'I embrace today with gratitude and purpose',
    'I am capable of achieving my goals',
    'Today, I choose peace and productivity',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 'breathe':
        return (
          <BreatheStep
            breathCount={breathCount}
            onComplete={() => {
              setBreathCount(3);
              setCurrentStep('gratitude');
            }}
          />
        );
      case 'gratitude':
        return (
          <GratitudeStep
            value={gratitudeText}
            onChange={setGratitudeText}
            onNext={() => setCurrentStep('affirmation')}
            onBack={() => setCurrentStep('breathe')}
          />
        );
      case 'affirmation':
        return (
          <AffirmationStep
            affirmations={affirmations}
            selected={selectedAffirmation}
            onSelect={setSelectedAffirmation}
            onNext={() => setCurrentStep('clarity')}
            onBack={() => setCurrentStep('gratitude')}
          />
        );
      case 'clarity':
        return (
          <ClarityStep
            value={clarityAnswer}
            onChange={setClarityAnswer}
            onNext={() => setCurrentStep('complete')}
            onBack={() => setCurrentStep('affirmation')}
          />
        );
      case 'complete':
        return <CompleteStep onFinish={() => router.push('/morning-charge/completion')} />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Progress Bar */}
      <View className="px-6 pt-4">
        <View className="flex-row gap-1">
          {['breathe', 'gratitude', 'affirmation', 'clarity', 'complete'].map((step, index) => (
            <View
              key={step}
              className={`flex-1 h-1 rounded-full ${
                ['breathe', 'gratitude', 'affirmation', 'clarity', 'complete'].indexOf(
                  currentStep
                ) >= index
                  ? 'bg-peach'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </View>
      </View>

      {renderStep()}
    </SafeAreaView>
  );
}

// Step 1: Breathe Component
interface BreatheStepProps {
  breathCount: number;
  onComplete: () => void;
}

function BreatheStep({ breathCount, onComplete }: BreatheStepProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const breathe = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCount((prev) => prev + 1);
        setPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      });
    };

    breathe();
  }, [count]);

  useEffect(() => {
    if (count >= 3) {
      setTimeout(onComplete, 2000);
    }
  }, [count]);

  return (
    <LinearGradient
      colors={['#B8E6D5', '#7DD3B0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="flex-1 items-center justify-center px-6">
        <Wind size={48} color="#FFFFFF" strokeWidth={1.5} className="mb-6" />

        <Text className="font-sans text-3xl font-bold text-white mb-4 text-center">
          Wake & Breathe
        </Text>

        <Text className="font-sans text-sm text-white/90 mb-12 text-center">
          Take your first intentional breath of the day
        </Text>

        {/* Breathing Circle */}
        <Animated.View
          className="w-48 h-48 rounded-full bg-white/30 items-center justify-center mb-8"
          style={{ transform: [{ scale: scaleAnim }] }}
        >
          <View className="w-32 h-32 rounded-full bg-white/40 items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-white" />
          </View>
        </Animated.View>

        <Text className="font-sans text-2xl font-bold text-white mb-2">
          {phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
        </Text>

        <Text className="font-sans text-lg text-white/80 mb-8">
          {count} / 3 breaths
        </Text>

        {/* Skip Button */}
        <TouchableOpacity
          className="bg-white/20 rounded-full px-6 py-3"
          activeOpacity={0.8}
          onPress={onComplete}
        >
          <Text className="font-sans text-sm font-semibold text-white">
            Skip →
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// Step 2: Gratitude Component
interface GratitudeStepProps {
  value: string;
  onChange: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function GratitudeStep({ value, onChange, onNext, onBack }: GratitudeStepProps) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-peach-light items-center justify-center mb-4">
            <Heart size={32} color="#FF6B5A" strokeWidth={2} />
          </View>

          <Text className="font-sans text-3xl font-bold text-gray-900 mb-3 text-center">
            Gratitude Spark
          </Text>

          <Text className="font-sans text-base text-gray-600 text-center">
            Write one thing you're grateful for today
          </Text>
        </View>

        {/* Text Input */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <TextInput
            className="font-sans text-base text-gray-900 min-h-[120px]"
            placeholder="I'm grateful for..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Voice Note Option */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 bg-mint-light rounded-full py-3 mb-6"
          activeOpacity={0.8}
        >
          <Mic size={20} color="#7DD3B0" />
          <Text className="font-sans text-sm font-semibold text-mint">
            Or record a voice note
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-6">
        <View className="flex-row gap-3 mb-2">
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded-full py-4"
            activeOpacity={0.8}
            onPress={onBack}
          >
            <Text className="font-sans text-base font-semibold text-gray-600 text-center">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 rounded-full py-4 ${
              value.trim() ? 'bg-coral' : 'bg-coral/50'
            }`}
            activeOpacity={0.8}
            onPress={onNext}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip Option */}
        {!value.trim() && (
          <TouchableOpacity
            className="py-2"
            activeOpacity={0.7}
            onPress={onNext}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Skip this step
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Step 3: Affirmation Component
interface AffirmationStepProps {
  affirmations: string[];
  selected: string;
  onSelect: (affirmation: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function AffirmationStep({
  affirmations,
  selected,
  onSelect,
  onNext,
  onBack,
}: AffirmationStepProps) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-lavender-light items-center justify-center mb-4">
            <Sparkles size={32} color="#D4B5F0" strokeWidth={2} />
          </View>

          <Text className="font-sans text-3xl font-bold text-gray-900 mb-3 text-center">
            Positive Affirmation
          </Text>

          <Text className="font-sans text-base text-gray-600 text-center">
            Choose your daily affirmation
          </Text>
        </View>

        {/* Affirmation Options */}
        <View className="space-y-3 mb-6">
          {affirmations.map((affirmation, index) => (
            <TouchableOpacity
              key={index}
              className={`rounded-2xl p-4 ${
                selected === affirmation ? 'bg-lavender-light border-2 border-lavender' : 'bg-white'
              }`}
              activeOpacity={0.8}
              onPress={() => onSelect(affirmation)}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    selected === affirmation ? 'border-lavender bg-lavender' : 'border-gray-300'
                  }`}
                >
                  {selected === affirmation && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                </View>
                <Text
                  className={`flex-1 font-sans text-base ${
                    selected === affirmation ? 'font-semibold text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {affirmation}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-6">
        <View className="flex-row gap-3 mb-2">
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded-full py-4"
            activeOpacity={0.8}
            onPress={onBack}
          >
            <Text className="font-sans text-base font-semibold text-gray-600 text-center">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 rounded-full py-4 ${selected ? 'bg-coral' : 'bg-coral/50'}`}
            activeOpacity={0.8}
            onPress={onNext}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip Option */}
        {!selected && (
          <TouchableOpacity
            className="py-2"
            activeOpacity={0.7}
            onPress={onNext}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Skip this step
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Step 4: Clarity Component
interface ClarityStepProps {
  value: string;
  onChange: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function ClarityStep({ value, onChange, onNext, onBack }: ClarityStepProps) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-peach-light items-center justify-center mb-4">
            <Lightbulb size={32} color="#FFB89A" strokeWidth={2} />
          </View>

          <Text className="font-sans text-3xl font-bold text-gray-900 mb-3 text-center">
            Daily Clarity
          </Text>

          <Text className="font-sans text-base text-gray-600 text-center">
            What's the one thing that will make today great?
          </Text>
        </View>

        {/* Text Input */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <TextInput
            className="font-sans text-base text-gray-900 min-h-[120px]"
            placeholder="Today will be great if I..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Alternative Prompt */}
        <View className="bg-peach-light rounded-2xl p-4 mb-6">
          <Text className="font-sans text-sm font-semibold text-brown mb-2">
            Alternative Prompt:
          </Text>
          <Text className="font-sans text-sm text-brown-dark">
            "If I only finish one task today, it should be ___"
          </Text>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-6">
        <View className="flex-row gap-3 mb-2">
          <TouchableOpacity
            className="flex-1 bg-gray-100 rounded-full py-4"
            activeOpacity={0.8}
            onPress={onBack}
          >
            <Text className="font-sans text-base font-semibold text-gray-600 text-center">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 rounded-full py-4 ${value.trim() ? 'bg-coral' : 'bg-coral/50'}`}
            activeOpacity={0.8}
            onPress={onNext}
          >
            <Text className="font-sans text-base font-bold text-white text-center">
              Complete
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip Option */}
        {!value.trim() && (
          <TouchableOpacity
            className="py-2"
            activeOpacity={0.7}
            onPress={onNext}
          >
            <Text className="font-sans text-sm font-medium text-gray-500 text-center">
              Skip this step
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Step 5: Complete Component
interface CompleteStepProps {
  onFinish: () => void;
}

function CompleteStep({ onFinish }: CompleteStepProps) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#FFB89A', '#FFD4C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center justify-center px-6"
    >
      <Animated.View
        className="items-center"
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        <View className="w-32 h-32 rounded-full bg-white/30 items-center justify-center mb-6">
          <Trophy size={64} color="#FFFFFF" strokeWidth={1.5} />
        </View>

        <Text className="font-sans text-4xl font-bold text-white mb-4 text-center">
          Charge Complete!
        </Text>

        <Text className="font-sans text-lg text-white/90 mb-8 text-center">
          You're ready to take on the day with intention and focus
        </Text>

        <TouchableOpacity
          className="bg-white rounded-full px-12 py-4 shadow-lg"
          activeOpacity={0.8}
          onPress={onFinish}
        >
          <Text className="font-sans text-lg font-bold text-peach">
            See My Progress
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}
