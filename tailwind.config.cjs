/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      "primary": "#C0A769",
      "background": "#212121",
      "background-dark": "#121212",
      "gray-light": "#ADADAD",
      "gray": "#7E7E7E",
      "white": "#fff",
      "black": "#000",
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
