import { spawn, takeEvery } from "redux-saga/effects";
import { LoginPageCommandTypes } from "SinglePageWebApp/Domain/Routing/AuthPages/LoginPage/Types";
import { handleLogin } from "SinglePageWebApp/Domain/Routing/AuthPages/LoginPage/Saga/LoginHandling";

export function createLoginPageSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands);
    };
}

function* watchLoginCommands(): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin);
}
