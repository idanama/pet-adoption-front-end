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
    boxShadow: {
      static: '0 0px 30px rgba(0, 0, 0, 0.3)',
    },
    maxWidth: {
      small: '2.2rem',
      medium: '6rem',
      0: '0rem',
      none: 'none',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px',
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
