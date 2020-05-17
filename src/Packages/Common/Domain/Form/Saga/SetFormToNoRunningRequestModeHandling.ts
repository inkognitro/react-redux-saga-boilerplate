import { put } from "redux-saga/effects";
import { FormState } from "Packages/Common/Domain/Form/Types";
import {
    FormElementState,
    FormElementStateChanges,
} from "Packages/Common/Domain/FormElement/Types";
import { createChangeFormElementStates } from "Packages/Common/Domain/FormElement/Command/ChangeFormElementStates";
import { createFormWasSetToNoRunningRequestMode } from "Packages/Common/Domain/Form/Event/FormWasSetToNoRunningRequestMode";

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
