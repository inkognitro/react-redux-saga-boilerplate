import {AuthEventTypes, AuthUser} from "Common/Authentication/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

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