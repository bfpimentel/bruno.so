/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  printWidth: 100,
  singleQuote: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^[a-zA-Z](.*)$",
    "^@[^/](.*)$",
    "^(.*)/generated/(.*)$",
    "^(.*)/(?!generated)(.*)/(.*)$",
    "^[@/components/](.*)$",
    "^[./](.*)$",
  ],
}

export default config
