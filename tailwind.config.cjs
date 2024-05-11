/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      "primary": "#C0A769",
      "background": "#212121",
      "gray-light": "#ADADAD",
      "gray": "#7E7E7E"
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
