import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserAuthenticationFailed(): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload: null
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED>;