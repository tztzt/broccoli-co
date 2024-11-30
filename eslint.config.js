import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules (e.g., fs, path)
            "external", // Packages from `node_modules`
            "internal", // Internal modules (e.g., alias paths in webpack)
            ["parent", "sibling", "index"], // Relative imports
            "object", // Object imports (e.g., import { something } from './file')
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before", // Position React imports at the top of external imports
            },
            {
              pattern: "@/**", // Match alias paths (e.g., "@/components")
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"], // Exclude React from the normal order
          "newlines-between": "always", // Enforce blank lines between groups
          alphabetize: {
            order: "asc", // Alphabetize within groups
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);
