import { spawn, takeEvery } from "@redux-saga/core/effects";
import { LoginPageStateSelector } from "../../types";
import { handleLogin } from "./login.handling";
import { LoginPageCommandTypes } from "../../command";

export function createLoginPageSaga(loginPageStateSelector: LoginPageStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands, loginPageStateSelector);
    };
}

function* watchLoginCommands(loginPageStateSelector: LoginPageStateSelector): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin, loginPageStateSelector);
}
