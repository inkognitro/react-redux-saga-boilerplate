import { put } from "redux-saga/effects";
import { SubmitForm } from "Common/Domain/FormUtils/Form/Command/SubmitForm";
import { createFormWasSubmitted } from "Common/Domain/FormUtils/Form/Event/FormWasSubmitted";

export function* handleSubmitForm(command: SubmitForm): Generator {
    if (command.payload.form.isRequestRunning) {
        return;
    }
    yield put(createFormWasSubmitted(command.payload.form));
}
