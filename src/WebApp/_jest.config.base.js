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
        "Packages/(.*)": "<rootDir>/src/Packages/$1",
        "WebApp/(.*)": "<rootDir>/src/WebApp/$1",
        "MobileApp/(.*)": "<rootDir>/src/MobileApp/$1",
    },
};
