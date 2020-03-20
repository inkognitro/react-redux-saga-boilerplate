import {CommandTypes} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";

export function createRemoveToastMessageAction(toastId: string, messageId: string): CommandAction {
    const command: RemoveToastMessage = {
        type: CommandTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            messageId: messageId,
        }
    };
    return createCommandAction(command);
}

export type RemoveToastMessage = Command<CommandTypes.REMOVE_TOAST_MESSAGE, {
    toastId: string,
    messageId: string,
}>;