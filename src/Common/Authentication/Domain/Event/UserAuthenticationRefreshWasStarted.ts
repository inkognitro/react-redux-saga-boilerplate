import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Authentication/Domain/Types";

export function createUserAuthenticationRefreshWasStarted(): UserAuthenticationRefreshWasStarted {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED,
        payload: null,
    };
}

export type UserAuthenticationRefreshWasStarted = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED>;