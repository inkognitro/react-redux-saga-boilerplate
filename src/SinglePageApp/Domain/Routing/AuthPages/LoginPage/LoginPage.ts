import { spawn, takeEvery } from "redux-saga/effects";
import { LoginPageCommandTypes, LoginPageStateSelector } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";
import { handleLogin } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Saga/LoginHandling";

export function createLoginPageSaga(loginPageStateSelector: LoginPageStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands, loginPageStateSelector);
    };
}

function* watchLoginCommands(loginPageStateSelector: LoginPageStateSelector): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin, loginPageStateSelector);
}
