import { Toast, ToasterEventTypes } from "Packages/Common/Toaster/Domain/Types";
import {Event} from "Packages/Common/Types";

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
