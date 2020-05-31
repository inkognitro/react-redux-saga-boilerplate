import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, LoginSettings } from "../Types";

export function createUserUserLoginWasRequested(loginSettings: LoginSettings): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasRequested = Event<AuthEventTypes.USER_LOGIN_WAS_REQUESTED, {
    loginSettings: LoginSettings
}>;
