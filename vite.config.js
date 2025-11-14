import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "/sleepoutside-team05/", // 👈 This is critical for GitHub Pages

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
