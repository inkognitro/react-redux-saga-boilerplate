import {Command} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/Auth/Domain/Command/CommandHandler";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: CommandTypes.INITIALIZE_CURRENT_USER,
        payload: null,
    };
}

export type InitializeCurrentUser = Command<CommandTypes.INITIALIZE_CURRENT_USER>;