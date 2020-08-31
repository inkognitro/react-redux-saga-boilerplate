[« docs overview](../README.md)

# Environment
This section describes how this monorepo can be handled.

## Installation
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Install yarn globally: `npm install yarn -g`
4. Install lerna globally: `npm install lerna -g`
5. Open console and move into project folder, run:  `lerna bootstrap`
6. Configure eslint (see below)

## Eslint configuration
Below you can see the eslint configuration for [WebStorm](https://www.jetbrains.com/webstorm).

Automatic detection of `.eslintrc.json` in the project folder:
![esLintAutomaticDetection](assets/esLintAutomaticDetection.png)

Replace `Strg + Alt + L` shortcut with eslint fix:
![esLintKeymapShortcut](assets/esLintKeymapShortcut.png)

## WebApp development
To run the web app with hot module reloading at `//localhost:9000`, run:

    \Foo\Bar\MonorepoRootFolder> yarn run start:spa
    
## MobileApp development
To run the mobile app with hot module reloading on android device emulator, run:

    \Foo\Bar\MonorepoRootFolder> yarn run start:android

## Scripts
Following scripts are executed for every yarn workspace.
Be aware that these commands require [yarn](https://yarnpkg.com/) and [lerna](https://lerna.js.org/) as a global dependency.
The `src/MobileApp` package is not yet being integrated and therefore not yet included in these scripts.

To install install `node_modules` in every package, run:

    \Foo\Bar\MonorepoRootFolder> lerna bootstrap

To remove `node_modules` from all packages, run:

    \Foo\Bar\MonorepoRootFolder> lerna clean

To run all package tests, run:

    \Foo\Bar\MonorepoRootFolder> yarn run test

To type check every package, run:

    \Foo\Bar\MonorepoRootFolder> yarn run tsc

To lint every package without fixing it, run:

    \Foo\Bar\MonorepoRootFolder> yarn run lint

To lint every package with fixing it, run:

    \Foo\Bar\MonorepoRootFolder> yarn run lint:fix

Continuous integration. To execute tests, type check, lint fix and build every package, run:

    \Foo\Bar\MonorepoRootFolder> yarn run ci