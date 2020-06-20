[« docs overview](../README.md)

# Environment
This section describes how this monorepo can be handled.

## Installation
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Install yarn globally: `npm install yarn -g`
4. Install lerna globally: `npm install lerna -g`
5. Open console and move into project folder, run:  `lerna bootstrap`
6. Configure eslint, described in [coding guidelines](./CodingGuidelines.md)


## Start developing
tbd...

## Scripts
To install all node modules (except MobileApp), run:

    lerna bootstrap

To remove all node modules (except MobileApp), run:

    lerna clean

To run the tests in every package, run:

    lerna run test


To type check every package, run:

    lerna run tsc
