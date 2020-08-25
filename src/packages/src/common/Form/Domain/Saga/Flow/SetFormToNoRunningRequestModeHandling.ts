import { put } from "redux-saga/effects";
import {
    FormElementState,
    FormElementStateChanges,
    createChangeFormElementStates,
} from "packages/common/FormElement/Domain";
import { FormState } from "../../Types";
import { createFormWasSetToNoRunningRequestMode } from "../../Event/FormWasSetToNoRunningRequestMode";

export function* setFormToNoRunningRequestMode(
    formBeforeRunningRequestMode: FormState,
    form: FormState,
): Generator {
    if (!form.isRequestRunning) {
        return;
    }
    const multipleFormElementStateChanges: FormElementStateChanges[] = [];
    for (const name in form.elementsByName) {
        const formElement: FormElementState = form.elementsByName[name];
        const formElementBeforeRunningRequestMode: FormElementState = formBeforeRunningRequestMode.elementsByName[name];
        if (!formElementBeforeRunningRequestMode.readOnly && formElement.readOnly) {
            multipleFormElementStateChanges.push({
                formElement,
                stateChanges: {
                    readOnly: false,
                },
            });
        }
    }
    yield put(createChangeFormElementStates(multipleFormElementStateChanges));
    yield put(createFormWasSetToNoRunningRequestMode(form.id));
}
