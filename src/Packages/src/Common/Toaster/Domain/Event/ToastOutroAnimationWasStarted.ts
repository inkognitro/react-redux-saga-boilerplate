import { Event } from "Packages/Entity/CommonTypes";
import { ToasterEventTypes } from "./Types";

export function createToastOutroAnimationWasStarted(
    toastId: string,
): ToastOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            toastId,
        },
    };
}

export type ToastOutroAnimationWasStarted = Event<ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED, {
    toastId: string;
}>;
