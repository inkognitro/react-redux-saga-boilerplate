import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastWasRemoved = Event<ToasterEventTypes.REMOVE_TOAST, {
    toastId: string,
}>;