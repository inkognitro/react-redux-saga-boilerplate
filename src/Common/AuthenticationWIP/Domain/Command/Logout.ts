import {CommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createLogout(): Logout {
    return {
        type: CommandTypes.LOGOUT,
        payload: undefined,
    };
}

export type Logout = Command<CommandTypes.LOGOUT>;