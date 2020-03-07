import {ToasterEventTypes} from "Common/Toaster/Domain/Types";

export function createToastWasBlockedForMessageReceiving(toastId: string): ToastWasBlockedForMessageReceiving {
    return {
        type: ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastWasBlockedForMessageReceiving = {
    type: ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING,
    payload: {
        toastId: string,
    }
};