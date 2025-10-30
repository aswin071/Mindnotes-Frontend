import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PenTool, Camera, Mic } from 'lucide-react-native';
import { router } from 'expo-router';

export const QuickAddButtons: React.FC = () => {
  const handleAddEntry = (type: 'text' | 'photo' | 'voice') => {
    router.push(`/create-entry?type=${type}`);
  };

  return (
    <View className="flex-row">
      <TouchableOpacity
        onPress={() => handleAddEntry('text')}
        className="flex-1 bg-yellow-400 rounded-2xl py-5 items-center mr-3 active:opacity-90"
        activeOpacity={0.7}
      >
        <PenTool color="#000000" size={26} />
        <Text className="text-black font-semibold mt-3 text-base">Text Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleAddEntry('photo')}
        className="flex-1 bg-gray-100 rounded-2xl py-5 items-center mr-3 border-2 border-gray-200 active:bg-gray-200"
        activeOpacity={0.7}
      >
        <Camera color="#374151" size={26} />
        <Text className="text-gray-700 font-semibold mt-3 text-base">Photo Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleAddEntry('voice')}
        className="flex-1 bg-gray-100 rounded-2xl py-5 items-center border-2 border-gray-200 active:bg-gray-200"
        activeOpacity={0.7}
      >
        <Mic color="#374151" size={26} />
        <Text className="text-gray-700 font-semibold mt-3 text-base">Voice Entry</Text>
      </TouchableOpacity>
    </View>
  );
};