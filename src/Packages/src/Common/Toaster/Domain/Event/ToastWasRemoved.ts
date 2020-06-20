import { Event } from "Packages/Entity/CommonTypes";
import { ToasterEventTypes } from "./Types";

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.TOAST_WAS_REMOVED,
        payload: {
            toastId,
        },
    };
}

export type ToastWasRemoved = Event<ToasterEventTypes.TOAST_WAS_REMOVED, {
    toastId: string;
}>;
