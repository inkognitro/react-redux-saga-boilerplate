import { Event } from "Packages/Entity/CommonTypes";
import { LoginErrorResult, LoginSettings } from "../Types";
import { AuthEventTypes } from "./Types";

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
