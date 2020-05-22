import {AuthEventTypes, LoginSettings} from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/Types";

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
