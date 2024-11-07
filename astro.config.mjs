// @ts-check
import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel/serverless";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelServerless(),
  site: "https://echoes-writing.vercel.app",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    sanity({
      projectId: "z0aukxbh",
      dataset: "production",
      useCdn: false, // for static builds
      studioBasePath: "/studio",
    }),
    react(),
  ],
});
