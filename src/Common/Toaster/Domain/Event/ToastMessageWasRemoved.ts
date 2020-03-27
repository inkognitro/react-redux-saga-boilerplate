import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createToastMessageWasRemoved(toastId: string, toastMessageId: string): ToastMessageWasRemoved {
    return {
        type: ToasterEventTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            toastMessageId: toastMessageId
        }
    };
}

export type ToastMessageWasRemoved = Event<ToasterEventTypes.REMOVE_TOAST_MESSAGE, {
    toastId: string,
    toastMessageId: string,
}>;