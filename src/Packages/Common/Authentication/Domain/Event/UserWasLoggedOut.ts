import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, AuthUser } from "../Types";

type UserWasLoggedOutPayload = {
    authUser: AuthUser
    logoutId: string
}

export function createUserWasLoggedOut(payload: UserWasLoggedOutPayload): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload,
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, UserWasLoggedOutPayload>;
