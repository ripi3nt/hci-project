import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/hci-project/",
  build: {
    outDir: "./docs",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
