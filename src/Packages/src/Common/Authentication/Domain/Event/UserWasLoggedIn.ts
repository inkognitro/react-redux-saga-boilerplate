import { Event } from "Packages/Entity/CommonTypes";
import { LoginSettings, LoginSuccessResult } from "../Types";
import { AuthEventTypes } from "./Types";

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
