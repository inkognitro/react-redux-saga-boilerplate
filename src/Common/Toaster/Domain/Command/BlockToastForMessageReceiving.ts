import {CommandAction, createCommandAction} from "Common/AppBase/CommandActionListener";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";

export function createBlockToastForMessageReceivingCommandAction(toastId: string): CommandAction {
    const command: BlockToastForMessageReceiving = {
        typeId: CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    };
    return createCommandAction(command);
}

export type BlockToastForMessageReceiving = {
    typeId: CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};