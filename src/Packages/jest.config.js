const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    preset: "react-native",
    moduleNameMapper: {
        "Packages/(.*)": "<rootDir>/src/$1",
    },
};
