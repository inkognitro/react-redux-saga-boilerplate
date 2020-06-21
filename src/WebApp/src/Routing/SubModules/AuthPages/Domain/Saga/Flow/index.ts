import { spawn } from "redux-saga/effects";
import { AuthPagesStateSelector } from "../../Types";
import {
    createLoginPageSaga,
    LoginPageStateSelector,
} from "../../../SubModules/LoginPage/Domain";

export function createAuthPagesSaga(authPagesStateSelector: AuthPagesStateSelector): () => Generator {
    const loginPageStateSelector: LoginPageStateSelector = (rootState: any) => authPagesStateSelector(rootState).loginPage;
    return function* (): Generator {
        yield spawn(createLoginPageSaga(loginPageStateSelector));
    };
}
