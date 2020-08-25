import { LoginPageState } from "../SubModules/LoginPage/Domain";

export type AuthPagesState = {
    loginPage: LoginPageState
}

export type AuthPagesStateSelector = (rootState: any) => AuthPagesState
