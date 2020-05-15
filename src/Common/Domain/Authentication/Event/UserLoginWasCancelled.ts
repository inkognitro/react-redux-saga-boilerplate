import {AuthEventTypes, LoginSettings} from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLoginWasCancelled(
    loginSettings: LoginSettings,
): UserLoginWasCancelled {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
        payload: { loginSettings },
    };
}

export type UserLoginWasCancelled = Event<AuthEventTypes.USER_LOGIN_WAS_CANCELLED, {
    loginSettings: LoginSettings;
}>;
