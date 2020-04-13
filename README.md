[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# React Redux Boilerplate (WIP)
Frontend boilerplate realized in [react](https://reactjs.org/) combined with [redux](http://redux.js.org/) and [redux-saga](http://redux-saga.js.org).
Written in [TypeScript](http://typescriptlang.org). Built with [webpack](http://webpack.js.org).

## Installation
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Open console and move into project folder
4. Run *npm install*
5. Follow the steps below to
   - either: serve the app for development mode
   - or: to build the app for production

## Development mode
To run the app with hot module reloading at *//localhost:9000*, run:

    npm run start-spa

## Production mode
To build the app in the *dist* folder, run:

    npm run build-spa
    
## Features
1. Basic [JWT](http://jwt.io) authentication:
    - with remember me flag
    - ideally the authentication server responds with the [jwtSecret]-httpOnly-cookie and [jwtHeader].[jwtPayload] in the response body, to be protected against XSS and CSRF attacks.
2. Toasts integration
    - multiple messages per toast
    - pipelined messages considering running toast animations (async visibility of toasts)
3. Bootstrap 4 integration, [material icons](http://material.io/resources/icons/) integration + SASS support
4. Request handling with [axios](http://npmjs.com/package/axios) library in the background
5. Loader integration according to running requests
6. UTC datetime handling with [moment](http://momentjs.com) in the background 
7. Basic form components
8. Integrated testing library is [jest](http://jestjs.io). Saga business logic can be tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan) using jest.
  
## Open todos (WIP)
1. Authentication package saga flow finalization
2. Performance optimization by not running all sagas concurrently
3. Integrate enzyme for react component testing

## Architecture (whys and whats)
Architectures in general: [MVC vs. Flux vs. Redux](https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences).

Redux makes modularity and maintainability a breeze giving you full control over every action happening until the runtime of your frontend app.

It works like a charm with Domain Driven Design by providing a pattern to encapsulate view from business logic and its general bus for actions (e.g. commands, events).

Common libraries for redux async actions are [redux-thunk](https://www.npmjs.com/package/redux-thunk), [redux-saga](http://redux-saga.js.org) and [redux-observable](http://redux-observable.js.org).
The target was to create a highly maintainable frontend boilerplate.
To be specific, the criterias were: readable code, steep learning curve, documentation, community support, easy testing.

[Redux-thunk](https://www.npmjs.com/package/redux-thunk) could be sorted out early: Code gets really messy over time, testing is going to be hell.
Crawl through some articles and blogs on your own or try it out. No further discussion here about [redux-thunk](https://www.npmjs.com/package/redux-thunk).

The two favorites were redux-saga and redux-observable.
Following comparison will give a hint why [redux-saga](http://redux-saga.js.org) was chosen over [redux-observable](http://redux-observable.js.org):

**redux-observable**:
- (+) easy testing (error prone if you don't know exactly what you are doing..)
- (+) RxJs observable is a widespread technology
- (-) really hard to learn in comparison to redux-saga
- (+) documentation
- (+) no callback hell

**redux-saga**:
- (+) easy-testing
- (+) steep learning curve
- (+) big community
- (+) documentation
- (+) no callback hell
- (+) more control with yield over async await

**own redux middleware**:
- (+) full control 
- (-) head around testing and possibly mocking everything on your own
- (-) error prone
- (-) no community, no documentation

Read a [really good article about this](https://shift.infinite.red/redux-observable-epics-vs-redux-sagas-8e53610c0eda) or understand sagas' [flow principle](https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html).

## Testing
To execute the tests, run:

    npm run test

Tests are organized as follow (file suffix `.test.ts` required):
- Unit tests are integrated directly next to the tested file. For example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- Integration tests for encapsulated module behaviour (e.g. toaster), are placed inside the module folder. As an example: `/src/Common/Domain/Toaster/Command/ShowMessage.int.test.ts`.
- Integration tests for behaviour over multiple modules should be placed in the `tests` directory (e.g. `[projectDirectory]/tests/Common/Foo/Bar.int.test.ts`).

As you can see, unit tests always have the suffix `.unit.test.ts`, integration tests the suffix `.integration.test.ts`.
Read [another smart article about testing structure](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850).

**Something to ponder**: While practising TDD I think not only is it painful to write snapshot tests but also useless.
However in my opinion tests are here to develop faster and especially to prevent unwanted bugs.
Snapshot tests are expected to fail with every UI change.
Have a look at [this article](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon), it is and has always been a pleasure to learn from him.
