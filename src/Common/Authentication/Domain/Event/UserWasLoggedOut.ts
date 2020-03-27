import {AuthEventTypes} from "Common/Authentication/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createUserWasLoggedOut(): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: null
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT>;