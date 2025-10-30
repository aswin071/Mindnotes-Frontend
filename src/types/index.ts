/**
 * Global TypeScript Types & Interfaces
 * Core data structures used throughout the application
 */

// ==================== USER ====================
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  subscription: Subscription;
  streak: {
    count: number;
    lastEntryDate?: Date;
    totalEntries: number;
  };
}

export interface UserPreferences {
  notificationTime?: string; // "09:00"
  language: 'en' | 'es' | 'fr' | 'de'; // Extend as needed
  timezone: string; // "UTC", "IST", etc
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

export interface Subscription {
  id?: string;
  status: 'free' | 'premium';
  plan?: 'monthly' | 'annual';
  expiresAt?: Date;
  autoRenew?: boolean;
  paymentMethod?: string;
}

// ==================== MOOD ====================
export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  intensity?: 1 | 2 | 3 | 4 | 5;
  isDefault: boolean;
  userId?: string; // null = default, string = custom
  createdAt?: Date;
}

export const DEFAULT_MOODS: Mood[] = [
  {
    id: '1',
    name: 'Happy',
    emoji: '😊',
    color: '#FFE4E1',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Excited',
    emoji: '🤩',
    color: '#FFA07A',
    isDefault: true,
  },
  {
    id: '3',
    name: 'Calm',
    emoji: '😌',
    color: '#E6F3F0',
    isDefault: true,
  },
  {
    id: '4',
    name: 'Reflective',
    emoji: '🤔',
    color: '#F3E5F5',
    isDefault: true,
  },
  {
    id: '5',
    name: 'Peaceful',
    emoji: '😇',
    color: '#E0F2FE',
    isDefault: true,
  },
  {
    id: '6',
    name: 'Productive',
    emoji: '💪',
    color: '#FFE0B2',
    isDefault: true,
  },
];

// ==================== JOURNAL ENTRY ====================
export type EntryType = 'free' | 'prompt' | 'audio';

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string; // mood ID
  tags: string[];
  images: string[]; // URLs
  audio?: {
    url: string;
    duration: number; // in seconds
  };
  entryType: EntryType;
  promptId?: string; // if it's a prompt response
  isFavorite: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntryPayload {
  title: string;
  content: string;
  mood: string;
  tags: string[];
  images?: string[];
  audio?: { url: string; duration: number };
  entryType: EntryType;
  promptId?: string;
  date?: Date;
}

// ==================== DAILY PROMPT ====================
export interface DailyPrompt {
  id: string;
  date: Date;
  questions: string[]; // 5 questions
  category: string; // "gratitude", "reflection", "growth" etc
  language: string; // "en"
  isAnswered?: boolean;
  answerId?: string; // ID of the journal entry created from this prompt
}

export interface PromptResponse {
  promptId: string;
  answers: {
    [questionIndex: number]: string;
  };
  mood?: string;
  tags?: string[];
}

// ==================== FOCUS PROGRAM ====================
export type ProgramType = '14day' | '30day' | 'custom';
export type ProgramStatus = 'active' | 'completed' | 'paused' | 'not_started';

export interface FocusProgram {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: ProgramType;
  startDate: Date;
  endDate: Date;
  daysCompleted: number;
  totalDays: number;
  status: ProgramStatus;
  dailyTasks: DailyTask[];
  weeklyReviews: WeeklyReview[];
  completionPercentage: number;
}

export interface DailyTask {
  id: string;
  programId: string;
  dayNumber: number;
  title: string;
  description: string;
  tasks: string[]; // tasks to plan
  focusMinutes: number; // recommended focus time
  reflectionPrompt: string;
  isCompleted: boolean;
  completedAt?: Date;
  focusSessionId?: string; // linked focus session
}

export interface WeeklyReview {
  id: string;
  programId: string;
  week: number;
  summary: string;
  mood?: string;
  insights: string[];
  tasksCompleted: number;
  focusHoursLogged: number;
  completedAt?: Date;
}

// ==================== FOCUS SESSION ====================
export type TimerType = 'pomodoro' | 'custom' | 'break';

export interface FocusSession {
  id: string;
  userId: string;
  duration: number; // in minutes
  type: TimerType;
  focusMinutes: number;
  breakMinutes?: number;
  sessionsCompleted: number;
  totalSessions: number;
  completed: boolean;
  startedAt: Date;
  endedAt?: Date;
  pausedAt?: Date;
  totalPauseTime?: number; // in seconds
  programId?: string; // linked to program if started from there
  taskId?: string; // linked to task if started from there
}

// ==================== NOTIFICATION SETTINGS ====================
export type NotificationFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';

export interface NotificationSettings {
  userId: string;
  journalingReminder: {
    enabled: boolean;
    time: string; // "09:00"
    frequency: NotificationFrequency;
  };
  programReminder: {
    enabled: boolean;
    time: string;
  };
  focusReminder: {
    enabled: boolean;
    beforeMinutes: number; // remind 5 min before
  };
  promptReminder: {
    enabled: boolean;
    time: string;
  };
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ==================== AUTHENTICATION ====================
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface SocialAuthResponse {
  provider: 'google' | 'apple' | 'facebook';
  idToken: string;
  accessToken?: string;
  user?: Partial<User>;
}

// ==================== VALIDATION ====================
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// ==================== TAG ====================
export interface Tag {
  id: string;
  userId?: string;
  name: string;
  color?: string;
  count: number; // number of entries with this tag
  createdAt: Date;
}

// ==================== ANALYTICS ====================
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
}
