import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,

  react.configs.recommended,
  react.configs["jsx-runtime"],
  reactHooks.configs.recommended,

  {
    ignores: ["dist", ".eslintrc.cjs"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },

    settings: {
      react: {
        version: "18.2",
      },
    },

    plugins: {
      "react-refresh": reactRefresh,
    },

    rules: {
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true},], 
    },
  },
];