import {
    select, spawn, takeLeading, takeEvery, put,
} from "@redux-saga/core/effects";
import { login, LoginResult } from "packages/common/authentication/domain";
import { finishFormSubmission, startFormSubmission } from "packages/common/form/domain";
import { hideLoader, showLoader } from "packages/common/loader/domain";
import { dispatchToastsFromResult } from "packages/common/toaster/domain";
import { createLoginPageWasInitialized } from "../event";
import { Login, LoginPageCommandTypes } from "../command";
import { LoginPageState, LoginPageStateSelector } from "../types";

function* handleLoginCommand(loginPageStateSelector: LoginPageStateSelector, _: Login): Generator {
    // @ts-ignore
    const state: LoginPageState = yield select<LoginPageState>(loginPageStateSelector);
    yield showLoader();
    yield startFormSubmission({ form: state.form });
    // @ts-ignore
    const result: LoginResult = yield login({
        username: state.form.content.username.value,
        password: state.form.content.password.value,
        shouldRemember: state.form.content.shouldRemember.value,
    });
    yield finishFormSubmission({
        form: state.form,
        fieldMessages: (result === null ? [] : result.fieldMessages),
    });
    if (result !== null) {
        yield dispatchToastsFromResult(result);
    }
    yield hideLoader();
}

function* watchInitializeCommands(): Generator {
    yield takeEvery(LoginPageCommandTypes.INITIALIZE, function* () {
        yield put(createLoginPageWasInitialized());
    });
}

function* watchLoginCommands(loginPageStateSelector: LoginPageStateSelector): Generator {
    yield takeLeading(LoginPageCommandTypes.LOGIN, handleLoginCommand, loginPageStateSelector);
}

export function createLoginPageSaga(
    loginPageStateSelector: LoginPageStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(watchInitializeCommands);
        yield spawn(watchLoginCommands, loginPageStateSelector);
    };
}
