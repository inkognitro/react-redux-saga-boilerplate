# Form module
This module provides a standardized way to create and use forms.

## Internal dependencies
To use the form module, the saga flow for `Common/Domain/FormElements/FormElements.ts` must be installed.

## Usage
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