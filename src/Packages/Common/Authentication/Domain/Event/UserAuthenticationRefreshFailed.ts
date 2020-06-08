import { Event } from "Packages/Entity/CommonTypes";
import { AuthEventTypes } from "../Types";
import {AuthenticatedAuthUser} from "Packages/Entity/AuthUser";

export function createUserAuthenticationRefreshFailed(payload: Payload): UserAuthenticationRefreshFailed {
    return {
        type: AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload,
    };
}

export type UserAuthenticationRefreshFailed = Event<AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED, Payload>;

type Payload = { authUser: AuthenticatedAuthUser };
