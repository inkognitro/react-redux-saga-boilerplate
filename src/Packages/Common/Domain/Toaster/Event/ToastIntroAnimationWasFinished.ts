import { ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

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
