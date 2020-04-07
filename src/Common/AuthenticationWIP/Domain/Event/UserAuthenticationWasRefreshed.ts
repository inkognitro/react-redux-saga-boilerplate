import {AuthEventTypes, AuthUser} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserAuthenticationWasRefreshed(authUser: AuthUser, previousAuthUser: AuthUser): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: {authUser, previousAuthUser}
    };
}

export type UserAuthenticationWasRefreshed = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED, {
    authUser: AuthUser,
    previousAuthUser: AuthUser,
}>;