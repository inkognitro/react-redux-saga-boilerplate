import {ToasterActions, ToasterActionTypes} from "Common/Toaster/Domain/Types";

export function createMoveMessagesFromPipelineToToastAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

export type MoveMessagesFromPipelineToToastAction = {
    type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
    payload: {
        toastId: string,
    }
};