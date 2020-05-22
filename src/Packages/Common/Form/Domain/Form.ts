import { takeEvery, spawn } from "redux-saga/effects";
import { FormCommandTypes } from "Packages/Common/Form/Domain/Types";
import { handleSubmitForm } from "Packages/Common/Form/Domain/Saga/SubmitFormHandling";

export function createFormFlow(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryFormSubmit);
    };
}

function* takeEveryFormSubmit(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}
