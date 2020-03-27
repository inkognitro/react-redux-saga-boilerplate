import {AuthEventTypes} from "Common/Authentication/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createUserLoginWasStarted(): UserLoginWasStarted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_STARTED,
        payload: null,
    };
}

export type UserLoginWasStarted = Event<AuthEventTypes.USER_LOGIN_WAS_STARTED>;