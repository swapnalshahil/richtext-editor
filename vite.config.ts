import react from "@vitejs/plugin-react";
import * as path from "path";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react()
  ],
  css: {
      preprocessorOptions: {
          less: {
              javascriptEnabled: true,
          },
      },
  },
  define: { "process.env": process.env },

  optimizeDeps: {
      include: ["tailwind.config.js"],
  },
  resolve: {
      alias: {
          "@": resolve(__dirname, "./src"),
          "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
      },
  },
});