/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gucci: {
          primary: "#401f1c", // Dark red/brown
          secondary: "#2c5234", // Complementary dark green
          accent: "#a25035", // Complementary lighter red
        },
        ysl: {
          primary: "#765707", // Dark yellow/brown
          secondary: "#423d0f", // Complementary dark olive
          accent: "#c9b458", // Complementary lighter yellow
        },
        basic: {
          primary: "#f7f8f9", // Light grey/white
          secondary: "#cbd5e1", // Complementary light blue
          accent: "#9ea7aa", // Complementary grey
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
