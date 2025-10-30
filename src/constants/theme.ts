/**
 * Global Theme Configuration
 * This is the single source of truth for all design tokens
 * Used across the entire application for consistency
 */

export const theme = {
  // Primary Colors
  colors: {
    primary: {
      main: '#FCD34D', // Warm yellow - main brand color
      light: '#FEF3C7', // Light yellow - backgrounds
      dark: '#F59E0B', // Dark yellow - emphasis
    },
    // Neutral Colors
    neutral: {
      black: '#1F2937', // Soft black for text
      white: '#FFFFFF',
      beige: '#FDF6E3', // Warm background
      cream: '#FFFBF0', // Card backgrounds
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
      },
    },
    // Mood Colors (Accent Colors)
    mood: {
      happy: '#FFE4E1', // Peach - Happy/Positive
      excited: '#FFA07A', // Coral - Excited/Energetic
      calm: '#E6F3F0', // Mint - Calm/Peaceful
      reflective: '#F3E5F5', // Lavender - Reflective/Thoughtful
      peaceful: '#E0F2FE', // Sky - Peaceful/Serene
      productive: '#FFE0B2', // Orange - Productive/Accomplished
      sad: '#FFB6D9', // Pink - Sad/Melancholic
      anxious: '#FED7AA', // Amber - Anxious/Worried
    },
    // Status Colors
    status: {
      success: '#10B981', // Green
      error: '#EF4444', // Red
      warning: '#F59E0B', // Amber
      info: '#3B82F6', // Blue
    },
  },

  // Typography
  typography: {
    // Font Family
    fontFamily: {
      primary: 'System', // Uses native system fonts
      mono: 'Courier',
    },
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
      '5xl': 36,
    },
    // Font Weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    // Line Heights
    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    // Letter Spacing
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
    },
  },

  // Spacing Scale (4px base unit)
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 8,
    base: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    full: 9999,
  },

  // Shadows (elevation)
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // Animations/Transitions
  animations: {
    duration: {
      fast: 150,
      base: 250,
      slow: 350,
      slower: 500,
    },
    easing: {
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      linear: 'linear',
    },
  },

  // Mobile Design Specifics
  mobile: {
    // Touch Target Minimums (iOS HIG: 44pt, Android: 48dp)
    touchTarget: {
      small: 40,
      medium: 44,
      large: 48,
    },
    // Padding Strategy
    padding: {
      screenHorizontal: 16, // 4px * 4
      cardHorizontal: 16,
      sectionVertical: 20, // 4px * 5
    },
    // Safe Area (notch handling)
    safeArea: {
      top: 0, // Will be overridden by SafeAreaProvider
      bottom: 0,
      left: 0,
      right: 0,
    },
    // Navigation Bar Heights
    tabBarHeight: 80,
    headerHeight: 56,
    statusBarHeight: 20,
  },

  // Responsive Breakpoints
  breakpoints: {
    xs: 320,
    sm: 375,
    md: 412,
    lg: 768,
    xl: 1024,
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    backdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
  },
} as const;

// Type exports for TypeScript
export type Theme = typeof theme;
export type Colors = typeof theme.colors;
export type Typography = typeof theme.typography;
export type Spacing = typeof theme.spacing;
