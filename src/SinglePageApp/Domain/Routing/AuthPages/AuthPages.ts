import { spawn, takeEvery } from "redux-saga/effects";
import { LoginPageCommandTypes } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Types";
import { handleLogin } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Saga/LoginHandling";
import { createLoginPageSaga } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/LoginPage";
import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Reducer";

export function createAuthPagesSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLoginCommands);
        yield spawn(createLoginPageSaga());
    };
}

function* watchLoginCommands(): Generator {
    yield takeEvery(LoginPageCommandTypes.LOGIN, handleLogin);
}

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});
