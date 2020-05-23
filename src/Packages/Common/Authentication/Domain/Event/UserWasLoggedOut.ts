import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, AuthUser } from "../Types";

export function createUserWasLoggedOut(authUser: AuthUser): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: { authUser },
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, {
    authUser: AuthUser
}>;
