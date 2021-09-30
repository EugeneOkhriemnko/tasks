module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ["**/*.common.js"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/ban-ts-comment": "warn",
  },
};
