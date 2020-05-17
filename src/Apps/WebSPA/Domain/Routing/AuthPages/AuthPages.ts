import { spawn } from "redux-saga/effects";
import { createLoginPageSaga } from "Apps/WebSPA/Domain/Routing/AuthPages/LoginPage/LoginPage";
import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "Apps/WebSPA/Domain/Routing/AuthPages/LoginPage/Reducer";

export function createAuthPagesSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createLoginPageSaga());
    };
}

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});
