import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Clock, CheckSquare, Crown, ArrowRight, Sunrise } from 'lucide-react-native';
import { router } from 'expo-router';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { TaskPlanner } from '@/components/TaskPlanner';
import { MorningChargeProgram } from '@/components/MorningChargeProgram';

export default function FocusScreen() {
  const [isPremium, setIsPremium] = useState(false); // Mock premium status
  const [activeSection, setActiveSection] = useState<'overview' | 'tasks' | 'timer' | 'reflection' | 'morning'>('overview');

  if (!isPremium) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View className="flex-1 items-center justify-center px-5">
          <View className="bg-yellow-50 rounded-3xl p-8 items-center border border-yellow-200">
            <Crown color="#F59E0B" size={48} />
            <Text className="text-2xl font-bold text-black mt-4 mb-2">Premium Feature</Text>
            <Text className="text-gray-600 text-center leading-relaxed mb-6">
              Unlock structured focus sessions with task planning, Pomodoro timers, morning programs, and guided reflection to boost your productivity.
            </Text>
            
            <View className="w-full space-y-3 mb-6">
              <View className="flex-row items-center">
                <Sunrise color="#10B981" size={20} />
                <Text className="text-gray-700 ml-3">5-Minute Morning Charge</Text>
              </View>
              <View className="flex-row items-center">
                <CheckSquare color="#10B981" size={20} />
                <Text className="text-gray-700 ml-3">Task planning & organization</Text>
              </View>
              <View className="flex-row items-center">
                <Clock color="#10B981" size={20} />
                <Text className="text-gray-700 ml-3">Pomodoro focus timer</Text>
              </View>
              <View className="flex-row items-center">
                <Target color="#10B981" size={20} />
                <Text className="text-gray-700 ml-3">Guided reflection sessions</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/premium')}
              className="bg-yellow-400 rounded-xl px-8 py-4 w-full items-center"
            >
              <Text className="text-black font-semibold text-lg">Upgrade to Premium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setIsPremium(true)}
              className="mt-4"
            >
              <Text className="text-gray-500 text-sm">Try Demo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View className="px-5 pt-2 pb-4">
        <View className="flex-row items-center mb-1">
          <Crown color="#F59E0B" size={26} />
          <Text className="text-3xl font-bold text-black ml-2">Focus</Text>
        </View>
        <Text className="text-base text-gray-600">Structured productivity sessions</Text>
      </View>

      {/* Navigation */}
      <View className="px-5 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {[
              { key: 'overview', label: 'Overview', icon: Target },
              { key: 'morning', label: 'Morning', icon: Sunrise },
              { key: 'tasks', label: 'Tasks', icon: CheckSquare },
              { key: 'timer', label: 'Timer', icon: Clock },
              { key: 'reflection', label: 'Reflect', icon: Target },
            ].map(({ key, label, icon: Icon }, index, array) => (
              <TouchableOpacity
                key={key}
                onPress={() => setActiveSection(key as any)}
                className={`flex-row items-center px-5 py-3 rounded-full ${
                  activeSection === key ? 'bg-yellow-400' : 'bg-gray-100 border-2 border-gray-200'
                } ${index < array.length - 1 ? 'mr-3' : ''}`}
                activeOpacity={0.7}
              >
                <Icon
                  color={activeSection === key ? '#000000' : '#6B7280'}
                  size={18}
                />
                <Text className={`ml-2 font-semibold text-base ${
                  activeSection === key ? 'text-black' : 'text-gray-600'
                }`}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeSection === 'overview' && (
          <View className="px-5">
            {/* Morning Charge Feature */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-black mb-4">Start Your Day Right</Text>
              <TouchableOpacity
                onPress={() => setActiveSection('morning')}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
              >
                <View className="flex-row items-center mb-3">
                  <View className="bg-yellow-400 rounded-full p-3 mr-4">
                    <Sunrise color="#000000" size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-black font-semibold text-lg">5-Minute Morning Charge</Text>
                    <Text className="text-gray-600">Wake & Breathe • Gratitude • Affirmation • Clarity</Text>
                  </View>
                  <ArrowRight color="#F59E0B" size={20} />
                </View>
                <Text className="text-gray-700 text-sm">
                  Start with intention, breathe with purpose, and set your energy for the day ahead.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Today's Focus */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-black mb-4">Today's Focus</Text>
              <View className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <Text className="text-black font-semibold text-lg mb-2">Complete Project Proposal</Text>
                <Text className="text-gray-600 mb-4">2 Pomodoro sessions • 50 minutes</Text>
                <TouchableOpacity 
                  onPress={() => setActiveSection('timer')}
                  className="bg-yellow-400 rounded-xl py-3 px-6 self-start flex-row items-center"
                >
                  <Text className="text-black font-semibold mr-2">Start Session</Text>
                  <ArrowRight color="#000000" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-black mb-4">Quick Actions</Text>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => setActiveSection('tasks')}
                  className="flex-1 bg-gray-50 rounded-2xl py-5 items-center border-2 border-gray-200 active:bg-gray-200 mr-3"
                  activeOpacity={0.7}
                >
                  <CheckSquare color="#374151" size={26} />
                  <Text className="text-gray-700 font-semibold mt-3 text-base">Plan Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveSection('timer')}
                  className="flex-1 bg-gray-50 rounded-2xl py-5 items-center border-2 border-gray-200 active:bg-gray-200"
                  activeOpacity={0.7}
                >
                  <Clock color="#374151" size={26} />
                  <Text className="text-gray-700 font-semibold mt-3 text-base">Start Timer</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Sessions */}
            <View className="mb-20">
              <Text className="text-lg font-semibold text-black mb-4">Recent Sessions</Text>
              <View>
                <View className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-black font-semibold text-base">Morning Charge</Text>
                    <Text className="text-sm text-gray-500 font-medium">This morning</Text>
                  </View>
                  <Text className="text-gray-600 text-base">5 minutes • Completed all steps</Text>
                </View>
                <View className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-black font-semibold text-base">Deep Work Session</Text>
                    <Text className="text-sm text-gray-500 font-medium">2 hours ago</Text>
                  </View>
                  <Text className="text-gray-600 text-base">3 Pomodoros • 75 minutes focused</Text>
                </View>
                <View className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-black font-semibold text-base">Email Processing</Text>
                    <Text className="text-sm text-gray-500 font-medium">Yesterday</Text>
                  </View>
                  <Text className="text-gray-600 text-base">1 Pomodoro • 25 minutes focused</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeSection === 'morning' && (
          <View className="px-5 mb-20">
            <MorningChargeProgram 
              onComplete={() => {
                // Handle program completion
                console.log('Morning Charge completed!');
              }}
            />
          </View>
        )}

        {activeSection === 'tasks' && (
          <View className="px-5">
            <TaskPlanner />
          </View>
        )}

        {activeSection === 'timer' && (
          <View className="px-5">
            <PomodoroTimer />
          </View>
        )}

        {activeSection === 'reflection' && (
          <View className="px-5 mb-20">
            <Text className="text-lg font-semibold text-black mb-4">Post-Focus Reflection</Text>
            <View className="bg-gray-50 rounded-2xl p-6">
              <Text className="text-gray-700 mb-4 text-base">
                Take a moment to reflect on your focus session:
              </Text>
              <View>
                <TouchableOpacity className="bg-white rounded-2xl p-5 border-2 border-gray-200 active:bg-gray-50 mb-4" activeOpacity={0.7}>
                  <Text className="text-black font-semibold mb-2 text-base">How focused did you feel?</Text>
                  <Text className="text-gray-600 text-base">Rate your concentration level</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-2xl p-5 border-2 border-gray-200 active:bg-gray-50 mb-4" activeOpacity={0.7}>
                  <Text className="text-black font-semibold mb-2 text-base">What did you accomplish?</Text>
                  <Text className="text-gray-600 text-base">Document your progress</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-2xl p-5 border-2 border-gray-200 active:bg-gray-50" activeOpacity={0.7}>
                  <Text className="text-black font-semibold mb-2 text-base">What would you improve?</Text>
                  <Text className="text-gray-600 text-base">Learn from this session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}