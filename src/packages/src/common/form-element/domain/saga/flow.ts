import { put, spawn, takeEvery } from "@redux-saga/core/effects";
import {
    ChangeFormElementState,
    ChangeFormElementStates,
    FormElementCommandTypes,
} from "../command";
import {
    createFormElementStateWasChanged,
    createFormElementStateWereChanged,
} from "../event";

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
