import {AuthEventTypes} from "Common/Authentication/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserAuthenticationRefreshWasStarted(): UserAuthenticationRefreshWasStarted {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED,
        payload: null,
    };
}

export type UserAuthenticationRefreshWasStarted = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_STARTED>;