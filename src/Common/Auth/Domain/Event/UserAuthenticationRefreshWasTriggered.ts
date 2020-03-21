import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserAuthenticationRefreshWasTriggered(): UserAuthenticationRefreshWasTriggered {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_TRIGGERED,
        payload: null,
    };
}

export type UserAuthenticationRefreshWasTriggered = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_TRIGGERED>;