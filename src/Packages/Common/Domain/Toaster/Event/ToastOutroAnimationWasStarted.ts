import { ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

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

export type ToastOutroAnimationWasStarted = Event<
  ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED,
  {
    toastId: string;
  }
>;
