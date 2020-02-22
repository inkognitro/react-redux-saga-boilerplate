[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


# React Redux Typescript Boilerplate - Under construction!!!
Frontend boilerplate with time travelling through react and redux, written in TypeScript.
 
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
    
## Architecture and features
1. Dependency injection through passing services down via props (implementation on webpack entry points)
2. Prepared caching of api data in redux store
3. Basic authentication with [JWT](http://jwt.io) - with remember me flag: Ideally the authentication server responds with the [jwtSecret]-httpOnly-cookie and [jwtHeader].[jwtPayload] in the response body, to be protected against XSS and CSRF attacks.
4. Integrated toasts (redux)
    - multiple messages per toast
    - message waiting pipeline for running animations (async visibility of toast messages)
5. Sass support
6. Abstracted request handling with [axios](http://npmjs.com/package/axios) library in the background
7. Running requests in redux store
8. Loader according to running requests (*request.isLoaderEnabled*)
9. UTC datetime handling
10. Basic form components
11. Integration of Bootstrap 4
12. Integration of Material Icons
  
## Open todos (in progress)
1. Integration of component testing with enzyme
2. Integration of logic testing with jest
3. Correct configuration for at least IE11 support

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon) for his contributions in the JS world, especially with react and [redux](http://redux.js.org/).
It is and has always been a pleasure to learn from him.
