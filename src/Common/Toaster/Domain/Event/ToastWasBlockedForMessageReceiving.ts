import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/AppBase/EventBus";

export function createToastWasBlockedForMessageReceiving(toastId: string): ToastWasBlockedForMessageReceiving {
    return {
        type: ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastWasBlockedForMessageReceiving = Event<ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING, {
    toastId: string,
}>;