import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { ArrowLeft, Crown, Check, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';

const features = [
  {
    icon: '🎯',
    title: 'Focus Sessions',
    description: 'Structured productivity sessions with Pomodoro timers and task planning'
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Detailed insights into your journaling patterns and mood trends'
  },
  {
    icon: '☁️',
    title: 'Cloud Sync',
    description: 'Access your journal entries across all your devices seamlessly'
  },
  {
    icon: '🎨',
    title: 'Custom Themes',
    description: 'Personalize your journaling experience with beautiful themes'
  },
  {
    icon: '📱',
    title: 'Widget Support',
    description: 'Quick access to journaling prompts right from your home screen'
  },
  {
    icon: '🔒',
    title: 'Enhanced Privacy',
    description: 'Advanced encryption and privacy controls for your personal thoughts'
  }
];

const plans = [
  {
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    popular: false
  },
  {
    name: 'Yearly',
    price: '$39.99',
    period: '/year',
    popular: true,
    savings: 'Save 33%'
  }
];

export default function PremiumScreen() {
  const handleSubscribe = (plan: string) => {
    // In a real app, this would handle the subscription process
    console.log('Subscribe to:', plan);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.neutral.beige }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.beige} />
      {/* Header */}
      <View className="flex-row items-center justify-between p-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.gray[700]} size={24} />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Crown color={colors.primary.yellowDark} size={24} />
          <Text className="text-lg font-semibold text-gray-800 ml-2">Premium</Text>
        </View>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="px-6 py-8 items-center">
          <View className="bg-yellow-100 rounded-full p-6 mb-6">
            <Crown color={colors.primary.yellowDark} size={48} />
          </View>
          <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
            Unlock Your Full Potential
          </Text>
          <Text className="text-gray-600 text-center text-base leading-relaxed">
            Take your mindfulness journey to the next level with premium features designed to enhance your reflection and focus.
          </Text>
        </View>

        {/* Features */}
        <View className="px-6 py-8">
          <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
            What's Included
          </Text>
          <View className="space-y-4">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-start bg-white rounded-2xl p-4 mb-3" style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}>
                <Text className="text-2xl mr-4">{feature.icon}</Text>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold text-base mb-1">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </Text>
                </View>
                <Check color={colors.primary.yellowDark} size={20} />
              </View>
            ))}
          </View>
        </View>

        {/* Pricing */}
        <View className="px-6 py-8">
          <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
            Choose Your Plan
          </Text>
          <View className="space-y-4">
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSubscribe(plan.name)}
                className={`rounded-2xl p-6 mb-3 ${
                  plan.popular
                    ? 'bg-yellow-50 border-2 border-yellow-400'
                    : 'bg-white border-2 border-gray-200'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                {plan.popular && (
                  <View className="flex-row items-center justify-center mb-3">
                    <Star color={colors.primary.yellowDark} size={16} />
                    <Text className="text-yellow-600 font-semibold ml-1 text-sm">
                      MOST POPULAR
                    </Text>
                  </View>
                )}

                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-gray-800 font-bold text-xl">
                      {plan.name}
                    </Text>
                    {plan.savings && (
                      <Text className="text-green-600 font-semibold text-sm">
                        {plan.savings}
                      </Text>
                    )}
                  </View>
                  <View className="items-end">
                    <View className="flex-row items-baseline">
                      <Text className="text-gray-800 font-bold text-2xl">
                        {plan.price}
                      </Text>
                      <Text className="text-gray-500 ml-1">
                        {plan.period}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View className="px-6 pb-20">
          <TouchableOpacity
            onPress={() => handleSubscribe('Yearly')}
            className="bg-yellow-400 rounded-full py-4 items-center mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text className="text-gray-800 font-bold text-lg">Start Free Trial</Text>
          </TouchableOpacity>
          
          <Text className="text-center text-gray-500 text-sm leading-relaxed">
            7-day free trial • Cancel anytime • No commitment
          </Text>
          
          <View className="mt-6 pt-6 border-t border-gray-200">
            <Text className="text-center text-gray-400 text-xs leading-relaxed">
              By subscribing, you agree to our Terms of Service and Privacy Policy. 
              Subscription automatically renews unless cancelled at least 24 hours before the end of the current period.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}