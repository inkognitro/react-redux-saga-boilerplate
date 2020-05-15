import { AuthEventTypes } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLogoutProcessWasNotExecuted(logoutId: string): UserLogoutProcessWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGOUT_PROCESS_WAS_NOT_EXECUTED,
        payload: { logoutId },
    };
}

export type UserLogoutProcessWasNotExecuted = Event<AuthEventTypes.USER_LOGOUT_PROCESS_WAS_NOT_EXECUTED, {
    logoutId: string;
}>;
