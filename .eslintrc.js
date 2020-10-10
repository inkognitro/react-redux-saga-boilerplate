module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 6,
    "project": "tsconfig.json"
  },
  "env": {
    "browser": true,
    "jest/globals": true
  },
  "extends": [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  "rules": {
    "no-console": ["error", {
      "allow": ["info", "error"]
    }],
    "react/prop-types": "off",
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "react/jsx-fragments": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "max-len": ["error", { "code": 130 }],
    "import/prefer-default-export": "off",
    "func-names": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "no-continue": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "guard-for-in": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "no-plusplus": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "linebreak-style": 0,
    "jest/expect-expect": "off",
    "import/no-extraneous-dependencies": "off",
    "default-case": "off"
  }
};
