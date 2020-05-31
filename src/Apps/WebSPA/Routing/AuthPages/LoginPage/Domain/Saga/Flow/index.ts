import { spawn, takeEvery } from "@redux-saga/core/effects";
import { LoginPageCommandTypes, LoginPageStateSelector } from "../../Types";
import { handleLogin } from "./LoginHandling";

export function createLoginPageSaga(loginPageStateSelector: LoginPageStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands, loginPageStateSelector);
    };
}

function* watchLoginCommands(loginPageStateSelector: LoginPageStateSelector): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin, loginPageStateSelector);
}
