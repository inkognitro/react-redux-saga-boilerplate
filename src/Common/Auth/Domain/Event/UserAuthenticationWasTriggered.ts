import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserAuthenticationWasTriggered(): UserAuthenticationWasTriggered {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_TRIGGERED,
        payload: null,
    };
}

export type UserAuthenticationWasTriggered = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_TRIGGERED>;