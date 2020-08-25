import { put } from "redux-saga/effects";
import { createFormWasSubmitted } from "../../event";
import { SubmitForm } from "../../command";

export function* handleSubmitForm(command: SubmitForm): Generator {
    if (command.payload.form.isRequestRunning) {
        return;
    }
    yield put(createFormWasSubmitted(command.payload.form));
}
