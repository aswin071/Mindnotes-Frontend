import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Sunrise, Heart, Zap, Target, CheckCircle, Play, Pause } from 'lucide-react-native';

interface MorningChargeProgramProps {
  onComplete?: () => void;
}

const PROGRAM_STEPS = [
  {
    id: 1,
    title: "Wake & Breathe",
    subtitle: "Start with Stillness",
    duration: 60,
    icon: Sunrise,
    prompts: [
      "Breathe in calm, breathe out tension.",
      "Each breath is a reset — slow down, you're in control.",
      "Inhale clarity, exhale clutter.",
      "Feel your breath anchor you in the present.",
      "Let this breath mark the start of a great day."
    ]
  },
  {
    id: 2,
    title: "Gratitude Spark",
    subtitle: "Fuel Your Heart",
    duration: 60,
    icon: Heart,
    prompts: [
      "What's one simple thing that made you smile recently?",
      "Who in your life are you thankful for today?",
      "What's something small but meaningful that you often overlook?",
      "What went right yesterday that you can carry into today?",
      "What's one comfort you're grateful for right now?"
    ]
  },
  {
    id: 3,
    title: "Positive Affirmation",
    subtitle: "Set Your Tone",
    duration: 60,
    icon: Zap,
    prompts: [
      "I am centered, capable, and ready for what's next.",
      "Today, I choose focus over fear.",
      "I move through this day with confidence and calm.",
      "I am becoming the best version of myself, one choice at a time.",
      "I radiate positive energy and attract growth."
    ]
  },
  {
    id: 4,
    title: "Daily Clarity Prompt",
    subtitle: "Set Your Direction",
    duration: 90,
    icon: Target,
    prompts: [
      "What's one action that would make today feel successful?",
      "If I give my energy to one thing today, it should be ___.",
      "How do I want to feel by the end of today?",
      "What small win can I celebrate tonight?",
      "What would make today flow effortlessly?"
    ]
  },
  {
    id: 5,
    title: "Charge Close",
    subtitle: "You're Ready",
    duration: 30,
    icon: CheckCircle,
    prompts: [
      "Day {{streak}} — You're not just waking up, you're leveling up.",
      "Today is another chance to build your story.",
      "Keep your energy — protect your peace.",
      "Momentum grows with every morning like this.",
      "Smile. You've already won the first 5 minutes."
    ]
  }
];

export function MorningChargeProgram({ onComplete }: MorningChargeProgramProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PROGRAM_STEPS[0].duration);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [streak] = useState(7); // Mock streak data
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentStepData = PROGRAM_STEPS[currentStep];
  const currentPrompt = currentStepData.prompts[Math.floor(Math.random() * currentStepData.prompts.length)]
    .replace('{{streak}}', streak.toString());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleStepComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStepComplete = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    
    if (currentStep < PROGRAM_STEPS.length - 1) {
      // Animate transition
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentStep(prev => prev + 1);
      setTimeLeft(PROGRAM_STEPS[currentStep + 1].duration);
      setIsActive(false);
    } else {
      // Program complete
      onComplete?.();
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetProgram = () => {
    setCurrentStep(0);
    setTimeLeft(PROGRAM_STEPS[0].duration);
    setIsActive(false);
    setCompletedSteps([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentStep + (completedSteps.includes(currentStep) ? 1 : 0)) / PROGRAM_STEPS.length) * 100;

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <Sunrise color="#F59E0B" size={24} />
          <Text className="text-xl font-bold text-black ml-2">5-Minute Morning Charge</Text>
        </View>
        <Text className="text-gray-600">Start your day with intention and energy</Text>
        
        {/* Progress Bar */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm text-gray-600">Progress</Text>
            <Text className="text-sm font-medium text-black">{Math.round(progress)}%</Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full">
            <View 
              className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      </View>

      {/* Current Step */}
      <Animated.View style={{ opacity: fadeAnim }} className="mb-6">
        <View className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
          <View className="flex-row items-center mb-4">
            <View className="bg-yellow-400 rounded-full p-3 mr-4">
              <currentStepData.icon color="#000000" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-black">{currentStepData.title}</Text>
              <Text className="text-gray-600">{currentStepData.subtitle}</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-black">{formatTime(timeLeft)}</Text>
              <Text className="text-xs text-gray-500">remaining</Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-black text-center leading-relaxed">
              {currentPrompt}
            </Text>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={toggleTimer}
              className="flex-1 bg-yellow-400 rounded-xl py-3 flex-row items-center justify-center"
            >
              {isActive ? (
                <Pause color="#000000" size={20} />
              ) : (
                <Play color="#000000" size={20} />
              )}
              <Text className="text-black font-semibold ml-2">
                {isActive ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleStepComplete}
              className="bg-gray-100 rounded-xl px-4 py-3"
            >
              <Text className="text-gray-700 font-medium">Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Step Overview */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-black mb-4">Program Steps</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {PROGRAM_STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = index === currentStep;
              const IconComponent = step.icon;
              
              return (
                <View
                  key={step.id}
                  className={`w-32 p-3 rounded-xl border ${
                    isCurrent 
                      ? 'bg-yellow-50 border-yellow-300' 
                      : isCompleted 
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <View className="flex-row items-center mb-2">
                    <IconComponent 
                      color={isCurrent ? '#F59E0B' : isCompleted ? '#10B981' : '#6B7280'} 
                      size={16} 
                    />
                    {isCompleted && (
                      <CheckCircle color="#10B981" size={12} className="ml-1" />
                    )}
                  </View>
                  <Text className={`text-sm font-medium ${
                    isCurrent ? 'text-yellow-800' : isCompleted ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {Math.floor(step.duration / 60)}:{(step.duration % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Reset Button */}
      {completedSteps.length > 0 && (
        <TouchableOpacity
          onPress={resetProgram}
          className="bg-gray-100 rounded-xl py-3 items-center"
        >
          <Text className="text-gray-700 font-medium">Reset Program</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}