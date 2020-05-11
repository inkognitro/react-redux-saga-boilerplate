import { select } from "redux-saga/effects";
import { LoginPageStateSelector } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";
import { Login } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Command/Login";

export function* handleLogin(loginPageStateSelector: LoginPageStateSelector, command: Login): Generator {
    // @ts-ignore
    const loginPageState: LoginPageState = yield select(loginPageStateSelector);
    console.info(command, loginPageState.form.elementsByName);
    // todo: make bridge between auth package and single page app implementation
}
