import { AuthEventTypes } from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createUserLogoutWasNotExecuted(logoutId: string): UserLogoutWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED,
        payload: { logoutId },
    };
}

export type UserLogoutWasNotExecuted = Event<AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED, {
    logoutId: string;
}>;
