import { put } from "redux-saga/effects";
import { FormState } from "Packages/Common/Domain/Form/Types";
import { createFormWasSetToRunningRequestMode } from "Packages/Common/Domain/Form/Event/FormWasSetToRunningRequestMode";
import {
    FormElementState,
    FormElementStateChanges,
} from "Packages/Common/Domain/FormElement/Types";
import { createChangeFormElementStates } from "Packages/Common/Domain/FormElement/Command/ChangeFormElementStates";

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
