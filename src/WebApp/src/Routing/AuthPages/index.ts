import { spawn } from "redux-saga/effects";
import { combineReducers, Reducer } from "redux";
import { RouteComponentSpecification } from "Packages/Common/Router/Web";
import {
    createLoginPageSaga,
    ConnectedLoginPageWC,
    loginRoute,
    loginPageReducer,
    LoginPageState,
    LoginPageStateSelector,
} from "./LoginPage";

export { loginRoute } from './LoginPage';

export function createAuthPagesSaga(authPagesStateSelector: AuthPagesStateSelector): () => Generator {
    const loginPageStateSelector: LoginPageStateSelector = (rootState: any) => authPagesStateSelector(rootState).loginPage;
    return function* (): Generator {
        yield spawn(createLoginPageSaga(loginPageStateSelector));
    };
}

export const authPagesReducer: Reducer = combineReducers({
    loginPage: loginPageReducer,
});

export type AuthPagesState = {
    loginPage: LoginPageState
}

export type AuthPagesStateSelector = (rootState: any) => AuthPagesState

export const authRouteComponents: RouteComponentSpecification[] = [
    { route: loginRoute, component: ConnectedLoginPageWC },
];
