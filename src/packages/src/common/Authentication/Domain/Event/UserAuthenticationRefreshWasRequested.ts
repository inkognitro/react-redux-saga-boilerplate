import { Event } from "packages/entity/common-types";
import { AuthenticatedAuthUser } from "packages/entity/auth-user/domain";
import { AuthEventTypes } from "./Types";

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
