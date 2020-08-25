import { Event } from "packages/entity/common-types";
import { LoginSettings } from "../Types";
import { AuthEventTypes } from "./Types";

export function createUserUserLoginWasRequested(loginSettings: LoginSettings): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload: { loginSettings },
    };
}

export type UserLoginWasRequested = Event<AuthEventTypes.USER_LOGIN_WAS_REQUESTED, {
    loginSettings: LoginSettings
}>;
