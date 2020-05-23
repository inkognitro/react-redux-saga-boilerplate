import { spawn } from "redux-saga/effects";
import { combineReducers, Reducer } from "redux";
import { RouteWC } from "Packages/Common/Router";
import {
    createLoginPageSaga,
    LoginPageWC,
    loginRoute,
    loginPageReducer,
    LoginPageState,
} from "./LoginPage";

export function createAuthPagesSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(createLoginPageSaga());
    };
}

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});

export type AuthPagesState = {
    loginPage: LoginPageState
}

export const authRouteComponents: RouteWC[] = [
    { route: loginRoute, component: LoginPageWC },
];
