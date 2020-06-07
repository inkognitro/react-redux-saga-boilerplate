import { put, select } from "redux-saga/effects";
import { login, LoginResult } from "Packages/Common/Authentication";
import { dispatchToastsFromResult } from "Packages/Common/Toaster";
import { createHideLoader, createShowLoader } from "Packages/Common/Loader";
import { ResultTypes } from "Packages/Common/CommonTypes";
import { createOpenUrl } from "Packages/Common/Router";
import { createHomeRouteUrl } from "Apps/WebSPA/Routing";
import { createSetFormFieldMessages } from "Packages/Common/Form";
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
    yield put(createSetFormFieldMessages(loginPageState.form, result.fieldMessages));
    if (result.type === ResultTypes.SUCCESS) {
        yield put(createOpenUrl({
            url: createHomeRouteUrl(),
            shouldReplaceCurrentUrl: true,
        }));
    }
}
