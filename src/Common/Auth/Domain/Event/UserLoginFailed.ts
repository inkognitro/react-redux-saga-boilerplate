import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserLoginFailed(): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: null
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED>;