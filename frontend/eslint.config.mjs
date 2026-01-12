import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rules for production build
  {
    rules: {
      // Allow unescaped entities (common in Dutch/English text)
      "react/no-unescaped-entities": "off",
      // Allow setState in effects for SSR/hydration patterns
      "react-hooks/set-state-in-effect": "off",
      // Allow Math.random in refs (for unique IDs)
      "react-hooks/purity": "off",
      // Allow ref access in custom hooks return
      "react-hooks/refs": "off",
      // Unused vars as warnings
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow any in specific cases
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
