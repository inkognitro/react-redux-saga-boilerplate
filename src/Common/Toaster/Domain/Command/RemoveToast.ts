import {CommandTypes} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createRemoveToastAction(toastId: string): CommandAction {
    const command: RemoveToast = {
        type: CommandTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    };
    return createCommandAction(command);
}

export type RemoveToast = Command<CommandTypes.REMOVE_TOAST, {
    toastId: string,
}>;