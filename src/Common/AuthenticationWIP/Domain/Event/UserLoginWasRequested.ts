import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserLoginWasStarted(payload: Payload): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload: payload,
    };
}

export type UserLoginWasRequested = Event<AuthEventTypes.USER_LOGIN_WAS_REQUESTED, Payload>;

type Payload = {
    username: string,
    password: string,
};