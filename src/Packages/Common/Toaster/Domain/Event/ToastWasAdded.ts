import { Event } from "Packages/Common/CommonTypes";
import { Toast, ToasterEventTypes } from "../Types";

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
