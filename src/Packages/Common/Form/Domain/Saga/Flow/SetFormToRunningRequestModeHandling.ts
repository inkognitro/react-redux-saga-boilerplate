import { put } from "redux-saga/effects";
import { FormState } from "Packages/Common/Form/Domain/Types";
import { createFormWasSetToRunningRequestMode } from "Packages/Common/Form/Domain/Event/FormWasSetToRunningRequestMode";
import {
    FormElementState,
    FormElementStateChanges,
} from "Packages/Common/FormElement/Domain/Types";
import { createChangeFormElementStates } from "Packages/Common/FormElement/Domain/Command/ChangeFormElementStates";

export function* setFormToRunningRequestMode(form: FormState): Generator {
    if (form.isRequestRunning) {
        return;
    }
    const multipleFormElementStateChanges: FormElementStateChanges[] = [];
    for (const name in form.elementsByName) {
        const formElement: FormElementState = form.elementsByName[name];
        if (!formElement.readOnly) {
            multipleFormElementStateChanges.push({
                formElement,
                stateChanges: {
                    readOnly: true,
                },
            });
        }
    }
    yield put(createChangeFormElementStates(multipleFormElementStateChanges));
    yield put(createFormWasSetToRunningRequestMode(form.id));
}
