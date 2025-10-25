import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 justify-center items-center px-8">
      {/* App Icon */}
      <View className="mb-12">
        <Image 
          source={require('../assets/images/icon.png')} 
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>
      
      {/* App Title */}
      <Text className="text-3xl font-bold text-black mb-2 text-center">
        MindNotes
      </Text>
      <Text className="text-lg text-gray-600 mb-12 text-center">
        Daily reflection & focus companion
      </Text>
      
      {/* Action Buttons */}
      <View className="w-full">
        <Link href="/login" asChild>
          <TouchableOpacity className="bg-yellow-400 py-4 px-8 rounded-xl w-full mb-4">
            <Text className="text-black text-lg font-semibold text-center">
              Sign In
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity className="border-2 border-yellow-400 py-4 px-8 rounded-xl w-full">
            <Text className="text-black text-lg font-semibold text-center">
              Create Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* Skip for now option */}
      <Link href="/(tabs)" asChild>
        <TouchableOpacity className="mt-8">
          <Text className="text-gray-500 text-base underline">
            Continue without account
          </Text>
        </TouchableOpacity>
      </Link>
      </View>
    </SafeAreaView>
  );
}