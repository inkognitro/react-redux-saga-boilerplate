import { AuthEventTypes, AuthUser } from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createUserWasLoggedOut(authUser: AuthUser): UserWasLoggedOut {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: { authUser },
    };
}

export type UserWasLoggedOut = Event<AuthEventTypes.USER_WAS_LOGGED_OUT, {
    authUser: AuthUser
}>;
