import { AuthEventTypes, AuthUser } from "Packages/Common/Domain/Authentication/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createUserAuthenticationWasRefreshed(
    authUser: AuthUser,
    previousAuthUser: AuthUser,
): UserAuthenticationWasRefreshed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: { authUser, previousAuthUser },
    };
}

export type UserAuthenticationWasRefreshed = Event<
  AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
  {
    authUser: AuthUser;
    previousAuthUser: AuthUser;
  }
>;
