import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      display: ["Josefin Sans Variable", ...defaultTheme.fontFamily.sans],
      body: ["Bitter Variable", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
