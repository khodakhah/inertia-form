import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import { resolve } from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import vuePlugin from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from "url";
import minimist from 'minimist';
const { f } = minimist(process.argv.slice(2));

export default defineConfig({
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "FormVue",
      fileName: "form-vue",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: f === 'iife' ? ['vue'] : ['vue'],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  },
});