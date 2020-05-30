import { Event } from "Packages/Common/CommonTypes";
import { LoginErrorResult } from "Packages/Common/Authentication/Domain/Saga/CustomEffect/Login";
import { AuthEventTypes, LoginSettings } from "../Types";

export function createUserLoginFailed(loginSettings: LoginSettings, result: LoginErrorResult): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: { loginSettings, result },
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED, {
    loginSettings: LoginSettings
    result: LoginErrorResult
}>;
