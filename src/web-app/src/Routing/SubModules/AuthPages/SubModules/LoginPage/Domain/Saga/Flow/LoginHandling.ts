import { put, select } from "redux-saga/effects";
import { login, LoginResult } from "packages/common/authentication/domain";
import { dispatchToastsFromResult } from "packages/common/toaster/domain";
import { createHideLoader, createShowLoader } from "packages/common/loader/domain";
import { ResultTypes } from "packages/entity/common-types";
import { createOpenUrl } from "packages/common/router/domain";
import { createHomeRouteUrl } from "web-app/Routing/Domain";
import { createSetFormFieldMessages } from "packages/common/form/domain";
import { LoginPageState, LoginPageStateSelector } from "../../Types";

export function* handleLogin(loginPageStateSelector: LoginPageStateSelector): Generator {
    // @ts-ignore
    const loginPageState: LoginPageState = yield select(loginPageStateSelector);
    yield put(createShowLoader());
    // @ts-ignore
    const result: LoginResult = yield login({
        username: loginPageState.form.elementsByName.username.value,
        password: loginPageState.form.elementsByName.password.value,
        shouldRemember: loginPageState.form.elementsByName.rememberMe.value,
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
