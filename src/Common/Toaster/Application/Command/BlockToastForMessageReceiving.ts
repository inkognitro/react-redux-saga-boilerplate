import {CommandActionTypes} from "Common/Toaster/Application/ToasterMiddleware";
import {Dispatch} from "redux";

export type BlockToastForMessageReceivingAction = {
    type: CommandActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};

export function createBlockToastForMessageReceivingAction(toastId: string): BlockToastForMessageReceivingAction {
    return {
        type: CommandActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    };
}

export function handleBlockToastForMessageReceivingAction(toastId: string, dispatch: Dispatch): void {
    dispatch(createBlockToastForMessageReceivingAction(toastId));
}