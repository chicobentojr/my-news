import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vite";
// import ssr from "vite-plugin-ssr/plugin";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // ssr: {
  // external: ["jsdom"],
  // external: ["jsdom", "fs", "fs/promises"],
  // noExternal: ["jsdom"],
  // },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/my-news/",
  // build: {
  //   rollupOptions: {
  //     external: ["fs/promises"],
  //   },
  // },
});
