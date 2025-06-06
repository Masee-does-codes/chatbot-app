import eslintPluginNode from "eslint-plugin-n";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    plugins: { n: eslintPluginNode },
    rules: {
      "n/no-missing-import": "off",
      "quotes": ["error", "double"],
    },
  },
];

