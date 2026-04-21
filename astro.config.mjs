import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter:
    process.env.NODE_ENV === "docker-production"
      ? node({ mode: "standalone" })
      : vercel(),
  site: "https://echoes-writing.vercel.app",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
    sanity({
      projectId: "z0aukxbh",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
