/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'dark-grey': '#100E0E',
      yellow: '#FDF0C7',
      pink: '#F1D3DEB2',
      blue: '#5E5E98',
      'dark-pink': '#8F5653',
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      days: ['Days One', 'sans-serif'],
      roboto: ['Roboto Flex', 'sans-serif'],
      gothic: ['Sawarabi Gothic', 'sans-serif'],
      mincho: ['Sawarabi Mincho', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
