import { Event } from "Packages/Entity/CommonTypes";
import { AuthEventTypes, LoginSettings } from "../Types";

export function createUserLoginWasCancelled(loginSettings: LoginSettings): UserLoginWasCancelled {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
        payload: { loginSettings },
    };
}

export type UserLoginWasCancelled = Event<AuthEventTypes.USER_LOGIN_WAS_CANCELLED, {
    loginSettings: LoginSettings;
}>;
