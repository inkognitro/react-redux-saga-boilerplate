[![BadgeMITLicense: MIT](docs/assets/badgeMITLicense.svg)](LICENSE)

# React Redux Boilerplate
Ready to go monorepo frontend boilerplate for web and mobile app development.
Realized with [redux](http://redux.js.org/), [redux-saga](http://redux-saga.js.org) and [react](https://reactjs.org/).
Written in [TypeScript](http://typescriptlang.org).

## Motivation
Sometimes it is hard to deliver good quality software due to economic time pressure.
With this project I tried to provide a best practise frontend boilerplate.
Hopefully saving nerves of developers and other stakeholders.

## Knowledge base
To fully understand this project you should be familiar with the technologies below.
- [lerna](https://lerna.js.org/) (monorepo management)
- [react](https://reactjs.org/docs/getting-started.html)
- [redux (with react)](https://egghead.io/courses/getting-started-with-redux)
- [redux-saga](https://redux-saga.js.org/)
- [jest](https://jestjs.io/docs/en/getting-started) (unit testing)
- [react-test-renderer](https://reactjs.org/docs/test-renderer.html) (react component testing)
- [redux-saga-test-plan](https://survivejs.com/blog/redux-saga-test-plan-interview/) (integration testing)
- [eslint](https://eslint.org/docs/user-guide/getting-started) (code linting)
- [webpack](http://webpack.js.org) (web app bundling)

## Features
1. Http foundation and api template module:
    - Request handling with [axios](http://npmjs.com/package/axios) library in the background
    - Explicit type definitions e.g. `Request`, `Response` and saga generator functions per endpoint.
1. Basic [JWT](http://jwt.io) authentication:
    - JWT `exp` in UTC time, see `mock.http.request.dispatcher.ts` as the mock for several endpoints in dev mode
    - automatic token refresh, see `src/packages/src/common/authentication/domain/flow.ts`
    - ideally the authentication server responds with the `[jwtSecret]` cookie (`httpOnly` and `sameSite`) and `[jwtHeader].[jwtPayload]` in the response body, to be protected against XSS and CSRF attacks.
    - auth user generally saved at session storage, when required also at local storage - according to remember me flag
    - auth user type visible at `/src/packages/src/common/types/auth-user/domain/types.ts`
2. Toasts integration:
    - Smooth intro animation by automatically grouping new messages together
    - Grouping of messages in toasts (success, info, warning, error toasts)
    - Configurable options like (animation times, closable message, automatic close etc.)
3. Form components in redux:
    - Handling errors recursively trough every (partial) state tree (see `form` module)
    - Available form elements and customizable reducers (e.g. have a look at the login page's reducer)
4. Loader integration
    - Internal counter to show and hide a loader considering concurrent `showLoader` and `hideLoader` calls.
5. Test integration with [jest](https://jestjs.io/docs/en/getting-started), [react-test-renderer](https://reactjs.org/docs/test-renderer.html) and [redux-saga-test-plan](https://survivejs.com/blog/redux-saga-test-plan-interview/)
6. Code linting with [eslint](https://eslint.org/docs/user-guide/getting-started)
7. More: see the [docs](docs/api.docs.md)
    
### Web app
1. Bootstrap 4 SCSS and [material icons](http://material.io/resources/icons/) integration
2. Styling with [styled-components](http://styled-components.com/)
3. Dynamic browser support. Have a look at [browsersl.ist](http://browsersl.ist/) (paste the content of `.browserslistrc`)
    
### Mobile app
The purpose of the mobile app is a demonstration of using domain layer code in another view environment.
This was achieved by a small react native implementation of the `packages/common/toaster` module.

## Documentation
- [environment](docs/environment.md) - installation, development start, scripts
- [architecture](docs/architecture.md) - architecture and code structure
- [coding guidelines](docs/coding.guidelines.md) - please don't mess up this project
- [api documentations](docs/api.docs.md) - documentation for developers

## Appreciation
Many thanks to the awesome react community.
