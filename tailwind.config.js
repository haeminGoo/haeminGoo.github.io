const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './data/**/*.json'],
  theme: {
    colors: {
      primary: colors.purple,
      secondary: colors.red,
      neutral: colors.gray,
      white: '#FFF',
    },
    extend: {},
  },
  plugins: [],
};
