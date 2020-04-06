import {AuthEventTypes, AuthUser} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserAuthenticationRefreshFailed(payload: Payload): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload: payload
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED, Payload>;

type Payload = {
    authUser: AuthUser,
};