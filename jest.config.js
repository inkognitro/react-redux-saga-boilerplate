module.exports = {
    "verbose": true,
    "setupFiles": [
        "<rootDir>/jest.enzyme.config.js"
    ],
    "roots": [
        "<rootDir>/src",
    ],
    "clearMocks": true,
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "transformIgnorePatterns": [
        "node_modules/"
    ],
    "testRegex": ".+\\.test\\.(j|t)sx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    "moduleNameMapper": {
        "Common/(.*)": "<rootDir>/src/Common/$1",
        "SinglePageApp/(.*)": "<rootDir>/src/SinglePageApp/$1"
    },
    "coverageDirectory": "<rootDir>/docs/coverage",
    "coverageReporters": [
        "json-summary"
    ]
};