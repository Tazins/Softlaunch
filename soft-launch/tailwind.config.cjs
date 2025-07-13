/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // emerald-500 accent for buttons/links
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
