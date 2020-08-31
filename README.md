[![BadgeMITLicense: MIT](docs/assets/badgeMITLicense.svg)](LICENSE)

# React Redux Boilerplate
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
   
## Next steps
1. Integration of `src/mobile-app` as an additional yarn workspace (pay also attention to environment docs)
2. Test coverage + badge integration
3. Usage of [react hooks](https://reactjs.org/docs/hooks-intro.html) instead of class components
  
## Features
Below the common features are listed. Followed additional features are divided in web and mobile app features.

1. Basic [JWT](http://jwt.io) authentication:
    - with remember me flag
    - ideally the authentication server responds with the [jwtSecret]-httpOnly-cookie and [jwtHeader].[jwtPayload] in the response body, to be protected against XSS and CSRF attacks.
    - simulated with a mocked http request dispatcher in development mode
2. Toasts integration
    - multiple messages per toast
    - pipelined messages considering running toast animations (async visibility of toasts)
3. Loader integration e.g. for running requests
4. UTC datetime handling with [moment](http://momentjs.com) in the background
5. Test integration with jest (see [coding guidelines](docs/coding.guidelines.md))
6. Code linting (see [coding guidelines](docs/coding.guidelines.md))
    
### Web app
1. Bootstrap 4 SCSS and [material icons](http://material.io/resources/icons/) integration
2. Styling with [styled-components](http://styled-components.com/)
3. Request handling with [axios](http://npmjs.com/package/axios) library in the background
4. Basic form components
5. Dynamic browser support. Have a look at [browsersl.ist](http://browsersl.ist/) and paste the content of `.browserslistrc`.
    
### Mobile app
The mobile apps purpose is to demonstrate where to put the code for mobile
and especially how to reuse the domain logic with react native.
This was done with the `packages/common/toaster` module.
Certainly the project also can be used as a starter for mobile app development.
Nevertheless the primary focus for this project was on the overall architecture and the web view.

## Documentation
- [Environment](docs/environment.md): Installation, development start, scripts
- [Architecture](docs/architecture.md): Architecture and code structure.
- [Coding guidelines](docs/coding.guidelines.md): Please don't mess up this project.
- [Api documentation](docs/api.docs.md): Documentation for existing code and its usage.

## Appreciation
Many thanks to the awesome [Dan Abramov](http://github.com/gaearon), for redux and the [ingeniously great redux video tutorial](https://egghead.io/courses/getting-started-with-redux).
