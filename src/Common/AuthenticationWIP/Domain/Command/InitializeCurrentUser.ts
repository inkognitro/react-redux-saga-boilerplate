import {CommandTypes} from "Common/AuthenticationWIP/Domain/Authentication";
import {Command} from "Common/Bootstrap/Domain/Command";

export function createInitializeCurrentUser(): InitializeCurrentUser {
    return {
        type: CommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}

export type InitializeCurrentUser = Command<CommandTypes.INITIALIZE_CURRENT_USER>;