// Global Theme Configuration for MindNotes
// A playful, warm journaling app designed for women

export const colors = {
  // Primary Colors - Warm & Playful
  primary: {
    yellow: '#FCD34D',      // Main yellow (warm, inviting)
    yellowLight: '#FEF3C7', // Light yellow for backgrounds
    yellowDark: '#F59E0B',  // Darker yellow for emphasis
  },

  // Neutral Colors
  neutral: {
    black: '#1F2937',       // Soft black for text
    white: '#FFFFFF',       // Pure white
    beige: '#FDF6E3',       // Warm beige background
    cream: '#FFFBF0',       // Cream color for cards
  },

  // Supporting Colors
  accent: {
    peach: '#FFE4E1',       // Soft peach for highlights
    coral: '#FFA07A',       // Playful coral
    mint: '#E6F3F0',        // Soft mint green
    lavender: '#F3E5F5',    // Light lavender
    sky: '#E0F2FE',         // Soft sky blue
  },

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};