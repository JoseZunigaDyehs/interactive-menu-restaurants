// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: "/interactive-menu-restaurants/",
  site: "http://localhost:4322/interactive-menu-restaurants/",

  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
