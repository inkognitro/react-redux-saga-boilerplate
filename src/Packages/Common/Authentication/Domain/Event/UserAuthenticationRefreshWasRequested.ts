import { Event } from "Packages/Entity/CommonTypes";
import { AuthenticatedAuthUser } from "Packages/Entity/AuthUser";
import { AuthEventTypes } from "../Types";

export function createUserAuthenticationRefreshWasRequested(
    authUser: AuthenticatedAuthUser,
): UserAuthenticationRefreshWasRequested {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED,
        payload: { authUser },
    };
}

export type UserAuthenticationRefreshWasRequested = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED, {
    authUser: AuthenticatedAuthUser;
}>;
