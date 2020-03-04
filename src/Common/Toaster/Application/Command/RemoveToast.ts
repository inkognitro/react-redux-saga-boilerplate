import {CommandActionTypes} from "Common/Toaster/Application/ToasterMiddleware";
import {Dispatch} from "redux";
import {createMoveMessagesFromPipelineToToastAction} from "Common/Toaster/Domain/Actions/MoveMessagesFromPipelineToToastAction";

export type RemoveToastAction = {
    type: CommandActionTypes.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};

export function createRemoveToastAction(toastId: string): RemoveToastAction {
    return {
        type: CommandActionTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

export function handleRemoveToastAction(toastId: string, dispatch: Dispatch): void {
    dispatch(createRemoveToastAction(toastId));
    dispatch(createMoveMessagesFromPipelineToToastAction(toastId));
}