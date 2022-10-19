/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1B2430",
        "secondary": "#51557E",
        "secondaryShade": "#816797",
        "accent": "#D6D5A8"
      },
    },
  },
  plugins: [],
};
