import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, LoginSettings, LoginSuccessResult } from "../Types";

export function createUserWasLoggedIn(loginSettings: LoginSettings, result: LoginSuccessResult): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { loginSettings, result },
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, {
    loginSettings: LoginSettings
    result: LoginSuccessResult
}>
