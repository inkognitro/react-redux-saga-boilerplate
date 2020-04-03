import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createToastIntroAnimationWasFinished(toastId: string): ToastIntroAnimationWasFinished {
    return {
        type: ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED,
        payload: {
            toastId: toastId,
        }
    };
}

export type ToastIntroAnimationWasFinished = Event<ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED, {
    toastId: string,
}>;