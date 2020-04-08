import {Toast, ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bus/Domain/Event";

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