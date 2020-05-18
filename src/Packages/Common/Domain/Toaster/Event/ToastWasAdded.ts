import { Toast, ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createToastWasAdded(toast: Toast): ToastWasAdded {
    return {
        type: ToasterEventTypes.TOAST_WAS_ADDED,
        payload: {
            toast,
        },
    };
}

export type ToastWasAdded = Event<ToasterEventTypes.TOAST_WAS_ADDED, {
    toast: Toast;
}>;
