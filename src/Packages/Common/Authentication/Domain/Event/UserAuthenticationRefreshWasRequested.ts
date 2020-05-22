import { AuthEventTypes, AuthUser } from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createUserAuthenticationRefreshWasRequested(
    authUser: AuthUser,
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
