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
        primary: '#FF5722',     
        secondary: '#FFC107',   
        accent: '#FF7043',      
        darkText: '#212121',    
        lightBg: '#FFFFFF',     
        muted: '#f5f5f5',       
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
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

