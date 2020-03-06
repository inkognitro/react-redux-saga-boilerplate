import {CommandActionTypes} from "Common/Toaster/Domain/ToasterMiddleware";
import {Dispatch} from "redux";
import {createMessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Events/MessageWasMovedFromPipelineToToast";
import {Command, createCommand} from "Common/BusMiddleware/CommandListenerMiddleware";

export type RemoveToastAction = {
    type: CommandActionTypes.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};

export function createRemoveToastCommand(toastId: string): Command<RemoveToastAction> {
    return createCommand({
        type: CommandActionTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    });
}

export function handleRemoveToastAction(toastId: string, dispatch: Dispatch): void {
    dispatch(createRemoveToastCommand(toastId));
    dispatch(createMessageWasMovedFromPipelineToToast(toastId));
}