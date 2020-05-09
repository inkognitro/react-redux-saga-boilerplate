import { put } from "redux-saga/effects";
import { FormState } from "Common/Domain/FormUtils/Form/Types";
import { createFormWasSetToRunningRequestMode } from "Common/Domain/FormUtils/Form/Event/FormWasSetToRunningRequestMode";
import {
    FormElementState,
    FormElementStateChanges,
} from "Common/Domain/FormUtils/FormElements/Types";
import { createChangeFormElementStates } from "Common/Domain/FormUtils/FormElements/Command/ChangeFormElementStates";

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
