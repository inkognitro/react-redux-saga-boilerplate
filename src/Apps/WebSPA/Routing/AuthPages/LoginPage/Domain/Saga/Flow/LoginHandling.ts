import { select, put } from "redux-saga/effects";
import { login, LoginResult } from "Packages/Common/Authentication";
import { dispatchToastsFromResult } from "Packages/Common/Toaster";
import { createHideLoader, createShowLoader } from "Packages/Common/Loader";
import { LoginPageState, LoginPageStateSelector } from "../../Types";

export function* handleLogin(loginPageStateSelector: LoginPageStateSelector): Generator {
    // @ts-ignore
    const loginPageState: LoginPageState = yield select(loginPageStateSelector);
    yield put(createShowLoader());
    // @ts-ignore
    const result: LoginResult = yield login({
        username: loginPageState.form.elementsByName.username.value,
        password: loginPageState.form.elementsByName.password.value,
        shouldRemember: false,
    });
    yield put(createHideLoader());
    yield dispatchToastsFromResult(result);
}
