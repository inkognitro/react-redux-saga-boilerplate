import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/UserManagement/Domain/UserRepository/Command/CommandHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";

export function createSendHttpGetRequestAction(user: User): CommandAction {
    const command: UpdateUser = {
        type: CommandTypes.UPDATE_USER,
        payload: {
            user: user
        }
    };
    return createCommandAction(command);
}

export type UpdateUser = Command<CommandTypes.UPDATE_USER, {
    user: User
}>;