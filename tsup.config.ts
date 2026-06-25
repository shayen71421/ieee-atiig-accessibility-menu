import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  tsconfig: "tsconfig.build.json",
  loader: {
    ".css": "copy",
  },
  outDir: "dist",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
})
