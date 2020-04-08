import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bus/Domain/Event";

export function createToastOutroAnimationWasStarted(toastId: string): ToastOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastOutroAnimationWasStarted = Event<ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED, {
    toastId: string,
}>;