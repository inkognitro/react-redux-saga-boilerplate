import {AuthEventTypes, AuthUser, LoginSettings} from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

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
