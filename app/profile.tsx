import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Edit3,
  Crown
} from 'lucide-react-native';

export default function ProfileScreen() {
  const handleLogout = () => {
    // Handle logout logic here
    router.replace('/welcome');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-black">Profile</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Info */}
        <View className="px-6 mb-8">
          <View className="bg-gray-50 rounded-2xl p-6">
            <View className="flex-row items-center">
              <View className="bg-yellow-400 rounded-full w-16 h-16 items-center justify-center mr-4">
                <User color="#000" size={28} />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-black">John Doe</Text>
                <Text className="text-gray-600">john.doe@email.com</Text>
                <View className="flex-row items-center mt-2">
                  <Crown color="#F59E0B" size={16} />
                  <Text className="text-yellow-600 font-medium ml-1">Premium Member</Text>
                </View>
              </View>
              <TouchableOpacity className="p-2">
                <Edit3 color="#6B7280" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between">
            <View className="bg-yellow-50 rounded-xl p-4 flex-1 mr-2">
              <Text className="text-2xl font-bold text-black">47</Text>
              <Text className="text-gray-600 text-sm">Day Streak</Text>
            </View>
            <View className="bg-yellow-50 rounded-xl p-4 flex-1 mx-2">
              <Text className="text-2xl font-bold text-black">156</Text>
              <Text className="text-gray-600 text-sm">Entries</Text>
            </View>
            <View className="bg-yellow-50 rounded-xl p-4 flex-1 ml-2">
              <Text className="text-2xl font-bold text-black">23</Text>
              <Text className="text-gray-600 text-sm">Focus Sessions</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6">
          <View className="bg-gray-50 rounded-2xl overflow-hidden">
            {/* Account Settings */}
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
              <View className="bg-blue-100 rounded-full p-2 mr-4">
                <Settings color="#3B82F6" size={20} />
              </View>
              <Text className="flex-1 text-black font-medium">Account Settings</Text>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
              <View className="bg-green-100 rounded-full p-2 mr-4">
                <Bell color="#10B981" size={20} />
              </View>
              <Text className="flex-1 text-black font-medium">Notifications</Text>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>

            {/* Privacy */}
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
              <View className="bg-purple-100 rounded-full p-2 mr-4">
                <Shield color="#8B5CF6" size={20} />
              </View>
              <Text className="flex-1 text-black font-medium">Privacy & Security</Text>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>

            {/* Help */}
            <TouchableOpacity className="flex-row items-center p-4">
              <View className="bg-orange-100 rounded-full p-2 mr-4">
                <HelpCircle color="#F97316" size={20} />
              </View>
              <Text className="flex-1 text-black font-medium">Help & Support</Text>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity 
            className="flex-row items-center p-4 mt-6 bg-red-50 rounded-2xl"
            onPress={handleLogout}
          >
            <View className="bg-red-100 rounded-full p-2 mr-4">
              <LogOut color="#EF4444" size={20} />
            </View>
            <Text className="flex-1 text-red-600 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}