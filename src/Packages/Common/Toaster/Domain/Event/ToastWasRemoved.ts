import { ToasterEventTypes } from "Packages/Common/Toaster/Domain/Types";
import {Event} from "Packages/Common/Types";

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
