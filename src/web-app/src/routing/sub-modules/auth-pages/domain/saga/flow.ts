import { spawn } from "redux-saga/effects";
import { AuthPagesStateSelector } from "../types";
import {
    createLoginPageSaga,
    LoginPageStateSelector,
} from "../../sub-modules/login-page/domain";

export function createAuthPagesSaga(authPagesStateSelector: AuthPagesStateSelector): () => Generator {
    const loginPageStateSelector: LoginPageStateSelector = (rootState: any) => authPagesStateSelector(rootState).loginPage;
    return function* (): Generator {
        yield spawn(createLoginPageSaga(loginPageStateSelector));
    };
}
