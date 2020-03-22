import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes, AuthUser} from "Common/Authentication/Domain/Types";

export function createUserWasLoggedIn(authUser: AuthUser): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: {
            authUser: authUser
        }
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, {
    authUser: AuthUser,
}>;