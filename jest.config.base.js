module.exports = {
    "verbose": true,
    "clearMocks": true,
    "transform": {
        "^.+\\.(j|t)sx?$": "babel-jest"
    },
    "testRegex": ".+\\.test\\.(j|t)sx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    "coverageDirectory": "<rootDir>/coverage",
    "coverageReporters": [
        "json-summary"
    ],
};
