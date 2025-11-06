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
          light: '#E8B4A0',
          DEFAULT: '#D4956C',
          dark: '#C07D55',
        },
        // Botanical Colors
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
