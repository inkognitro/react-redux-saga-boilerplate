import { Event, SuccessResult } from "Packages/Common/CommonTypes";
import { AuthEventTypes, AuthUser, LoginSettings } from "../Types";

type UserWasLoggedInResult = SuccessResult<{ authUser: AuthUser }>;

export function createUserWasLoggedIn(loginSettings: LoginSettings, result: UserWasLoggedInResult): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { loginSettings, result },
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, {
    loginSettings: LoginSettings
    result: SuccessResult<{ authUser: AuthUser }>
}>
