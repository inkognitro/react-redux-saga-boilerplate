import {AuthEventTypes, AuthUser, LoginSettings} from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserWasLoggedIn(loginSettings: LoginSettings, authUser: AuthUser): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { loginSettings, authUser },
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, {
    loginSettings: LoginSettings
    authUser: AuthUser
}>;
