import {CommandTypes} from "Common/AuthenticationWIP/Domain/Command/CommandHandler";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: CommandTypes.INITIALIZE_CURRENT_USER,
        payload: null,
    };
}

export type InitializeCurrentUser = Command<CommandTypes.INITIALIZE_CURRENT_USER>;