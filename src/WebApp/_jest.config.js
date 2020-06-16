const configBase = require('../../../jest.config.base');
module.exports = {
    ...configBase,
    rootDir: '../../..',
    roots: [
        '<rootDir>/src/WebApp',
    ],
};
