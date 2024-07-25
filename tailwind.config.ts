/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "white",
      black: "black",
      lightgreen: "rgb(143, 182, 159)",
      brown: "#302A25",
      lightbrown: "rgb(169 164 161)",
      darkbrown: "#302A25",
      darkgray: "#F2EEE6",
      red: "rgb(239 68 68)",
      gray: "#F2EEE6",
      "custom-hsla1": "hsla(40, 32%, 93%, 0)",
      "custom-hsla2": "hsla(40, 32%, 93%, 0.63)",
      "custom-f2eee6": "#f2eee6",
    },
    screens: {
      lg: { max: "1024px" },
      tab: { max: "991px" },
      mob: { max: "768px" },
    },
  },
  plugins: [],
};
