/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #E4E5E6, #00416A)",
      },
    },
  },
  plugins: [],
};
