import {AuthCommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bus/Domain/Command";

export function createLogout(): Logout {
    return {
        type: AuthCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<AuthCommandTypes.LOGOUT>;