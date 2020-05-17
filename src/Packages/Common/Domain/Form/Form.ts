import { takeEvery, spawn } from "redux-saga/effects";
import { FormCommandTypes } from "Packages/Common/Domain/Form/Types";
import { handleSubmitForm } from "Packages/Common/Domain/Form/Saga/SubmitFormHandling";

export function createFormFlow(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryFormSubmit);
    };
}

function* takeEveryFormSubmit(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}
