import {AuthEventTypes, AuthUser} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserAuthenticationRefreshWasStarted(payload: Payload): UserAuthenticationRefreshWasStarted {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED,
        payload: payload,
    };
}

export type UserAuthenticationRefreshWasStarted = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED, Payload>;

type Payload = {
    authUser: AuthUser,
};