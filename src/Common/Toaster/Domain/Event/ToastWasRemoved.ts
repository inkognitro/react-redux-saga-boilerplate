import {ToasterEventTypes} from "Common/Toaster/Domain/Types";

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastWasRemoved = {
    type: ToasterEventTypes.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};