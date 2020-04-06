import {AuthEventTypes, AuthUser} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createUserWasLoggedIn(payload: Payload): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: payload
    };
}

export type UserWasLoggedIn = Event<AuthEventTypes.USER_WAS_LOGGED_IN, Payload>;

type Payload = {
    authUser: AuthUser,
};