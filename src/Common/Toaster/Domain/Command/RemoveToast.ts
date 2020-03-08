import {CommandAction, createCommandAction} from "Common/AppBase/CommandActionListener";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";

export function createRemoveToastCommandAction(toastId: string): CommandAction {
    const command: RemoveToast = {
        typeId: CommandTypeIds.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    };
    return createCommandAction(command);
}

export type RemoveToast = {
    typeId: CommandTypeIds.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};