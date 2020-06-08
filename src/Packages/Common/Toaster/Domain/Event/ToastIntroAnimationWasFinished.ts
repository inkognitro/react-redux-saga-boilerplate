import { Event } from "Packages/Entity/CommonTypes";
import { ToasterEventTypes } from "../Types";

export function createToastIntroAnimationWasFinished(
    toastId: string,
): ToastIntroAnimationWasFinished {
    return {
        type: ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED,
        payload: {
            toastId,
        },
    };
}

export type ToastIntroAnimationWasFinished = Event<ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED, {
    toastId: string;
}>;
