import {CommandTypes} from "Common/Authentication/Domain/Command/CommandHandler";
import {Command} from "Common/Bootstrap/Command";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: CommandTypes.INITIALIZE_CURRENT_USER,
        payload: null,
    };
}

export type InitializeCurrentUser = Command<CommandTypes.INITIALIZE_CURRENT_USER>;