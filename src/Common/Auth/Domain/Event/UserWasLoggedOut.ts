import {Event} from "Common/AppBase/EventBus";
import {AuthEventTypes} from "Common/Auth/Domain/Types";

export function createUserWasLoggedOut(): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: null
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT>;