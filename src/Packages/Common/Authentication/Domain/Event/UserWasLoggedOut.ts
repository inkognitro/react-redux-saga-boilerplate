import { Event } from "Packages/Entity/CommonTypes";
import { AuthEventTypes } from "../Types";
import {AuthenticatedAuthUser} from "Packages/Entity/AuthUser";

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
