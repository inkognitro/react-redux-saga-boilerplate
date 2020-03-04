import {ToasterActions, ToasterActionTypes} from "Common/Toaster/Domain/Types";

export function createBlockToastForMessageReceivingAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId,
        }
    };
}

export type BlockToastForMessageReceivingAction = {
    type: ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};