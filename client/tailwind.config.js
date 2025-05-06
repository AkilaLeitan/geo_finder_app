/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1C80B8',
        secondary: '#19ABCD',
        meteor: '#DA6F11',
        easternBlue: '#1889BA',
        russet: '#883D08'
      }
    }
  },
  plugins: []
};
