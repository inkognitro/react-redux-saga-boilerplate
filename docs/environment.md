[« docs overview](../README.md)

# Environment
This section describes how this monorepo can be handled.

## Installation
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Install yarn globally: `npm install yarn -g`
4. Install lerna globally: `npm install lerna -g`
5. Open console and move into project folder, run:  `lerna bootstrap`

## Web app development
To run the web app with hot module reloading at `//localhost:9000`, run:

    \Foo\Bar\MonorepoRootFolder> yarn run start:spa
    
## Mobile app development
To run the mobile app with hot module reloading on android device emulator, run:

    \Foo\Bar\MonorepoRootFolder> yarn run start:android

## Scripts
Following scripts are executed for every sub repository via lerna.
Be aware that these commands require [yarn](https://yarnpkg.com/) and [lerna](https://lerna.js.org/) as a global dependency.
Due to limitations of the react-native the `src/mobile-app` package is not yet integrated as a yarn workspace
and has no lerna management support in this project.

To install install `node_modules` in every package, run:

    lerna bootstrap

To remove `node_modules` from all packages (mobile-app excluded), run:

    lerna clean

To run all package tests (mobile-app excluded), run:

    yarn run test

To type check every package, run:

    yarn run tsc

To test linting for every package, run:

    yarn run lint

To fix linting for every package, run:

    yarn run lint:fix

To execute tests, type check, lint fix and build every package, run:

    yarn run ci
