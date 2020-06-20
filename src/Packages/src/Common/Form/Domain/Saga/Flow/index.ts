import { spawn, takeEvery } from "@redux-saga/core/effects";
import { handleSubmitForm } from "./SubmitFormHandling";
import { handleSetFormFieldMessages } from "./SetFormFieldMessagesHandling";
import { FormCommandTypes } from "../../Command/Types";

export function createFormSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchFormSubmitCommands);
        yield spawn(watchSetFieldMessagesCommands);
    };
}

function* watchFormSubmitCommands(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}

function* watchSetFieldMessagesCommands(): Generator {
    yield takeEvery(FormCommandTypes.SET_FORM_FIELD_MESSAGES, handleSetFormFieldMessages);
}
