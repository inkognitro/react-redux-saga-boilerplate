import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, AuthUser } from "../Types";

export function createUserAuthenticationRefreshFailed(payload: Payload): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload,
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED, Payload>;

type Payload = { authUser: AuthUser };
