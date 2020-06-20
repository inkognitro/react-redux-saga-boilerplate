import { Event } from "Packages/Entity/CommonTypes";
import { AuthenticatedAuthUser } from "Packages/Entity/AuthUser/Domain";
import { AuthEventTypes } from "./Types";

type UserWasLoggedOutPayload = {
    authUser: AuthenticatedAuthUser
    logoutId: string
}

export function createUserWasLoggedOut(payload: UserWasLoggedOutPayload): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload,
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, UserWasLoggedOutPayload>;
