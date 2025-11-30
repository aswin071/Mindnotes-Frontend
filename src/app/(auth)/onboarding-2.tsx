/**
 * Onboarding Screen 2 - User Information
 *
 * Collects user's personal information
 * Features:
 * - Back button
 * - Pagination dots (3rd dot active)
 * - Birthday input with date picker
 * - Gender selection (Female, Male, Prefer not to say, Custom)
 * - Continue button
 *
 * Design: Clean form with peach tones
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { useSignup } from '@/contexts/SignupContext';
import DateTimePicker from '@react-native-community/datetimepicker';

type Gender = 'female' | 'male' | 'prefer-not-to-say' | 'custom' | null;

export default function Onboarding2Screen() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();

  const [birthday, setBirthday] = useState(signupData.dob || '');
  const [selectedGender, setSelectedGender] = useState<Gender>(
    (signupData.gender as Gender) || null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    signupData.dob ? new Date(signupData.dob) : new Date(2000, 0, 1)
  );

  const handleBack = () => {
    router.back();
  };

  const formatDateInput = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/[^\d]/g, '');

    // Format as YYYY-MM-DD
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
    }
  };

  const handleDateChange = (text: string) => {
    const formatted = formatDateInput(text);
    setBirthday(formatted);
  };

  const onDatePickerChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setBirthday(formattedDate);
    }
  };

  const handleCalendarPress = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const validateDate = (dateStr: string): boolean => {
    // Check if date matches YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      year >= 1900 &&
      year <= new Date().getFullYear()
    );
  };

  const handleContinue = () => {
    // Validate inputs
    if (!birthday.trim()) {
      Alert.alert('Missing Information', 'Please enter your birthday');
      return;
    }

    if (!validateDate(birthday)) {
      Alert.alert('Invalid Date', 'Please enter a valid date in YYYY-MM-DD format');
      return;
    }

    if (!selectedGender) {
      Alert.alert('Missing Information', 'Please select your gender');
      return;
    }

    // Store data in context
    updateSignupData({
      dob: birthday,
      gender: selectedGender,
    });

    // Navigate to next onboarding screen
    router.push('/(auth)/onboarding-3');
  };

  const genderOptions = [
    { id: 'female', label: 'Female', icon: '♀' },
    { id: 'male', label: 'Male', icon: '♂' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: '⊘' },
    { id: 'custom', label: 'Custom', icon: '•••' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-5 pt-8 pb-8">
          {/* Header with Back Button */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 -ml-2"
              activeOpacity={0.6}
            >
              <ChevronLeft size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center gap-2 mb-10">
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-peach" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
            <View className="w-2 h-2 rounded-full bg-gray-300" />
          </View>

          {/* Title */}
          <Text className="font-sans text-3xl font-bold text-gray-800 mb-3">
            A little about you
          </Text>

          {/* Subtitle */}
          <Text className="font-sans text-sm text-peach-dark mb-8">
            This helps us personalize your journaling experience.
          </Text>

          {/* Birthday Section */}
          <View className="mb-8">
            <Text className="font-sans text-base font-medium text-gray-800 mb-3">
              Your Birthday
            </Text>
            <TouchableOpacity
              onPress={handleCalendarPress}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4">
                <Text className="flex-1 font-sans text-base text-gray-800">
                  {birthday || 'YYYY-MM-DD'}
                </Text>
                <Calendar size={20} color="#FFB89A" strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Gender Section */}
          <View className="mb-8">
            <Text className="font-sans text-base font-medium text-gray-800 mb-3">
              Your Gender
            </Text>
            <View className="gap-3">
              {/* First Row - Female and Male */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'female'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('female')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">♀</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'male'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('male')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">♂</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Male
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Second Row - Prefer not to say and Custom */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'prefer-not-to-say'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('prefer-not-to-say')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">⊘</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Prefer not to say
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 py-4 px-4 rounded-xl border-2 ${
                    selectedGender === 'custom'
                      ? 'bg-peach-light border-peach'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedGender('custom')}
                  activeOpacity={0.7}
                >
                  <Text className="font-sans text-2xl text-center mb-1">•••</Text>
                  <Text className="font-sans text-sm font-medium text-gray-800 text-center">
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View className="flex-1 min-h-[40px]" />

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-peach py-4 rounded-full"
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text className="font-sans text-base font-semibold text-gray-800 text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker */}
      {Platform.OS === 'ios' ? (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={handleDatePickerClose}
        >
          <TouchableOpacity
            className="flex-1 justify-end bg-black/50"
            activeOpacity={1}
            onPress={handleDatePickerClose}
          >
            <View className="bg-white rounded-t-3xl">
              <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200">
                <TouchableOpacity onPress={handleDatePickerClose}>
                  <Text className="font-sans text-base text-peach font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text className="font-sans text-base font-semibold text-gray-800">
                  Select Birthday
                </Text>
                <TouchableOpacity onPress={handleDatePickerClose}>
                  <Text className="font-sans text-base text-peach font-semibold">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={onDatePickerChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                textColor="#1F2937"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : (
        showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDatePickerChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )
      )}
    </SafeAreaView>
  );
}
