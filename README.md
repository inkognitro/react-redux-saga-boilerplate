[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


# React Redux Typescript Boilerplate - Under construction!!!
Frontend boilerplate with time travelling through react and redux.

## Development mode
to run the app with hot module reloading at *//localhost:9000*, run:

    npm run start

## Production mode
to build the app in the *dist* folder, run:

    npm run build
    
## Features
1. Caching: Received api data is always stored in the redux store
2. Basic Authentication with [JWT](http://jwt.io)
3. Integrated async toasts in redux store
    - message waiting pipeline for animated toasts
    - multiple messages per toast
4. Sass support
5. Abstracted request handling with axios library in the background
6. UTC datetime handling
  
## Open todos
1. Toast creation and integration instead of using *alert('foo')*;
2. Authentication with JWT payload, considering TTL for cookie.
3. UTC datetime handling

## Appreciation
Many thanks to [Dan Abramov](http://github.com/gaearon) for his contributations in the JS world, especially with react and [redux](http://redux.js.org/).
It is and has always been a pleasure to learn from him.
