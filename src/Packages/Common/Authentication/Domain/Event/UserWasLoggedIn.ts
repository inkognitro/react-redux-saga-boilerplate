import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, LoginSettings} from "../Types";
import {LoginSuccessResult} from "Packages/Common/Authentication/Domain/Saga/CustomEffect/Login";

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
