[« docs overview](../README.md)

# Coding Guidelines
FYI: This section requires knowledge of the [architecture](Architecture.md).

Below you can see some recommended coding guidelines.
With growing experience these guidelines could change. Nothing is carved in stone.

## Avoid circular import references
By avoiding circular import references the codebase stays clear and understandable.
However, some bundlers also have problems with circular import references. Below you find some helpful rules:
1. Imports must only reach to the next `index.ts` file.
2. Inside a module files need to be imported relatively (e.g. `import { LoaderCommandTypes } from "./Types";`).
3. Importing a file from another module should be done with an absolute import (e.g. `import { Command } from "Packages/Entity/CommonTypes";`).

## Linting for a unified codebase
With linting rules all team members have the same understanding of code style.
This helps to read code more quickly and therefore increases productivity.
Within this project linting is done by [eslint](https://eslint.org/).

Below you can see the eslint configuration for [WebStorm](https://www.jetbrains.com/webstorm).

Automatic detection of `.eslintrc.json` in the project folder:
![esLintAutomaticDetection](assets/esLintAutomaticDetection.png)

Replace `Strg + Alt + L` shortcut with eslint fix:
![esLintKeymapShortcut](assets/esLintKeymapShortcut.png)
