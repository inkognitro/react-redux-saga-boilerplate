import { takeEvery, spawn } from "redux-saga/effects";
import { FormCommandTypes } from "Common/Domain/FormUtils/Form/Types";
import { handleSubmitForm } from "Common/Domain/FormUtils/Form/Saga/Callables/SubmitFormHandling";

export function createFormFlow(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryFormSubmit);
    };
}

function* takeEveryFormSubmit(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}
