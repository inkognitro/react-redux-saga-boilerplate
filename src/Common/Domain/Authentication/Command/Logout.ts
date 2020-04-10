import {AuthCommandTypes} from "Common/Domain/Authentication/Authentication";
import {Command} from "Common/Domain/Bus/Command";

export function createLogout(): Logout {
    return {
        type: AuthCommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<AuthCommandTypes.LOGOUT>;