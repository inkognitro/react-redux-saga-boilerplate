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
        "Entity/(.*)": "<rootDir>/src/Entity/$1",
        "Packages/(.*)": "<rootDir>/src/Packages/$1",
        "SinglePageWebApp/(.*)": "<rootDir>/src/SinglePageWebApp/$1"
    },
    "coverageDirectory": "<rootDir>/docs/coverage",
    "coverageReporters": [
        "json-summary"
    ]
};