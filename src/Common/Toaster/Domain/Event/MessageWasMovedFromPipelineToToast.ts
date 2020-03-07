import {ToasterEventTypes} from "Common/Toaster/Domain/Types";

export function createMessageWasMovedFromPipelineToToast(toastId: string): MessageWasMovedFromPipelineToToast {
    return {
        type: ToasterEventTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

export type MessageWasMovedFromPipelineToToast = {
    type: ToasterEventTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
    payload: {
        toastId: string,
    }
};