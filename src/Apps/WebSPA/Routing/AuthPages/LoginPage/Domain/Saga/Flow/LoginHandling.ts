import { put, select } from "redux-saga/effects";
import { login, LoginResult } from "Packages/Common/Authentication";
import { dispatchToastsFromResult } from "Packages/Common/Toaster";
import { createHideLoader, createShowLoader } from "Packages/Common/Loader";
import { MessageTypes, ResultTypes } from "Packages/Common/CommonTypes";
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
    yield put(createSetFormFieldMessages(loginPageState.form, [ // todo: set messages from result
        {
            message: {
                id: 'foo123',
                type: MessageTypes.ERROR,
                content: {
                    translationId: 'foo1234444',
                    fallback: 'This is just an info message for the username field!',
                },
            },
            path: ['username'],
        },
    ]));
    if (result.type === ResultTypes.SUCCESS) {
        yield put(createOpenUrl({
            url: createHomeRouteUrl(),
            shouldReplaceCurrentUrl: true,
        }));
    }
}
