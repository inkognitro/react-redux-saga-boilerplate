module.exports = {
    "rootDir": 'src',
    "projects": [
        "<rootDir>/Packages/jest.config.js",
        "<rootDir>/Apps/WebApp/jest.config.js",
    ],
    "coverageDirectory": "<rootDir>/docs/coverage",
    "coverageReporters": [
        "json-summary"
    ],
};
