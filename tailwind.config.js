const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      'black-0.4': 'rgba(0,0,0,0.4)',
      'black-0.3': 'rgba(0,0,0,0.3)',
      'black-0.2': 'rgba(0,0,0,0.2)',
      'black-0.1': 'rgba(0,0,0,0.1)',
      'black-0.05': 'rgba(0,0,0,0.05)',
    }),
    fontFamily: {
      display: ['Secular One', ...defaultTheme.fontFamily.serif],
      sans: ['Assistant', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
