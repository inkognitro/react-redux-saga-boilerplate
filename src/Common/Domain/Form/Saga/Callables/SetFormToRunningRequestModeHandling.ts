import { put } from "redux-saga/effects";
import { FormState } from "Common/Domain/Form/Types";
import { createFormWasSetToRunningRequestMode } from "Common/Domain/Form/Event/FormWasSetToRunningRequestMode";
import { FormElementState, MultipleFormElementStateChanges } from "Common/Domain/FormElements/Types";
import { createChangeFormElementStates } from "Common/Domain/FormElements/Command/ChangeFormElementStates";

export function* setFormToRunningRequestMode(form: FormState): Generator {
    if (form.isRequestRunning) {
        return;
    }
    const multipleFormElementStateChanges: MultipleFormElementStateChanges = [];
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
