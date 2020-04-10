import {ToasterEventTypes} from "Common/Domain/Toaster/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.TOAST_WAS_REMOVED,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastWasRemoved = Event<ToasterEventTypes.TOAST_WAS_REMOVED, {
    toastId: string,
}>;