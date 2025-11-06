/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        peach: {
          light: '#FFD4C4',
          DEFAULT: '#FFB89A',
          dark: '#FF9F7F',
        },
        coral: {
          light: '#FF9B8A',
          DEFAULT: '#FF6B5A',
        },
        mint: {
          light: '#B8E6D5',
          DEFAULT: '#7DD3B0',
        },
        lavender: {
          light: '#E8D4F8',
          DEFAULT: '#D4B5F0',
        },
        // Mood Colors
        mood: {
          calm: '#B8E6D5',
          happy: '#FFD4C4',
          excited: '#FFB89A',
          peaceful: '#E8D4F8',
          productive: '#7DD3B0',
        },
        // Botanical Colors (keeping for compatibility)
        leaf: {
          light: '#8CAA9A',
          DEFAULT: '#7A9B8E',
        },
        // Brown/Hair Colors
        brown: {
          DEFAULT: '#6B4E3D',
          dark: '#5A3E2F',
        },
      },
      fontFamily: {
        // Serif fonts for journal entries - elegant and readable
        'journal': ['Lora', 'Merriweather', 'Georgia', 'serif'],
        // Sans-serif for UI elements
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Handwriting-style for special journal notes
        'handwriting': ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
