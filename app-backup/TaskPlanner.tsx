import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Check, X, GripVertical } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const TaskPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: '2', title: 'Review client feedback', completed: true, priority: 'medium' },
    { id: '3', title: 'Update portfolio website', completed: false, priority: 'low' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300';
      case 'medium': return 'bg-yellow-100 border-yellow-300';
      case 'low': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <View className="mb-20">
      <Text className="text-lg font-bold text-black mb-5">Today's Tasks</Text>

      {/* Task List */}
      <View className="mb-6">
        {tasks.map((task) => (
          <View
            key={task.id}
            className={`flex-row items-center p-5 rounded-2xl border-2 mb-4 ${
              task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
            }`}
          >
            <GripVertical color="#9CA3AF" size={18} />

            <TouchableOpacity
              onPress={() => toggleTask(task.id)}
              className={`w-7 h-7 rounded-full border-2 items-center justify-center ml-4 ${
                task.completed ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300'
              }`}
              activeOpacity={0.7}
            >
              {task.completed && <Check color="#000000" size={18} />}
            </TouchableOpacity>

            <View className="flex-1 ml-4">
              <Text className={`font-semibold text-base ${
                task.completed ? 'text-gray-500 line-through' : 'text-black'
              }`}>
                {task.title}
              </Text>
            </View>

            <View className={`w-4 h-4 rounded-full mr-4 ${getPriorityDot(task.priority)}`} />

            <TouchableOpacity
              onPress={() => deleteTask(task.id)}
              className="p-2 active:bg-gray-200 rounded-full"
              activeOpacity={0.7}
            >
              <X color="#9CA3AF" size={18} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Add Task */}
      {showAddTask ? (
        <View className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200 mb-6">
          <TextInput
            placeholder="Enter task title..."
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            className="text-black text-base mb-4 bg-white rounded-xl p-4 border-2 border-gray-200"
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => {
                setShowAddTask(false);
                setNewTaskTitle('');
              }}
              className="flex-1 bg-gray-200 rounded-2xl py-4 items-center active:bg-gray-300 mr-3"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 font-bold text-base">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addTask}
              className="flex-1 bg-yellow-400 rounded-2xl py-4 items-center active:bg-yellow-500"
              activeOpacity={0.8}
            >
              <Text className="text-black font-bold text-base">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowAddTask(true)}
          className="flex-row items-center justify-center py-5 border-2 border-dashed border-gray-300 rounded-2xl mb-6 active:bg-gray-50"
          activeOpacity={0.7}
        >
          <Plus color="#9CA3AF" size={24} />
          <Text className="text-gray-500 font-bold ml-2 text-base">Add New Task</Text>
        </TouchableOpacity>
      )}

      {/* Task Summary */}
      <View className="bg-yellow-50 rounded-2xl p-5 border-2 border-yellow-200">
        <Text className="text-black font-bold mb-3 text-base">Today's Progress</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-600 text-base font-medium">
            {tasks.filter(t => t.completed).length} of {tasks.length} completed
          </Text>
          <Text className="text-yellow-600 font-bold text-base">
            {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
          </Text>
        </View>
      </View>
    </View>
  );
};