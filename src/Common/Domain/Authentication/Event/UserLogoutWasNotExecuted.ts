import { AuthEventTypes } from "Common/Domain/Authentication/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createUserLogoutWasNotExecuted(logoutId: string): UserLogoutWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED,
        payload: { logoutId },
    };
}

export type UserLogoutWasNotExecuted = Event<AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED, {
    logoutId: string;
}>;
