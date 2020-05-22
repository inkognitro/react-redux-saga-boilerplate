import { put } from "redux-saga/effects";
import { SubmitForm } from "Packages/Common/Form/Domain/Command/SubmitForm";
import { createFormWasSubmitted } from "Packages/Common/Form/Domain/Event/FormWasSubmitted";

export function* handleSubmitForm(command: SubmitForm): Generator {
    if (command.payload.form.isRequestRunning) {
        return;
    }
    yield put(createFormWasSubmitted(command.payload.form));
}
