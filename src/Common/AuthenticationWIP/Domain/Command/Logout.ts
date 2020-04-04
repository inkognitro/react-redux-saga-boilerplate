import {CommandTypes} from "Common/AuthenticationWIP/Domain/Command/CommandHandler";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createLogout(): Logout {
    return {
        type: CommandTypes.LOGOUT,
        payload: null,
    };
}

export type Logout = Command<CommandTypes.LOGOUT>;