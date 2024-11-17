// tailwind.config.js
const plugin = require('tailwind-scrollbar');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbarBg: '#202123', // Background of the scrollbar
        scrollbarThumb: '#343541', // Thumb color
        scrollbarThumbHover: '#4d4d57', // Hover color
      },
      animation: {
        beam: 'beam 2s infinite',
      },
      keyframes: {
        beam: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [ plugin({ nocompatible: true }),],
};
