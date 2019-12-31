[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


# React Redux Typescript Boilerplate - Under construction!!!
Frontend boilerplate with time travelling through react and redux, written in TypeScript.
 
## Setup
1. Install the latest version of [NodeJS](http://nodejs.org/en/download/)
2. Clone or download this repository
3. Move into project directory in console
4. Run *npm install* in console
5. Follow the steps below to
   - either: serve de app in development mode
   - or: to build the app for production

## Development mode
to run the app with hot module reloading at *//localhost:9000*, run:

    npm run start

## Production mode
to build the app in the *dist* folder, run:

    npm run build
    
## Features
1. Caching: Received api data is cached in redux store
2. Basic authentication with [JWT](http://jwt.io) and remember me flag
3. Integrated toasts in redux store
    - multiple messages per toast
    - async support (message waiting pipeline for running animations)
4. Sass support
5. Abstracted request handling with [axios](http://npmjs.com/package/axios) library in the background
6. UTC datetime handling
7. Basic form components
8. Integration of Bootstrap 4
  
## Open todos (in progress)
1. Toast creation and integration instead of using *alert('foo')*;
2. Authentication with JWT payload, considering TTL for cookie.
3. UTC datetime handling
4. Form components

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon) for his contributions in the JS world, especially with react and [redux](http://redux.js.org/).
It is and has always been a pleasure to learn from him.
