import {AuthEventTypes} from "Common/Authentication/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createUserAuthenticationRefreshFailed(): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload: null
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED>;