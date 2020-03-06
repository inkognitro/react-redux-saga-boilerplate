import {ToasterEventTypes} from "Common/Toaster/Domain/Types";

export function createToastMessageWasRemoved(toastId: string, toastMessageId: string): ToastMessageWasRemoved {
    return {
        type: ToasterEventTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            toastMessageId: toastMessageId
        }
    };
}

export type ToastMessageWasRemoved = {
    type: ToasterEventTypes.REMOVE_TOAST_MESSAGE,
    payload: {
        toastId: string,
        toastMessageId: string,
    }
};