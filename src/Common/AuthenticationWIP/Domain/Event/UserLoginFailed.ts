import {AuthEventTypes} from "Common/AuthenticationWIP/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";
import {LoginSettings} from "Common/AuthenticationWIP/Domain/Command/Login";

export function createUserLoginFailed(loginSettings: LoginSettings): UserLoginFailed {
    return {
        type: AuthEventTypes.USER_LOGIN_FAILED,
        payload: {loginSettings}
    };
}

export type UserLoginFailed = Event<AuthEventTypes.USER_LOGIN_FAILED, {
    loginSettings: LoginSettings
}>;