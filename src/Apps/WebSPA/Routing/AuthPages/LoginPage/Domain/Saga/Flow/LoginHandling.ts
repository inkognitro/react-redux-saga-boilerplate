import { select } from "redux-saga/effects";
import { login, LoginResult } from "Packages/Common/Authentication";
import { dispatchToastsFromResult } from "Packages/Common/Toaster";
import { LoginPageState, LoginPageStateSelector } from "../../Types";
import { Login } from "../../Command/Login";

export function* handleLogin(loginPageStateSelector: LoginPageStateSelector, command: Login): Generator {
    // @ts-ignore
    const loginPageState: LoginPageState = yield select(loginPageStateSelector);
    // @ts-ignore
    const result: LoginResult = yield login({
        username: 'sonGoku',
        password: '1234',
        shouldRemember: false,
    });
    dispatchToastsFromResult(result);
    console.info(result);
    console.info(command, loginPageState.form.elementsByName);
    // todo: make bridge between auth package and single page app implementation
}
