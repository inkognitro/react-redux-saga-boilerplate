import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";
import {CommandTypes} from "Common/EntityCache/Domain/User/Command/CommandHandler";
import {User} from "Common/EntityCache/Domain/User/Types";

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