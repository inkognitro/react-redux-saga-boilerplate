import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/AppBase/EventBus";

export function createMessageWasMovedFromPipelineToToast(toastId: string): MessageWasMovedFromPipelineToToast {
    return {
        type: ToasterEventTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

export type MessageWasMovedFromPipelineToToast = Event<ToasterEventTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST, {
    toastId: string,
}>;