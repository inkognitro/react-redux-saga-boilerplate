import {CommandAction, createCommandAction} from "Common/AppBase/CommandActionListener";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";

export function createRemoveToastMessageCommandAction(toastId: string, messageId: string): CommandAction {
    const command: RemoveToastMessage = {
        typeId: CommandTypeIds.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            messageId: messageId,
        }
    };
    return createCommandAction(command);
}

export type RemoveToastMessage = {
    typeId: CommandTypeIds.REMOVE_TOAST_MESSAGE,
    payload: {
        toastId: string,
        messageId: string,
    }
};