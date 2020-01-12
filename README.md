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
    
## Features
1. Prepared caching of api data in redux store
2. Basic authentication with [JWT](http://jwt.io) and remember me flag (redux)
3. Integrated toasts (redux)
    - multiple messages per toast
    - message waiting pipeline for running animations (async visibility of toast messages)
4. Sass support
5. Abstracted request handling with [axios](http://npmjs.com/package/axios) library in the background
6. Running requests in redux store
7. Loader according to running requests (*request.isLoaderEnabled*)
8. UTC datetime handling
9. Basic form components
10. Integration of Bootstrap 4
11. Integration of Material Icons
  
## Open todos (in progress)
1. Authentication with JWT payload, considering TTL for cookie.
2. UTC datetime handling
3. Form components

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon) for his contributions in the JS world, especially with react and [redux](http://redux.js.org/).
It is and has always been a pleasure to learn from him.
