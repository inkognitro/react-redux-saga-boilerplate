import {CommandActionTypes} from "Common/Toaster/Application/ToasterMiddleware";
import {Dispatch} from "redux";
import {createRemoveToastMessageAction} from "Common/Toaster/Domain/Actions/RemoveToastMessageAction";

export type RemoveToastMessageAction = {
    type: CommandActionTypes.REMOVE_TOAST_MESSAGE,
    payload: {
        toastId: string,
        messageId: string,
    }
};

export function createRemoveToastAction(toastId: string, messageId: string): RemoveToastMessageAction {
    return {
        type: CommandActionTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            messageId: messageId,
        }
    };
}

export function handleRemoveToastMessageAction(toastId: string, messageId: string, dispatch: Dispatch): void {
    dispatch(createRemoveToastMessageAction(toastId, messageId));
}