import {CommandTypes} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";

export function createBlockToastForMessageReceivingCommandAction(toastId: string): CommandAction {
    const command: BlockToastForMessageReceiving = {
        type: CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    };
    return createCommandAction(command);
}

export type BlockToastForMessageReceiving = Command<CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING, {
    toastId: string,
}>;