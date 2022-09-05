import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  external: ["voxelchain"],
  output: [
    {
      file: "dist/index.js",
      format: "iife",
      globals: {"voxelchain": "VoxelChain"},
    },
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      tsconfig: "./tsconfig.json",
      module: "esnext",
    }),
    resolve(),
    commonjs({
      include: "./node_modules/**"
    }),
    terser(),
  ]
};
