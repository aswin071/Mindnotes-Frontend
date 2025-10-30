import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

interface ReflectionPromptProps {
  title: string;
  onPress: () => void;
}

export const ReflectionPrompt: React.FC<ReflectionPromptProps> = ({
  title,
  onPress,
}) => {
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  return (
    <View className="px-4 sm:px-6 mb-6">
      <Text className={`font-bold text-gray-800 mb-4 ${isSmallDevice ? 'text-base' : 'text-lg'}`}>
        Today's Reflection
      </Text>

      <View className="bg-white rounded-2xl p-4 sm:p-6" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text className={`text-gray-700 leading-6 mb-5 sm:mb-6 ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
          {title}
        </Text>

        <TouchableOpacity
          onPress={onPress}
          className="bg-yellow-400 rounded-full py-3 px-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text className={`text-gray-800 font-bold text-center ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
            Start Writing
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};