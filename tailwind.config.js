/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        monteserrat: ["Monteserrat", "sans-serif"],
        great: ['"Great Vibes"', 'cursive'],
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
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.3)",
        DEFAULT: "2px 2px 4px rgba(0,0,0,0.5)",
        lg: "3px 3px 6px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow")
  ],
};
