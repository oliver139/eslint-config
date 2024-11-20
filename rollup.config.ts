import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import { dts } from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      del({ targets: "dist/*" }),
      esbuild({
        minify: true,
        drop: ["console", "debugger"],
      }),
      json(),
    ],
    external: [
      "@antfu/eslint-config",
      "eslint-plugin-vuejs-accessibility",
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.cts",
        format: "cjs",
      },
      {
        file: "dist/index.d.ts",
        format: "esm",
      },
    ],
    plugins: [dts({
      // https://github.com/Swatinem/rollup-plugin-dts/issues/143
      compilerOptions: { preserveSymlinks: false },
      respectExternal: true,
    })],
  },
];
