const configBase = require('../../jest.config.base');
module.exports = {
    ...configBase,
    moduleNameMapper: {
        "packages/(.*)": "<rootDir>/../packages/src/$1",
    },
};
