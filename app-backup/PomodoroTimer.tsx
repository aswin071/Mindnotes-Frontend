import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react-native';

export const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsRunning(false);
      if (!isBreak) {
        setCompletedPomodoros(prev => prev + 1);
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        setTimeLeft(25 * 60); // Back to 25 minutes
        setIsBreak(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const skipSession = () => {
    setIsRunning(false);
    if (isBreak) {
      setTimeLeft(25 * 60);
      setIsBreak(false);
    } else {
      setTimeLeft(5 * 60);
      setIsBreak(true);
    }
  };

  return (
    <View className="items-center py-8">
      {/* Timer Display */}
      <View className={`rounded-full w-72 h-72 items-center justify-center mb-10 ${
        isBreak ? 'bg-green-50 border-4 border-green-300' : 'bg-yellow-50 border-4 border-yellow-300'
      }`}>
        <Text className="text-6xl font-bold text-black mb-3">
          {formatTime(timeLeft)}
        </Text>
        <View className="flex-row items-center">
          {isBreak ? <Coffee color="#10B981" size={24} /> : <Play color="#F59E0B" size={24} />}
          <Text className={`ml-3 font-bold text-lg ${isBreak ? 'text-green-600' : 'text-yellow-600'}`}>
            {isBreak ? 'Break Time' : 'Focus Time'}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View className="mb-10">
        <Text className="text-center text-gray-600 mb-4 text-base font-medium">
          Completed Pomodoros: {completedPomodoros}
        </Text>
        <View className="flex-row justify-center">
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              className={`w-4 h-4 rounded-full ${index < 3 ? 'mr-3' : ''} ${
                index < completedPomodoros ? 'bg-yellow-400 border-2 border-yellow-500' : 'bg-gray-200 border-2 border-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Controls */}
      <View className="flex-row items-center mb-10">
        <TouchableOpacity
          onPress={resetTimer}
          className="bg-gray-100 rounded-full p-5 border-2 border-gray-200 active:bg-gray-200 mr-4"
          activeOpacity={0.7}
        >
          <RotateCcw color="#374151" size={28} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleTimer}
          className="bg-yellow-400 rounded-full p-7 border-2 border-yellow-500 active:bg-yellow-500 mx-4"
          activeOpacity={0.8}
        >
          {isRunning ? (
            <Pause color="#000000" size={36} />
          ) : (
            <Play color="#000000" size={36} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={skipSession}
          className="bg-gray-100 rounded-full px-6 py-5 border-2 border-gray-200 active:bg-gray-200 ml-4"
          activeOpacity={0.7}
        >
          <Text className="text-gray-700 font-bold text-base">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Current Task */}
      <View className="bg-gray-50 rounded-2xl p-6 w-full border-2 border-gray-200">
        <Text className="text-lg font-bold text-black mb-2">Current Task</Text>
        <Text className="text-gray-600 text-base">Complete project proposal draft</Text>
      </View>
    </View>
  );
};