module.exports = {
    "parser": "@typescript-eslint/parser",
    "extends": [
        "react-app",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/babel",
        "prettier/react",
    ],
    "plugins": [
        "@typescript-eslint",
        "import",
        "jsx-a11y",
        "prettier",
        "react",
        "react-hooks",
    ],
    "rules": {
        "no-use-before-define": "off",
        "prettier/prettier": "error",
        "import/no-default-export": "error",
        "no-duplicate-imports": "error",
        "import/no-internal-modules": [ "error", {
            "allow": [
                "redux-saga/effects",
                "gsap/CSSPlugin",
                "bootstrap/scss/bootstrap.scss",
                "@material-ui/icons/**",
                "react-native/**",
            ],
        }],
        "no-restricted-imports": ["error", {
            "paths": ["*"],
            "patterns": [
                "**/domain/**",
                "**/ui/**",
                "!**/ui/web",
                "**/ui/web/**",
                "!**/ui/native",
                "**/ui/native/**",
                "!**/ui/all",
                "**/ui/all/**",
                "**/infrastructure/**",
            ],
        }],
    },
};
