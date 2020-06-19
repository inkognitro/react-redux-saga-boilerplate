const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    moduleNameMapper: {
        "Packages/(.*)": "<rootDir>/../Packages/src/$1",
    },
};
