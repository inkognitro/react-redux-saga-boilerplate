import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserAuthenticationFailed(): UserAuthenticationFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_FAILED,
        payload: null
    };
}

export type UserAuthenticationFailed = Event<AuthEventTypes.USER_AUTHENTICATION_FAILED>;