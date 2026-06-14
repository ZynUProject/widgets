import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/embed/index.ts"),
      name: "ZynuWidgets",
      fileName: (format) => `zynu-widgets.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
});
