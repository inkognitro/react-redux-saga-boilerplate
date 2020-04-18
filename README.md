[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/inkognitro/react-redux-saga-boilerplate/blob/master/LICENSE.md)

# React Redux Boilerplate (WIP)
Frontend boilerplate realized in [react](https://reactjs.org/) combined with [redux](http://redux.js.org/) and [redux-saga](http://redux-saga.js.org).
Written in [TypeScript](http://typescriptlang.org). Built with [webpack](http://webpack.js.org).

## Motivation
Sometimes it is hard to deliver good quality software due to economic time pressure.
With this project I try to provide a best practise frontend boilerplate to save nerves of developers,
clients, company owners and to close the circle, for me the gods on earth, again: the developers.
   
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
3. Bootstrap 4 SCSS and [material icons](http://material.io/resources/icons/) integration
4. Styling with [styled-components](http://styled-components.com/)
5. Request handling with [axios](http://npmjs.com/package/axios) library in the background
6. Loader integration according to running requests
7. UTC datetime handling with [moment](http://momentjs.com) in the background 
8. Basic form components
9. Prepared testing (see Testing section below)
10. Dynamic browser support. Have a look at [browsersl.ist](http://browsersl.ist/) and paste the content of `.browserslistrc`.
  
## Open todos (WIP)
1. Authentication package saga flow finalization.
2. Realisation of styles with styled-components instead of SASS.
3. Performance optimization by not running all sagas concurrently.

## Architecture
The target was to create a highly maintainable frontend boilerplate.
To be specific, the criterias were: readable code, steep learning curve, documentation, community support, easy testing.

So the architecture was divided in three layers:
1. **Domain Layer**: This is the source of truth layer. It holds your business logic, manages your app state, async action logic and side effects. Try to put in the most stuff in this layer to reuse it later. Never couple specific implementations (e.g. browser cookies or browser history) in this layer.
2. **Infrastructure Layer**: This is the layer where the specific implementations live in (e.g browser cookie storage for browser environments).
3. **UI Layer**: In this layer all web UI components live in.

One picture says more than thousand words:
![DDD info graphic](https://miro.medium.com/max/1262/1*P2p84f7XhW0LiLgZvxBSxw.png)
(source: [https://medium.com/ingeniouslysimple/command-vs-event-in-domain-driven-design-be6c45be52a9](https://medium.com/ingeniouslysimple/command-vs-event-in-domain-driven-design-be6c45be52a9))

By the way, if you strictly continue separating these layers, this project could also be extended with an additional "NativeUI" layer
for mobile devices (e.g. with [react-native](https://reactnative.dev/)). Already written business logic then can be reused from the domain layer.

### Evaluation: whys and whats
Architectures in general: [MVC vs. Flux vs. Redux](https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences).

Redux was taken because it makes modularity and maintainability a breeze giving you full control over every action happening during the runtime of your frontend app.
It works like a charm with DDD (Domain Driven Design) by providing a pattern to encapsulate view from business logic with its general bus for actions (e.g. commands, events).

The master question was to find the king solution for writing sync and async business logic.
Common redux libraries for that are [redux-thunk](https://www.npmjs.com/package/redux-thunk), [redux-saga](http://redux-saga.js.org) and [redux-observable](http://redux-observable.js.org).

[Redux-thunk](https://www.npmjs.com/package/redux-thunk) could be sorted out quite early:
Code gets really messy over time, testing is going to be hell.
Crawl through some articles and blogs on your own or try it out.
No further discussion here about [redux-thunk](https://www.npmjs.com/package/redux-thunk).

The two favorites obviously were redux-saga and redux-observable.
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

Read a [really good article](https://shift.infinite.red/redux-observable-epics-vs-redux-sagas-8e53610c0eda) about this and understand sagas' [flow principle](https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html).

## Testing
Integrated test runner is [jest](http://jestjs.io) (developed by facebook).
Business logic (redux-saga) is tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan).
React components are tested with [enzyme](https://enzymejs.github.io/enzyme/) (developed by Airbnb).

To execute the tests, run:

    npm run test

Tests are organized as follow (file suffix `.test.ts` required):
- Unit tests are integrated directly next to tested files. For example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- Integration tests for encapsulated module behaviour (e.g. toaster), are placed inside the module folder. As an example: `/src/Common/Domain/Toaster/Saga/Callables/ShowMessageHandling.integration.test.ts`.
- Integration tests for behaviour over multiple modules should be placed in the `tests` directory (e.g. `[rootDir]/tests/Common/Foo/Bar.integration.test.ts`).

As you can see, unit tests always have the suffix `.unit.test.ts`, integration tests the suffix `.integration.test.ts`.
Read another [smart article](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850) about testing structure.

**Something to ponder**: While practising TDD I think not only is it painful to write snapshot tests but also useless.
However in my opinion tests are here to develop faster and especially to prevent unwanted bugs.
Snapshot tests are expected to fail with every UI change.
Probably snapshot tests are not entirely bad but not really useful during development process.
Read this [amusing article](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon), it is and has always been a pleasure to learn from him.
