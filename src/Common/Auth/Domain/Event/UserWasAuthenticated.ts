import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes, AuthUser} from "Common/Auth/Domain/Types";

export function createUserWasAuthenticated(authUser: AuthUser): UserWasAuthenticated {
    return {
        type: AuthEventTypes.USER_WAS_AUTHENTICATED,
        payload: {
            authUser: authUser
        }
    };
}

export type UserWasAuthenticated = Event<AuthEventTypes.USER_WAS_AUTHENTICATED, {
    authUser: AuthUser,
}>;