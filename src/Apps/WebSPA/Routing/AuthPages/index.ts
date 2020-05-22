import { spawn } from "redux-saga/effects";
import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Reducer";
import { LoginPageState } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { RouteComponent } from "Packages/Common/Router/UI/RouterWC";
import { createLoginPageSaga, LoginPageWC, loginRoute } from "Apps/WebSPA/Routing/AuthPages/LoginPage";

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

export const authRouteComponents: RouteComponent[] = [
    { route: loginRoute, component: LoginPageWC },
];
