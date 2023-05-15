import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        settings: resolve(__dirname, "templates/main.html"),
        timer: resolve(__dirname, "templates/timer.html")
      },
      //output: {
      //  chunkFileNames: 'assets/js/[name]-[hash].js',
      //  entryFileNames: 'assets/js/[name]-[hash].js',

      //  assetFileNames: (name) => {
      //    let info = name.name.split(".");
      //    let ext = info[info.length - 1]
      //    if (/\.(html)$/.test(ext)){
      //        return 'assets/templates/[name][extname]';
      //    }

      //    // default value
      //    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
      //    return 'assets/[name]-[hash][extname]';
      //  },
      //},
    }
  },
});
