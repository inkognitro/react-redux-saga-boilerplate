import { AuthEventTypes, LoginSettings } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLoginProcessWasNotExecuted(
    loginSettings: LoginSettings,
): UserLoginProcessWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGIN_PROCESS_WAS_NOT_EXECUTED,
        payload: { loginSettings },
    };
}

export type UserLoginProcessWasNotExecuted = Event<AuthEventTypes.USER_LOGIN_PROCESS_WAS_NOT_EXECUTED, {
    loginSettings: LoginSettings;
}>;
