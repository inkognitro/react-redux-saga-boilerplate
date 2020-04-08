import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bus/Domain/Event";

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