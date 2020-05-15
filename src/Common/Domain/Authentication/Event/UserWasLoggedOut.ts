import { AuthEventTypes, AuthUser } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserWasLoggedOut(authUser: AuthUser): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: { authUser },
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, {
    authUser: AuthUser
}>;
