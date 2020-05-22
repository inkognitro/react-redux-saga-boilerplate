import {spawn, takeEvery} from "@redux-saga/core/effects";
import {FormCommandTypes} from "Packages/Common/Form";
import {handleSubmitForm} from "Packages/Common/Form/Domain/Saga/Flow/SubmitFormHandling";

export function createFormFlow(): () => Generator {
    return function* (): Generator {
        yield spawn(takeEveryFormSubmit);
    };
}

function* takeEveryFormSubmit(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}