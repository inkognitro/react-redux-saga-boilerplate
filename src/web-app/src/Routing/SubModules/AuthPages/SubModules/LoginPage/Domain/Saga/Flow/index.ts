import { spawn, takeEvery } from "@redux-saga/core/effects";
import { LoginPageStateSelector } from "../../Types";
import { handleLogin } from "./LoginHandling";
import { LoginPageCommandTypes } from "../../Command/Types";

export function createLoginPageSaga(loginPageStateSelector: LoginPageStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands, loginPageStateSelector);
    };
}

function* watchLoginCommands(loginPageStateSelector: LoginPageStateSelector): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin, loginPageStateSelector);
}
