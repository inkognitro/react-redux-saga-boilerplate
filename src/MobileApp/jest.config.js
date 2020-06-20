const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    preset: "react-native",
    moduleNameMapper: {
        "Packages/(.*)": "<rootDir>/../Packages/src/$1",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-native)"
    ],
};
