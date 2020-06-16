module.exports = {
    "verbose": true,
    "clearMocks": true,
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },
    "testRegex": ".+\\.test\\.(j|t)sx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    "moduleNameMapper": {
        "Apps/WebApp/(.*)": "<rootDir>/src/Apps/WebApp/$1",
        "Packages/(.*)": "<rootDir>/src/Packages/$1",
    },
};
