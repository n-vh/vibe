/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 0px 0px rgba(209, 178, 178, 0.8)',
      },
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
        roboto: ['Roboto Flex', 'sans-serif'],
        gothic: ['Sawarabi Gothic', 'sans-serif'],
        mincho: ['Sawarabi Mincho', 'serif'],
        hubballi: ['Hubballi', 'cursive'],
        titan: ['Titan One', 'cursive'],
      },
      screens: {
        lg: '1200px',
      },
    },
  },
  plugins: [],
};
