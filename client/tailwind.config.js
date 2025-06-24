/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722',     // Bold orange-red
        secondary: '#FFC107',   // Golden yellow
        accent: '#FF7043',      // Soft reddish orange
        darkText: '#212121',    // Deep gray for text
        lightBg: '#FFFFFF',     // White background
        muted: '#f5f5f5',       // Light muted backgrounds
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Use a clean modern font
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.1)',
        button: '0 4px 10px rgba(255,87,34,0.4)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

