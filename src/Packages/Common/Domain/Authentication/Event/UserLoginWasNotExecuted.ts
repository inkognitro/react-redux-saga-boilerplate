import { AuthEventTypes, LoginSettings } from "Packages/Common/Domain/Authentication/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createUserLoginWasNotExecuted(
    loginSettings: LoginSettings,
): UserLoginWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasNotExecuted = Event<AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED, {
    loginSettings: LoginSettings;
}>;
