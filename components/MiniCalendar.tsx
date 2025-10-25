import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange?: (month: Date) => void;
  currentMonth?: Date;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  onDateSelect,
  onMonthChange,
  currentMonth,
}) => {
  const { width } = Dimensions.get('window');
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = currentMonth || new Date();
  const isSmallDevice = width < 375;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(month);
    const firstDayOfMonth = getFirstDayOfMonth(month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View key={`empty-${i}`} className="w-8 h-8 sm:w-10 sm:h-10" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month.getMonth() &&
        selectedDate.getFullYear() === month.getFullYear();
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month.getMonth() &&
        new Date().getFullYear() === month.getFullYear();

      days.push(
        <TouchableOpacity
          key={day}
          onPress={() => onDateSelect(date)}
          className="w-8 h-8 sm:w-10 sm:h-10 items-center justify-center"
        >
          <View
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full items-center justify-center ${
              isSelected ? 'bg-yellow-400' : isToday ? 'bg-yellow-100' : ''
            }`}
          >
            <Text
              className={`${isSmallDevice ? 'text-xs' : 'text-sm'} font-medium ${
                isSelected
                  ? 'text-gray-800 font-bold'
                  : isToday
                  ? 'text-gray-800'
                  : 'text-gray-700'
              }`}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handlePreviousMonth = () => {
    if (onMonthChange) {
      onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (onMonthChange) {
      onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    }
  };

  return (
    <View className="px-4 sm:px-6 py-4">
      {/* Month Navigation and Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handlePreviousMonth} className="p-1">
          <ChevronLeft size={18} color="#6B7280" />
        </TouchableOpacity>

        <Text className={`font-bold text-gray-800 ${isSmallDevice ? 'text-sm' : 'text-base'}`}>
          {monthNames[month.getMonth()]}
        </Text>

        <TouchableOpacity onPress={handleNextMonth} className="p-1">
          <ChevronRight size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Day names */}
      <View className="flex-row justify-around mb-2">
        {dayNames.map((day, index) => (
          <View key={index} className="flex-1 items-center">
            <Text className={`text-gray-500 font-semibold ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap justify-start">
        {renderCalendarDays()}
      </View>
    </View>
  );
};