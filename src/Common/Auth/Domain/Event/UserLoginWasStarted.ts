import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserLoginWasStarted(): UserLoginWasStarted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_STARTED,
        payload: null,
    };
}

export type UserLoginWasStarted = Event<AuthEventTypes.USER_LOGIN_WAS_STARTED>;