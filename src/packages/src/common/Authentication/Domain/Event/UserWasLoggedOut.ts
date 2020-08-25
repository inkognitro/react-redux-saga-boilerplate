import { Event } from "packages/entity/common-types";
import { AuthenticatedAuthUser } from "packages/entity/auth-user/domain";
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
