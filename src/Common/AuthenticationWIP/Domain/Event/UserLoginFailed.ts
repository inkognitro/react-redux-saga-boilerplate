import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserLoginFailed(): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: null
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED>;