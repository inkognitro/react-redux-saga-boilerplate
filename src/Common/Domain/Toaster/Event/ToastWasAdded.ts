import {Toast, ToasterEventTypes} from "Common/Domain/Toaster/Types";
import {Event} from "Common/Domain/Bus/Event";

export function createToastWasAdded(toast: Toast): ToastWasAdded {
    return {
        type: ToasterEventTypes.TOAST_WAS_ADDED,
        payload: {
            toast: toast,
        }
    };
}

export type ToastWasAdded = Event<ToasterEventTypes.TOAST_WAS_ADDED, {
    toast: Toast,
}>;