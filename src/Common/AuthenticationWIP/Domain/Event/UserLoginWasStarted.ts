import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserLoginWasStarted(payload: Payload): UserLoginWasStarted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_STARTED,
        payload: payload,
    };
}

export type UserLoginWasStarted = Event<AuthEventTypes.USER_LOGIN_WAS_STARTED, Payload>;

type Payload = {
    username: string,
    password: string,
};