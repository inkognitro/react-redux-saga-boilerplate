import { put, takeEvery } from "redux-saga/effects";
import { FormElementCommandTypes } from "Common/Domain/FormElement/Types";
import { ChangeFormElementState } from "Common/Domain/FormElement/Command/ChangeFormElementState";
import { createFormElementStateWasChanged } from "Common/Domain/FormElement/Event/FormElementStateWasChanged";

export function createFormElementsFlow(): () => Generator {
    return function* (): Generator {
        yield takeEvery(FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE, function* (command: ChangeFormElementState) {
            const event = createFormElementStateWasChanged(command.payload.formElementId, command.payload.stateChanges);
            yield put(event);
        });
    };
}
