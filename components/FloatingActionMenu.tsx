import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Plus, X, PenTool, Camera, Mic, Image } from 'lucide-react-native';
import { colors } from '../constants/theme';

interface FloatingActionMenuProps {
  onWritePress: () => void;
  onPhotoPress: () => void;
  onVoicePress: () => void;
  onImagePress: () => void;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  onWritePress,
  onPhotoPress,
  onVoicePress,
  onImagePress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const menuOptions = [
    { icon: PenTool, action: onWritePress, color: colors.accent.lavender },
    { icon: Camera, action: onPhotoPress, color: colors.accent.peach },
    { icon: Mic, action: onVoicePress, color: colors.accent.mint },
    { icon: Image, action: onImagePress, color: colors.accent.coral },
  ];

  return (
    <View className="absolute bottom-6 right-6">
      {/* Menu Options */}
      {menuOptions.map((option, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(index + 1) * 70],
        });

        const opacity = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        const scale = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        });

        const Icon = option.icon;

        return (
          <Animated.View
            key={index}
            className="absolute"
            style={{
              opacity,
              transform: [
                { translateY },
                { scale },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => {
                option.action();
                setIsOpen(false);
              }}
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{
                backgroundColor: option.color,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Icon size={20} color={colors.gray[700]} />
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Main FAB Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-yellow-400 rounded-full items-center justify-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <Plus size={28} color="#2D2D2D" strokeWidth={3} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};