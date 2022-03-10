import path from "path";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(() => {
  return {
    plugins: [vue()],
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, "./src/index.ts"),
        name: "core",
        formats: ["cjs"],
      },
      rollupOptions: {
        external: ["@virtoshell/api-client", "vue"],
        output: {
          globals: {
            vue: "Vue",
            "@virtoshell/api-client": "@virtoshell/api-client",
          },
        },
        plugins: [
          typescript({
            tsconfig: path.resolve(__dirname, "./tsconfig.json"),
          }),
        ],
      },
    },
  };
});
