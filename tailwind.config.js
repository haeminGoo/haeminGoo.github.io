const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './data/**/*.json'],
  theme: {
    colors: {
      primary: defaultTheme.colors.purple,
      secondary: defaultTheme.colors.red,
      neutral: defaultTheme.colors.gray,
      white: '#FFF',
    },
    extend: {},
  },
  plugins: [],
};
