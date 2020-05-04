import { put } from "redux-saga/effects";
import { FormState } from "Common/Domain/Form/Types";
import { FormElementState, MultipleFormElementStateChanges } from "Common/Domain/FormElements/Types";
import { createChangeFormElementStates } from "Common/Domain/FormElements/Command/ChangeFormElementStates";
import { createFormWasSetToNoRunningRequestMode } from "Common/Domain/Form/Event/FormWasSetToNoRunningRequestMode";

export function* handleSetFormToNoRunningRequestMode(
    formBeforeRunningRequestMode: FormState,
    form: FormState,
): Generator {
    if (!form.isRequestRunning) {
        return;
    }
    const multipleFormElementStateChanges: MultipleFormElementStateChanges = [];
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
