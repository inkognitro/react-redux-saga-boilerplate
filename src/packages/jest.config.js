const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    preset: "react-native",
    moduleNameMapper: {
        "packages/(.*)": "<rootDir>/src/$1",
    },
};
