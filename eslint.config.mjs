import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // The site is a static export (output: "export") — next/image's optimizer
      // is unavailable, so plain <img> with pre-sized assets is intentional.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
