/**
 * Mobile-Optimized Design Constants
 * Consistent spacing, sizing, and layout values for mobile devices
 */

export const MobileDesign = {
  // Spacing - optimized for thumb-friendly interactions
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  // Padding - screen edge padding for all screens
  padding: {
    screen: 20, // Main horizontal padding
    screenTop: 16, // Top padding for content areas
    screenBottom: 24, // Bottom padding (tab bar clearance)
    card: 16, // Card internal padding
    cardLarge: 20, // Large card padding
    section: 20, // Section spacing
  },

  // Touch targets - minimum sizes for comfortable tapping
  touch: {
    min: 44, // Minimum touch target size (iOS HIG)
    comfortable: 48, // Comfortable touch target
    icon: 24, // Standard icon size
    iconLarge: 32, // Large icon size
  },

  // Border radius - consistent rounded corners
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  // Typography - mobile-optimized text sizes
  typography: {
    hero: 32,
    title: 24,
    heading: 20,
    subheading: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
    tiny: 10,
  },

  // Layout
  layout: {
    maxWidth: 768, // Max width for content on tablets
    cardSpacing: 12, // Spacing between cards
    sectionSpacing: 24, // Spacing between sections
    bottomNavHeight: 80, // Height reserved for bottom navigation
  },

  // Animation
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
};

export default MobileDesign;
