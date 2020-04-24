import { AuthEventTypes, AuthUser } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

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
