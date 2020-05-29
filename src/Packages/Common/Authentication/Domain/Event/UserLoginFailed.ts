import { ErrorResult, Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, LoginSettings } from "../Types";

export function createUserLoginFailed(loginSettings: LoginSettings, result: ErrorResult): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: { loginSettings, result },
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED, {
    loginSettings: LoginSettings
    result: ErrorResult
}>;
