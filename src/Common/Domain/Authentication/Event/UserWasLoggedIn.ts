import { AuthEventTypes, AuthUser } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserWasLoggedIn(authUser: AuthUser): UserWasLoggedIn {
    return {
        type: AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { authUser },
    };
}

export type UserWasLoggedIn = Event<
  AuthEventTypes.USER_WAS_LOGGED_IN,
  {
    authUser: AuthUser;
  }
>;
