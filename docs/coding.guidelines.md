[« docs overview](../README.md)

# Coding Guidelines
This section requires knowledge of the [architecture](architecture.md).

Below you can see some recommended coding guidelines.
With growing experience these guidelines will change.
Nothing is carved in stone here.

## Be explicit about parameters. Stay decoupled.
In one of my workplaces we had a lot of trouble being implicit instead of explicit in programming.
As an example we created a `RequestHandler` class as a handler for every api call.
As time went by, this class grew with new implicit features like showing a loader every time a request was dispatched.
Soon we got into trouble because e.g. not in all places where a request is dispatched also a loader needs to be shown.
So we began to explicitly pass parameters for what we NOT WANT and not for what WE WANT.
This sounds really awful, doesn't it?
Furthermore there was no decoupling per endpoint and therefore no special treatment possible per endpoint.
But this is another story.

## Don't use default exports
For unity, it is recommended importing things like
`import { x } from 'foo';` and not by default exports `import x from 'foo';`.
Codebase changes overtime, so could default exports.
Default exports are just another hurdle for changing code, because outside modules are coupled to it.
I recommend avoiding default exports at all.

## Redux-saga: Differentiate between `flow` and `effect`
It is recommended splitting your redux-saga logic into `flows` (aka handlers) and custom `effects`.
In this codebase all the "handler" sagas are categorized as a `flow`.
- `flow:` This is a saga, provided from the a saga factory in the same module.
Flows are hierarchically composed by factories. Usually the root factory is the service factory of an app.
Dependencies - or in other words instances of implementations - are passed down by these factories.
- `effect:` A custom effect is an independent saga, listening for commands and events, without dependencies.
A custom effect provides functionality, which otherwise must be double coded in other modules.

## Avoid circular import references
By avoiding circular import references, imports stay clear and comprehensible.
However, some bundlers have problems with circular import references. Below you find some helpful rules:
1. Imports must only reach to the very next `index.ts` file.
2. Importing a file from the same module should be done by a relative import (e.g. `import { LoaderCommandTypes } from "./types";`).
3. Importing a file from another module should be done with an absolute import (e.g. `import { Command } from "packages/entity/common-types";`).

## Separate import per layer
Imports always should reference to only one specific layer. This avoids problems with bundlers.
Problem: Imagine there was a `index.ts` in the root of the `packages/common/translation` module,
which is exporting domain, native and web stuff.
If we would import things from this `index.ts` file into our mobile app,
we had unwanted dependencies to web components and likely to additional web libraries.
Therefore it is important to import things from `.../domain`, `.../ui` or `.../infrastructure` folders directly.
These folders should contain an `index.ts` file to export the corresponding module's public api.

## Linting for a unified codebase
With linting rules all team members have the same understanding of the code style.
Linting helps to read code more quickly and therefore increases productivity.
Within this project linting is done by [eslint](https://eslint.org/).

See [environment docs](environment.md) for setting up eslint in WebStorm.

## Testing
The integrated test runner is [jest](http://jestjs.io).
Business logic (redux-saga) can be tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan).
React components can be tested with [react-test-renderer](https://reactjs.org/docs/test-renderer.html).

Tests should be organized as follow:
- The file suffix `.test.ts` is required
- A unit test is placed next to the tested file. As an example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- An integration test for encapsulated module behaviour (e.g. toaster), is placed inside the module folder. As an example `/src/packages/common/domain/toaster/saga/flow/show.message.handling.integration.test.ts`.

Unit tests should have the suffix `.unit.test.ts`. Integration tests should have the suffix `.integration.test.ts`.

## Appendix
Following information is not necessary to know but may be interesting for you.

### Thoughts about testing
I think, because snapshot tests are expected to fail with every UI change, they are completely useless for TDD.
In my opinion, tests are here to develop faster and especially to prevent unwanted bugs.
Similar thoughts [here](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

Read a [smart article](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850) about testing structure.
