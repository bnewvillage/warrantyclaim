export default [
  {
    files: ["**/*.{js,mjs}"],
    ignores: ["node_modules/**", "public/images/**", "styles/**"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        fetch: "readonly",
        Response: "readonly",
        Request: "readonly",
        Headers: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        FormData: "readonly",
        setTimeout: "readonly",
        alert: "readonly"
      },
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-console": "off",
      "prefer-const": "warn"
    },
  },
];
