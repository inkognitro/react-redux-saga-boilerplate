import { spawn, takeEvery } from "@redux-saga/core/effects";
import { LoginPageCommandTypes } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { handleLogin } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Saga/Flow/LoginHandling";

export function createLoginPageSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands);
    };
}

function* watchLoginCommands(): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin);
}
