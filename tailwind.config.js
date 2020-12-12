const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
