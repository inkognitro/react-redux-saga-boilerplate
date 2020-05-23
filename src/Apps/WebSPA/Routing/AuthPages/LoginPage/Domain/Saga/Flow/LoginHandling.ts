import { select } from "redux-saga/effects";
import { Login } from "../../Command/Login";

export function* handleLogin(command: Login): Generator {
    // @ts-ignore
    const loginPageState: LoginPageState = yield select(loginPageStateSelector);
    console.info(command, loginPageState.form.elementsByName);
    // todo: make bridge between auth package and single page app implementation
}
