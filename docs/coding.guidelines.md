[« docs overview](../README.md)

# Coding Guidelines
This section requires knowledge of the [architecture](architecture.md).
With growing experience these recommendations can change.
Nothing is carved in stone here.

## File name convention
Files should be named lowercase. Different words in a file name should be split by a dot.

## Stay decoupled
We learn from bad practice and therefore I want to explain why it makes sense
to think twice about decoupling before writing some code.

In one of my workplaces we created a `RequestHandler` class.
The purpose of this class was to handle requests for every endpoint.
Depending on every response, one or multiple toast messages could be dispatched.

I bet you already see the problem: This shit is totally coupled and therefore not reusable.
I mean, what if we had another app without toasts?
Or what if we wanted a caching mechanism for that one specific endpoint?
Actually the weirdest thing in my eyes was following piece of code:

```javascript
// once upon a time in the response callback function:
if (response.statusCode === 401) {
   history.push('/login');
}
//...
```
What if we had no routes at all, for instance in an embeddable iframe app?
With this code, even `ui` logic was mixed with `domain` logic.
Routing to another url is definitely a `ui` layer thing and has nothing todo with request handling itself.

> Remember: A module can have dependencies to other modules.

For a better approach have a look at `http-foundation`, `http-api-v1` and `http-api-v1-toaster` modules.
All these modules are decoupled but together they provide the same functionality as the
horrible coupled `RequestHandler` class does.
To find out how these modules are plugged together,
just have a look at `./src/webapp/src/services.factory.ts`.

## Don't use default exports
It is recommended importing things like
`import { x } from 'foo';` and not by default exports `import x from 'foo';`.
Codebase changes overtime, so could default exports.
Default exports are just another hurdle for changing code, because outside modules are coupled to it.
I recommend avoiding default exports at all.

## Redux-saga
It's recommended splitting your redux-saga logic into `flows` and custom `effects`.

### `flow` - generator functions
This saga functions could also be called "handlers".
`Flows` are hierarchically composed by service factories.
Usually the root factory is the service factory of an app.
Dependencies are passed down by these factories.
Side effects are happening in these sagas.

### `effect` - generator functions
A `effect` is an independent saga, listening for commands and events, without dependencies :warning:.
A custom effect provides functionality, which otherwise must be double coded in other modules.

## Avoid circular imports
By avoiding circular import references, imports stay clear and comprehensible.
However, some bundlers have problems with circular import references.
Below you find some helpful rules:
1. Imports must only reach to the very next `index.ts(x)` file
2. Functionality of the same module should be imported relatively: `import { HttpFoundationEventTypes } from "./command";`
3. Functionality of another module should be imported absolutely: `import { executeRequest } from "packages/common/http-foundation`

## Separate import per layer
Imports always should reference to one specific layer. This avoids problems with bundlers.
Problem: Imagine there was a `index.ts` in the root of the `packages/common/translation` module,
which is exporting domain, native and web stuff.
If we would import things from this `index.ts` file into our mobile app,
we had unwanted dependencies to web components and likely to additional web libraries.
Therefore it is important to import things from `.../domain`, `.../ui` or `.../infrastructure` folders directly.
These folders should contain an `index.ts` file to export the corresponding module's public api.

## Why linting?
With linting rules all team members have the same understanding of code style.
Linting helps to read code more quickly and therefore increases productivity.
Within this project linting is done by [eslint](https://eslint.org/).

## Testing
[Jest](http://jestjs.io) is used as test runner.
The domain logic (redux-saga) can be tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan).
React components are tested by [react-test-renderer](https://reactjs.org/docs/test-renderer.html).

I recommend meeting following rules for testing:
- The file suffix `.test.ts` is required
- A unit test is placed next to the tested file. As an example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- Tests should either have the suffix `.unit.test.ts(x)` or `.integration.test.ts(x)`.

## Appendix
Following information is not necessary to know but may be interesting for you.

### Thoughts about testing
I think, because snapshot tests are expected to fail with every UI change, they are completely useless for TDD.
In my opinion, tests are here to develop faster and especially to prevent unwanted bugs.
Similar thoughts [here](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

Read a [smart article](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850) about testing structure.
