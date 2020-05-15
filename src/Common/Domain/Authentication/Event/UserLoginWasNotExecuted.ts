import { AuthEventTypes, LoginSettings } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

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
