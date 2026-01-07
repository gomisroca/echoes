import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      display: ["Josefin Sans Variable", ...defaultTheme.fontFamily.sans],
      body: ["Bitter Variable", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
} satisfies Config;
