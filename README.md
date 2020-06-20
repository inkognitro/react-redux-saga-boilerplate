[![BadgeMITLicense: MIT](docs/assets/badgeMITLicense.svg)](LICENSE)

# React Redux Boilerplate (WIP)
Monorepo frontend boilerplate for mobile and web app development. Realized with [react](https://reactjs.org/), [redux](http://redux.js.org/) and [redux-saga](http://redux-saga.js.org).
Written in [TypeScript](http://typescriptlang.org).

## Motivation
Sometimes it is hard to deliver good quality software due to economic time pressure.
With this project I try to provide a best practise frontend boilerplate to save nerves of developers
and other stakeholders.

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
   
## Open todos (WIP)
1. Better simulation of authentication refresh in `Packages/Common/Authentication` module
2. Remove `ModuleCollections` and divide Modules in `Domain`, `UI`, `Infrastructure` and `SubModules`
3. Integration of `src/MobileApp` as an additional yarn workspace (pay also attention to environment docs)
4. Test coverage + badge integration
5. (Concurrent saga performance analysis)
6. (Usage of [react hooks](https://reactjs.org/docs/hooks-intro.html) instead of class components)
  
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

## Documentation
- [Environment](./docs/Environment.md): Installation, development start, scripts
- [Architecture](./docs/Architecture.md): Architecture and code structure.
- [Coding guidelines](./docs/CodingGuidelines.md): Please don't mess up this project.
- [API documentation](./docs/ApiDocs.md): Documentation for existing code and its usage.

## Appreciation
Many thanks to the awesome [Dan Abramov](http://github.com/gaearon), for redux and the [ingeniously great redux video tutorial](https://egghead.io/courses/getting-started-with-redux).
