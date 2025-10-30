import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { colors } from '../constants/theme';

interface GreetingHeaderProps {
  userName: string;
  avatarUrl?: string;
  onProfilePress?: () => void;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  userName,
  avatarUrl,
  onProfilePress,
}) => {
  return (
    <View className="px-6 py-4 flex-row items-center justify-between">
      <View>
        <Text className="text-2xl font-bold text-gray-800">
          Hi, {userName}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onProfilePress}
        className="w-10 h-10 rounded-full bg-yellow-100 items-center justify-center border-2 border-yellow-300 overflow-hidden"
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            className="w-full h-full"
          />
        ) : (
          <Text className="text-xl font-bold text-yellow-600">
            {userName.charAt(0).toUpperCase()}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};