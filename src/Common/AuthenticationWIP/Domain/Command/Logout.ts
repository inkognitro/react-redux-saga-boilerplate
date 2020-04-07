import {AuthCommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createLogout(): Logout {
    return {
        type: AuthCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<AuthCommandTypes.LOGOUT>;