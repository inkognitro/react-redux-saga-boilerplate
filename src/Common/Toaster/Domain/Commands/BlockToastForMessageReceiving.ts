import {CommandActionTypes} from "Common/Toaster/Domain/ToasterMiddleware";
import {Dispatch} from "redux";
import {Command, createCommand} from "Common/BusMiddleware/CommandListenerMiddleware";

export type BlockToastForMessageReceivingAction = {
    type: CommandActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};

export function createBlockToastForMessageReceivingCommand(toastId: string): Command<BlockToastForMessageReceivingAction> {
    return createCommand({
        type: CommandActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    });
}

export function handleBlockToastForMessageReceivingAction(toastId: string, dispatch: Dispatch): void {
    dispatch(createBlockToastForMessageReceivingCommand(toastId));
}