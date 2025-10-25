import * as React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';

interface RecentMomentCardProps {
  date: string;
  title: string;
  preview: string;
  backgroundColor: string;
  onPress: () => void;
}

export const RecentMomentCard: React.FC<RecentMomentCardProps> = ({
  date,
  title,
  preview,
  backgroundColor,
  onPress,
}) => {
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="rounded-2xl p-3 sm:p-4 flex-1"
      style={{
        backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text className={`text-gray-500 font-medium mb-1 ${isSmallDevice ? 'text-xs' : 'text-xs'}`}>
        {date}
      </Text>
      <Text className={`text-gray-800 font-bold mb-2 ${isSmallDevice ? 'text-sm' : 'text-sm'}`}>
        {title}
      </Text>
      <Text className={`text-gray-700 leading-4 ${isSmallDevice ? 'text-xs' : 'text-xs'}`}>
        {preview}
      </Text>
    </TouchableOpacity>
  );
};