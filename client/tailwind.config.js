/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        theme1: {
          primary: 'red',
          secondary: 'blue',
        },
        theme2: {
          primary: 'black',
          secondary: 'white',
        },
      },
    },
  },
  plugins: [],
}