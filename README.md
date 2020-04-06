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
to run the app with hot module reloading at *//localhost:9000*, run:

    npm run start

## Production mode
to build the app in the *dist* folder, run:

    npm run build
    
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
  
## Open todos (WIP)
1. Refactoring to saga of "CommonWIP" packages
2. Performance optimization by not running all sagas concurrently
3. Integration of logic testing (probably) with jest
4. Integration of react component testing with enzyme
5. Correct configuration for at least IE11 support

## Architecture (whys and whats)
Architectures in general: [MVC vs. Flux vs. Redux](https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences).

Redux makes modularity and maintainability a breeze giving you full control over every action happening until the runtime of your frontend app.

It works like a charm with Domain Driven Design by providing a pattern to encapsulate view from business logic and its general bus for actions (e.g. commands, events).

Common libraries for redux with async actions are [redux-thunk](https://www.npmjs.com/package/redux-thunk), [redux-saga](http://redux-saga.js.org) and [redux-observable](http://redux-observable.js.org).
The target was to create a highly sustainable frontend boilerplate, also for large teams.

To be specific, the criterias were: readable code, steep learning curve, documentation, community support, easy testing.

So [redux-thunk](https://www.npmjs.com/package/redux-thunk) could be sorted out early: Code gets really messy over time, testing is going to be hell.
Crawl through some articles and blogs on your own or try it out. No further discussions here about [redux-thunk](https://www.npmjs.com/package/redux-thunk) at this point.

So the two favorites were redux-saga and redux-observable.
Following comparison will give you the final hint why [redux-saga](http://redux-saga.js.org) was chosen over [redux-observable](http://redux-observable.js.org):

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

Read a [really good article about this](https://shift.infinite.red/redux-observable-epics-vs-redux-sagas-8e53610c0eda) or understand sagas' [flow principle](https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html) (search for "loginFlow").

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon), it is and has always been a pleasure to learn from him.
