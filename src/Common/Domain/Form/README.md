# Form
This module provides a standardized way to create and use forms.

## Internal dependencies
Requires saga flow from `Common/Domain/FormElements/FormElements.ts`.

## Usage
Following code snipped could be used in a package.
```javascript
import { createFormState } from "Common/Domain/Form/FormStateFactory";
import {
    createTextFieldState,
    createPasswordFieldState,
} from "Common/Domain/FormElements/FormElementStateFactory";
import { createFormParameters } from "Common/Domain/Form/Query/FormParameters";

const formState = createFormState({
    id: 'loginForm1',
    elementPresetsByName: {
        username: createTextFieldState({
            value: 'some initial username value',
        }),
        password: createPasswordFieldState(),
    },
});

const parameters = createFormParameters(formState);
```