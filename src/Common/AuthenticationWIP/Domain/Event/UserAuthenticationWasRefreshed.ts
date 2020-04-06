import {AuthEventTypes, AuthUser} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserAuthenticationWasRefreshed(payload: Payload): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: payload
    };
}

export type UserAuthenticationWasRefreshed = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED, Payload>;

type Payload = {
    previousAuthUser: AuthUser,
    authUser: AuthUser,
};