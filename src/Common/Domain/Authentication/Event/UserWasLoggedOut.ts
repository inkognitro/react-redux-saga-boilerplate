import {AuthEventTypes} from "Common/Domain/Authentication/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createUserWasLoggedOut(): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: undefined
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT>;