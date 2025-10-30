import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  selectedDate = new Date(), 
  onDateSelect = () => {} 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();
      const hasEntry = Math.random() > 0.7; // Mock data for entries

      days.push(
        <TouchableOpacity
          key={day}
          onPress={() => onDateSelect(date)}
          className={`w-10 h-10 rounded-lg items-center justify-center ${
            isSelected 
              ? 'bg-yellow-400' 
              : isToday 
              ? 'bg-yellow-100 border border-yellow-300' 
              : 'bg-transparent'
          }`}
        >
          <Text className={`text-sm font-medium ${
            isSelected ? 'text-black' : isToday ? 'text-yellow-700' : 'text-gray-700'
          }`}>
            {day}
          </Text>
          {hasEntry && !isSelected && (
            <View className="w-1 h-1 bg-yellow-500 rounded-full absolute bottom-1" />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-4">
      {/* Calendar Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <ChevronLeft color="#374151" size={20} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">
          {formatMonth(currentMonth)}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <ChevronRight color="#374151" size={20} />
        </TouchableOpacity>
      </View>

      {/* Days of week header */}
      <View className="flex-row justify-between mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} className="w-10 text-center text-xs font-medium text-gray-500">
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {renderCalendarDays()}
      </View>
    </View>
  );
};