import { ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.TOAST_WAS_REMOVED,
        payload: {
            toastId,
        },
    };
}

export type ToastWasRemoved = Event<
  ToasterEventTypes.TOAST_WAS_REMOVED,
  {
    toastId: string;
  }
>;
