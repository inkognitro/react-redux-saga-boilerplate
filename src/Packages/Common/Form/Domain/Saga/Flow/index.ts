import { spawn, takeEvery } from "@redux-saga/core/effects";
import { FormCommandTypes } from "../../Types";
import { handleSubmitForm } from "./SubmitFormHandling";

export function createFormSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryFormSubmit);
    };
}

function* takeEveryFormSubmit(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}
