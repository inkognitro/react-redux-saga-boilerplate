import { Event } from "Packages/Entity/CommonTypes";
import { AuthenticatedAuthUser } from "Packages/Entity/AuthUser";
import { AuthEventTypes } from "../Types";

export function createUserAuthenticationWasRefreshed(
    authUser: AuthenticatedAuthUser,
    previousAuthUser: AuthenticatedAuthUser,
): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: { authUser, previousAuthUser },
    };
}

export type UserAuthenticationWasRefreshed = Event<AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED, {
    authUser: AuthenticatedAuthUser;
    previousAuthUser: AuthenticatedAuthUser;
}>;
