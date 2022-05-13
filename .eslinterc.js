module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "mocha", "import", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error"
    ],
    "@typescript-eslint/unbound-method": [
      "error"
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error"
    ],
    "@typescript-eslint/promise-function-async": [
      "error"
    ],
    "object-shorthand": [
      "error",
      "always"
    ],
    "no-console": "error",
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "semi": [
      "error",
      "always"
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "mocha/no-exclusive-tests": "error",
    "import/no-internal-modules": [
      "error",
      {
        "allow": [
          "fp-ts/lib/*",
          "rxjs/operators"
            ]
          }
      ],
      "prettier/prettier": [
          "error",
          {
              "singleQuote": true,
              "tabWidth": 4,
              "printWidth": 160,
              "bracketSpacing": false
          }
      ],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
  }
}