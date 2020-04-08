import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bus/Domain/Event";
import {LoginSettings} from "Common/AuthenticationWIP/Domain/Command/Login";

export function createUserLoginWasCancelled(loginSettings: LoginSettings): UserLoginWasCancelled {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
        payload: {loginSettings},
    };
}

export type UserLoginWasCancelled = Event<AuthEventTypes.USER_LOGIN_WAS_CANCELLED, {
    loginSettings: LoginSettings
}>;