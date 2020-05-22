import { spawn } from "redux-saga/effects";
import { createLoginPageSaga } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/LoginPage";
import { combineReducers, Reducer } from "redux";
import { loginPageReducer } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Reducer";
import { LoginPageState } from "Apps/WebSPA/Routing/AuthPages/LoginPage/Domain/Types";
import { RouteComponent } from "Packages/Common/Router/WebUI/Router";
import { loginRoute } from "Apps/WebSPA/Routing/HomePage/Domain";
import { LoginPage } from "Apps/WebSPA/Routing/AuthPages/LoginPage/UI/LoginPage";

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
    { route: loginRoute, component: LoginPage },
];
