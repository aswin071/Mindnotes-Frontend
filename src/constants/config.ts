/**
 * App Configuration
 * Environment-specific settings and constants
 */

export const config = {
  // API Configuration (commented for later integration)
  api: {
    baseUrl: 'https://api.mindnotes.app/v1', // TODO: API integration
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // App Information
  app: {
    name: 'MindNotes',
    version: '1.0.0',
    buildNumber: 1,
  },

  // Feature Flags
  features: {
    analyticsEnabled: true,
    crashReportingEnabled: true,
    loggingEnabled: true,
    offlineModeEnabled: true,
  },

  // Storage Keys (for AsyncStorage/LocalStorage)
  storage: {
    userPrefix: '@mindnotes_user_',
    entriesPrefix: '@mindnotes_entries_',
    settingsPrefix: '@mindnotes_settings_',
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },

  // Validation
  validation: {
    // Password requirements
    password: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    // Entry validation
    entry: {
      minTitleLength: 1,
      maxTitleLength: 200,
      minContentLength: 1,
      maxContentLength: 10000,
      maxImages: 10,
    },
    // Mood validation
    mood: {
      maxCustomMoods: 20,
    },
    // Tag validation
    tag: {
      maxTags: 50,
      maxTagLength: 50,
    },
  },

  // Focus Program Configuration
  focusProgram: {
    programs: [
      {
        id: 'p14',
        name: '14-Day Focus Journey',
        duration: 14,
        description: 'A two-week program to build focus habits',
        isPaid: true,
      },
      {
        id: 'p30',
        name: '30-Day Deep Work Challenge',
        duration: 30,
        description: 'A comprehensive month-long program',
        isPaid: true,
      },
    ],
  },

  // Pomodoro Timer Configuration
  timer: {
    defaultPomodoro: {
      focus: 25, // minutes
      break: 5, // minutes
      longBreak: 15, // minutes
      sessionsBeforeLongBreak: 4,
    },
  },

  // Notification Configuration
  notifications: {
    defaultTimes: {
      journaling: '09:00',
      program: '08:00',
      focus: '14:00',
      prompt: '20:00',
    },
  },

  // Subscription Plans
  subscription: {
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
          'Unlimited journal entries',
          'Prompt journaling (daily)',
          'Basic mood tracking',
          'Focus timer',
          'Tags & search',
        ],
      },
      {
        id: 'premium_monthly',
        name: 'Premium Monthly',
        price: 4.99,
        billingCycle: 'monthly',
        features: [
          'All free features',
          'Focus programs (14-day & 30-day)',
          'Advanced mood analytics',
          'Priority notifications',
          'Export to PDF',
          'Cloud sync',
          'Ad-free experience',
        ],
      },
      {
        id: 'premium_annual',
        name: 'Premium Annual',
        price: 39.99,
        billingCycle: 'annual',
        savings: '33%',
        features: [
          'All free features',
          'Focus programs (14-day & 30-day)',
          'Advanced mood analytics',
          'Priority notifications',
          'Export to PDF',
          'Cloud sync',
          'Ad-free experience',
        ],
      },
    ],
  },

  // Default Prompts Library
  prompts: {
    categories: [
      {
        id: 'gratitude',
        name: 'Gratitude',
        prompts: [
          'What are three things you\'re grateful for today?',
          'Who made a positive impact on your day and why?',
          'What small moment brought you joy today?',
          'What skill or ability are you grateful to have?',
          'How has a challenge helped you grow?',
        ],
      },
      {
        id: 'reflection',
        name: 'Reflection',
        prompts: [
          'What did you learn about yourself today?',
          'How did you handle a difficult situation?',
          'What would you do differently today if you could?',
          'What emotions did you feel strongly today?',
          'How have you grown this week?',
        ],
      },
      {
        id: 'growth',
        name: 'Personal Growth',
        prompts: [
          'What\'s a goal you\'re working towards?',
          'What limiting belief are you ready to release?',
          'How can you be kinder to yourself?',
          'What does success look like for you?',
          'What would your future self tell you?',
        ],
      },
      {
        id: 'relationships',
        name: 'Relationships',
        prompts: [
          'Who in your life makes you feel seen and valued?',
          'How can you deepen a meaningful relationship?',
          'What boundary do you need to set?',
          'Who could you reach out to today?',
          'What do you appreciate most in your friendships?',
        ],
      },
      {
        id: 'creativity',
        name: 'Creativity',
        prompts: [
          'What creative idea excites you right now?',
          'How do you express yourself creatively?',
          'What inspires your creativity?',
          'What would you create if there were no limits?',
          'How can you bring more creativity into your daily life?',
        ],
      },
    ],
  },

  // Logging Configuration
  logging: {
    level: 'debug', // 'debug' | 'info' | 'warn' | 'error'
    enableConsole: true,
    enableFile: false,
  },

  // Development/Production
  env: (process.env.NODE_ENV || 'production') as 'development' | 'production',
  isDevelopment: (process.env.NODE_ENV || 'production') === 'development',
} as const;

export type Config = typeof config;
