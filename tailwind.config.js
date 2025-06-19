/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        monteserrat: ["Monteserrat", "sans-serif"],
      },
      fontWeight: {
        veryLight: "50",
      },
      colors: {
        midnightblue: "#2f3292",
        steelblue: "rgba(42, 91, 121, 0.09)",
        darkslateblue: {
          100: "#273a97",
          200: "#033d8b",
        },
        myGray: "rgba(255, 255, 255, 0.17)",
      },
      boxShadow: {
        midnight:
          "0px 0px 100px 10px rgba(25,25,112,0.9), 0px 0px 100px 10px rgba(25,25,112,0.9)",
      },
    },
  },
  plugins: [],
};
