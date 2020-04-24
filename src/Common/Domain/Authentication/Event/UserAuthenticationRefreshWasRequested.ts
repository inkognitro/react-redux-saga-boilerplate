import { AuthEventTypes, AuthUser } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserAuthenticationRefreshWasRequested(
  authUser: AuthUser
): UserAuthenticationRefreshWasRequested {
  return {
    type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED,
    payload: { authUser },
  };
}

export type UserAuthenticationRefreshWasRequested = Event<
  AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED,
  {
    authUser: AuthUser;
  }
>;
