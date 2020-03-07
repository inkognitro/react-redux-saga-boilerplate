import {Command, createCommand} from "Common/../../../../AppBase/Bus/CommandListenerMiddleware";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type BlockToastForMessageReceivingAction = {
    type: CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};

export function createBlockToastForMessageReceivingCommand(toastId: string): Command<BlockToastForMessageReceivingAction> {
    return createCommand({
        type: CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    });
}

export function handleBlockToastForMessageReceiving(toaster: Toaster, action: BlockToastForMessageReceivingAction): void {
    toaster.blockToastForMessageReceiving(action.payload.toastId);
}