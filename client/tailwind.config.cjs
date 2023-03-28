const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'dark-grey': '#100E0E',
      yellow: '#FBEACA',
      'light-yellow': '#FDFAF0',
      pink: '#F1D7D7',
      blue: '#9D9BBE',
      'dark-pink': '#C0A0A0',
      white: '#FFFFFF',
      black: '#000000',
      error: '#CB6262',
      transparent: 'transparent',
    },
    fontFamily: {
      days: ['Days One', 'sans-serif'],
      roboto: ['Roboto Flex', 'sans-serif'],
      gothic: ['Sawarabi Gothic', 'sans-serif'],
      mincho: ['Sawarabi Mincho', 'serif'],
      hubballi: ['Hubballi', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
};
