import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes, AuthUser} from "Common/Auth/Domain/Types";

export function createUserAuthenticationWasRefreshed(authUser: AuthUser): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: {
            authUser: authUser
        }
    };
}

export type UserAuthenticationWasRefreshed = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED, {
    authUser: AuthUser,
}>;