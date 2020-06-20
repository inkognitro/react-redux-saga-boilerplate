[![BadgeMITLicense: MIT](docs/assets/badgeMITLicense.svg)](LICENSE)
![BadgeTestCoverage](docs/assets/badgeTestCoverage.svg)

# React Redux Boilerplate (WIP)
Frontend boilerplate realized in [react](https://reactjs.org/), [redux](http://redux.js.org/) and [redux-saga](http://redux-saga.js.org).
Written in [TypeScript](http://typescriptlang.org). Built with [webpack](http://webpack.js.org).

## Motivation
Sometimes it is hard to deliver good quality software due to economic time pressure.
With this project I try to provide a best practise frontend boilerplate to save nerves of developers
and other stakeholders.

## Knowledge base
To fully understand this project you should be familiar with the technologies below.
- [react](https://reactjs.org/docs/getting-started.html)
- [redux (with react)](https://egghead.io/courses/getting-started-with-redux)
- [redux-saga](https://redux-saga.js.org/)
- [jest](https://jestjs.io/docs/en/getting-started) (unit testing)
- [react-test-renderer](https://reactjs.org/docs/test-renderer.html) (react component testing)
- [redux-saga-test-plan](https://survivejs.com/blog/redux-saga-test-plan-interview/) (integration testing)
- [eslint](https://eslint.org/docs/user-guide/getting-started) (code linting)
   
## Installation
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Open console and move into project folder
4. Run *npm install*
5. Configure eslint (optional, see "Configure eslint" section)
6. Follow the steps below to
   - either: serve the app for development mode (see "Development mode" section)
   - or: to build the app for production (see "Production mode" section)
7. Continuous integration (optional): Execute `npm run ci` to automatically test and build the app for every push on your project repository.
  
## Development mode
To run the app with hot module reloading at *//localhost:9000*, run:

    npm run start:webapp

## Production mode
To build the app in the *dist* folder, run:

    npm run build:webapp
    
## Open todos (WIP)
1. Better simulation of authentication refresh in `Packages/Common/Authentication` module
2. Remove `ModuleCollections` and divide Modules in `Domain`, `UI`, `Infrastructure` and `SubModules`
3. Test coverage
4. (Concurrent saga performance analysis)
5. (Usage of [react hooks](https://reactjs.org/docs/hooks-intro.html) instead of class components)
  
## Features
1. Basic [JWT](http://jwt.io) authentication:
    - with remember me flag
    - ideally the authentication server responds with the [jwtSecret]-httpOnly-cookie and [jwtHeader].[jwtPayload] in the response body, to be protected against XSS and CSRF attacks.
    - simulated with a mocked http request dispatcher in development mode
2. Toasts integration
    - multiple messages per toast
    - pipelined messages considering running toast animations (async visibility of toasts)
3. Bootstrap 4 SCSS and [material icons](http://material.io/resources/icons/) integration
4. Styling with [styled-components](http://styled-components.com/)
5. Request handling with [axios](http://npmjs.com/package/axios) library in the background
6. Loader integration according to running requests
7. UTC datetime handling with [moment](http://momentjs.com) in the background 
8. Basic form components
9. Prepared testing (see Testing section below)
10. Dynamic browser support. Have a look at [browsersl.ist](http://browsersl.ist/) and paste the content of `.browserslistrc`.
11. Linting with Airbnb presets

## Architecture
link to readme..


## Project Structure
This project is divided in `Apps`, `Packages`, `ModuleCollections` and `Modules`.
Following definitions should clarify how the project code is structured.

- `Package:` A package is a collection of `ModuleCollections` and `Modules`. A package can be considered as a root `module collection` without an `index.ts` file.
- `Module:` A module contains a strongly coupled features. Every module contains an `index.ts` file, which defines its public API. Every module is divided in domain, infrastructure and UI layer.
- `ModuleCollection:` A module collection contains multiple modules and other module collections. A module collection contains an `index.ts` file to define its public API.
- `App:` An app (e.g. WebApp) is a standalone application, which uses several modules from different packages. Furthermore it can contain its own specific modules or module collections. Ideally most stuff is kept reusable and sourced out to packages.

With this feature based structure, it is ensured that specific features easily can be generalized and vise versa.


## Testing
The integrated test runner is [jest](http://jestjs.io).
Business logic (redux-saga) is tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan).
React components are tested with [react-test-renderer](https://reactjs.org/docs/test-renderer.html).

To execute the tests, run:

    npm run test

Tests are organized as follow:
- The file suffix `.test.ts` is required
- A unit test is placed next to the tested file. As an example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- An integration test for encapsulated module behaviour (e.g. toaster), is placed inside the module folder. As an example `/src/Packages/Common/Domain/Toaster/Saga/Flow/ShowMessageHandling.integration.test.ts`.

As you can see, unit tests always have the suffix `.unit.test.ts`, integration tests the suffix `.integration.test.ts`.
Read a [smart article](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850) about testing structure.

I think, because snapshot tests are expected to fail with every UI change, they are completely useless for TDD.
In my opinion, tests are here to develop faster and especially to prevent unwanted bugs.
Similar thoughts [here](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

## Appreciation
Many thanks to the awesome [Dan Abramov](http://github.com/gaearon), for redux and the [ingeniously great redux video tutorial](https://egghead.io/courses/getting-started-with-redux).
