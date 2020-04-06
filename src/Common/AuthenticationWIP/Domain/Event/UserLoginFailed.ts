import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserLoginFailed(payload: Payload): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: payload
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED, Payload>;

type Payload = {
    username: string,
    password: string,
};