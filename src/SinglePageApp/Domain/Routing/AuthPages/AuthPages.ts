import { spawn } from "redux-saga/effects";
import { createLoginPageSaga } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/LoginPage";
import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "SinglePageApp/Domain/Routing/AuthPages/LoginPage/Reducer";

export function createAuthPagesSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createLoginPageSaga());
    };
}

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});
