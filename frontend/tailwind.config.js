/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           // For Vite root html
    "./src/**/*.{js,jsx,ts,tsx}" // All JS/TS/JSX/TSX files in src folder
  ],
  theme: {
    extend: {
      // You can extend default theme here if you want
      colors: {
        // Example of adding custom colors
        primary: '#1D4ED8', // Tailwind blue-700
        secondary: '#9333EA', // Tailwind purple-600
      },
      fontFamily: {
        // Example custom fonts
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
