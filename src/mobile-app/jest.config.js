const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    preset: "react-native",
    moduleNameMapper: {
        "packages/(.*)": "<rootDir>/../packages/src/$1",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-native)"
    ],
};
