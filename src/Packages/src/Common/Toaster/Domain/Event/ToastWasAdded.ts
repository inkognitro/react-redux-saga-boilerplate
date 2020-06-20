import { Event } from "Packages/Entity/CommonTypes";
import { Toast } from "../Types";
import { ToasterEventTypes } from "./Types";

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