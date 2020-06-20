import { put } from "redux-saga/effects";
import {
    FormElementState,
    FormElementStateChanges,
    createChangeFormElementStates,
} from "Packages/Common/FormElement/Domain";
import { FormState } from "../../Types";
import { createFormWasSetToRunningRequestMode } from "../../Event/FormWasSetToRunningRequestMode";

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
