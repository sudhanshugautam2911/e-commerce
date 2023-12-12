/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        stylish: ['Whisper', 'cursive'],
        newStyle:['Pacifico', 'cursive'],
        Roboto:['Roboto', 'sans-serif'],
        RobotoCond:['Roboto Condensed', 'cursive'],
        futura: ['fatura', 'cursive'],
        faturaLight: ['fatura-light', 'cursive'],
        faturaLight2: ['fatura-light2', 'cursive'],
        faturaBold: ['fatura-bold', 'cursive'],
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        'TextColor': '#474849',
        'PrimaryColor': '#4F46E5'
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require("daisyui")],
};
