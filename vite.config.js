import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gm: resolve(__dirname, "templates/gm.html"),
        player: resolve(__dirname, "templates/player.html"),
        timer: resolve(__dirname, "templates/timer.html"),
      },
    }
  },
});
