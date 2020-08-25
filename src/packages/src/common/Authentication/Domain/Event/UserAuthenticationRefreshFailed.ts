import { Event } from "packages/entity/common-types";
import { AuthenticatedAuthUser } from "packages/entity/auth-user/domain";
import { AuthEventTypes } from "./Types";

export function createUserAuthenticationRefreshFailed(payload: Payload): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload,
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED, Payload>;

type Payload = { authUser: AuthenticatedAuthUser };
