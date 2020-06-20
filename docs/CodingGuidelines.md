[« docs overview](../README.md)

# Coding Guidelines
FYI: This section requires knowledge of the [architecture](Architecture.md).

Below you can see some recommended coding guidelines.
With growing experience these guidelines could change. Nothing is carved in stone.

## Avoid circular import references
By avoiding circular import references the codebase stays clear and understandable.
However, some bundlers also have problems with circular import references. Below you find some helpful rules:
1. Imports must only reach to the next `index.ts` file.
2. Importing a file from same module should be done by a relative import (e.g. `import { LoaderCommandTypes } from "./Types";`).
3. Importing a file from another module should be done with an absolute import (e.g. `import { Command } from "Packages/Entity/CommonTypes";`).

## Separate import per layer
A import should always reference to only one layer. This avoids problems with bundlers.
Problem: Imagine there was a `index.ts` in the root of the `Packages/Common/Translation` module,
which is exporting domain layer stuff, native and web components.
If we would import things from this `index.ts` file into our mobile app,
we had unwanted dependencies to web components and likely to additional web libraries.
Therefore it is important to import things from `.../Domain`, `.../Native` or `.../Web` folders,
where the corresponding `index.ts` files do export their public module api.

## Linting for a unified codebase
With linting rules all team members have the same understanding of code style.
This helps to read code more quickly and therefore increases productivity.
Within this project linting is done by [eslint](https://eslint.org/).

Below you can see the eslint configuration for [WebStorm](https://www.jetbrains.com/webstorm).

Automatic detection of `.eslintrc.json` in the project folder:
![esLintAutomaticDetection](assets/esLintAutomaticDetection.png)

Replace `Strg + Alt + L` shortcut with eslint fix:
![esLintKeymapShortcut](assets/esLintKeymapShortcut.png)

## Testing
The integrated test runner is [jest](http://jestjs.io).
Business logic (redux-saga) can be tested with [redux-saga-test-plan](https://www.npmjs.com/package/redux-saga-test-plan).
React components can be tested with [react-test-renderer](https://reactjs.org/docs/test-renderer.html).

Tests should be organized as follow:
- The file suffix `.test.ts` is required
- A unit test is placed next to the tested file. As an example the unit test for `foo/bar/baz.ts` is `/foo/bar/baz.unit.test.ts`.
- An integration test for encapsulated module behaviour (e.g. toaster), is placed inside the module folder. As an example `/src/Packages/Common/Domain/Toaster/Saga/Flow/ShowMessageHandling.integration.test.ts`.

Unit tests should have the suffix `.unit.test.ts`. Integration tests should have the suffix `.integration.test.ts`.

## Appendix
Following information is not necessary to know but may be interesting for you.

### Thoughts about testing
I think, because snapshot tests are expected to fail with every UI change, they are completely useless for TDD.
In my opinion, tests are here to develop faster and especially to prevent unwanted bugs.
Similar thoughts [here](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

Read a [smart article](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850) about testing structure.
