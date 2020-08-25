import { LoginPageState } from "../sub-modules/login-page/domain";

export type AuthPagesState = {
    loginPage: LoginPageState
}

export type AuthPagesStateSelector = (rootState: any) => AuthPagesState
