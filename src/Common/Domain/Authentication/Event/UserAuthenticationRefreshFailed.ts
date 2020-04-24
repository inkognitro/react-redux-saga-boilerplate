import { AuthEventTypes, AuthUser } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserAuthenticationRefreshFailed(
    payload: Payload,
): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload,
    };
}

export type UserAuthenticationRefreshFailed = Event<
  AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
  Payload
>;

type Payload = {
  authUser: AuthUser;
};
