import { spawn, takeEvery } from "@redux-saga/core/effects";
import { LoginPageCommandTypes } from "../../Types";
import { handleLogin } from "./LoginHandling";

export function createLoginPageSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands);
    };
}

function* watchLoginCommands(): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin);
}
