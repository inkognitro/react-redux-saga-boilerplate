import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Authentication/Domain/Command/CommandHandler";

export function createLogout(): Logout {
    return {
        type: CommandTypes.LOGOUT,
        payload: null,
    };
}

export type Logout = Command<CommandTypes.LOGOUT>;