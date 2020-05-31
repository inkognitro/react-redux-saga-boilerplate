import { Event } from "Packages/Common/CommonTypes";
import { AuthEventTypes, LoginSettings } from "../Types";

export function createUserLoginWasNotExecuted(loginSettings: LoginSettings): UserLoginWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasNotExecuted = Event<AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED, {
    loginSettings: LoginSettings;
}>;
