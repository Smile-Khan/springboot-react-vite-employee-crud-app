/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a 'dark' class
  content: [
    "./index.html",           // Vite root HTML
    "./src/**/*.{js,jsx,ts,tsx}" // All components/pages
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',   // Blue-700
        secondary: '#9333EA', // Purple-600
        background: '#F9FAFB',
        darkbg: '#1e293b',    // Slate-800 for dark mode
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
