import { Event } from "Packages/Entity/CommonTypes";
import { LoginSettings } from "../Types";
import { AuthEventTypes } from "./Types";

export function createUserLoginWasNotExecuted(loginSettings: LoginSettings): UserLoginWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasNotExecuted = Event<AuthEventTypes.USER_LOGIN_WAS_NOT_EXECUTED, {
    loginSettings: LoginSettings;
}>;
