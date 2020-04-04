import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserLoginWasStarted(): UserLoginWasStarted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_STARTED,
        payload: null,
    };
}

export type UserLoginWasStarted = Event<AuthEventTypes.USER_LOGIN_WAS_STARTED>;