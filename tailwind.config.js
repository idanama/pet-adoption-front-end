const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

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
    extend: {
      boxShadow: {
        static: '0 0px 30px rgba(0, 0, 0, 0.3)',
      },
      maxWidth: {
        small: '2.2rem',
        medium: '2.8rem',
        large: '6rem',
      },
      colors: {
        fostered: colors.yellow[500],
        adopted: colors.gray[50],
        adoptable: colors.emerald[400],
        primary: colors.emerald[400],
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
