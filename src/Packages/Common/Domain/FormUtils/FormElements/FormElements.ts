import { put, takeEvery, spawn } from "redux-saga/effects";
import { FormElementCommandTypes } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { ChangeFormElementState } from "Packages/Common/Domain/FormUtils/FormElements/Command/ChangeFormElementState";
import { createFormElementStateWasChanged } from "Packages/Common/Domain/FormUtils/FormElements/Event/FormElementStateWasChanged";
import { createFormElementStateWereChanged } from "Packages/Common/Domain/FormUtils/FormElements/Event/FormElementStatesWereChanged";
import { ChangeFormElementStates } from "Packages/Common/Domain/FormUtils/FormElements/Command/ChangeFormElementStates";

export function createFormElementsFlow(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryChangeFormElementState);
        yield spawn(takeEveryChangeFormElementStates);
    };
}

function* takeEveryChangeFormElementState(): Generator {
    yield takeEvery(FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATE, function* (command: ChangeFormElementState) {
        const event = createFormElementStateWasChanged(command.payload.formElement, command.payload.stateChanges);
        yield put(event);
    });
}

function* takeEveryChangeFormElementStates(): Generator {
    yield takeEvery(FormElementCommandTypes.CHANGE_FORM_ELEMENT_STATES, function* (command: ChangeFormElementStates) {
        if (command.payload.multipleStateChanges.length === 0) {
            return;
        }
        const event = createFormElementStateWereChanged(command.payload.multipleStateChanges);
        yield put(event);
    });
}
