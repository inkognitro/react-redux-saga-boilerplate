import {ToasterActions, ToasterActionTypes} from "Common/Toaster/Domain/Types";

export function createRemoveToastMessageAction(toastId: string, toastMessageId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            toastMessageId: toastMessageId
        }
    };
}

export type RemoveToastMessageAction = {
    type: ToasterActionTypes.REMOVE_TOAST_MESSAGE,
    payload: {
        toastId: string,
        toastMessageId: string,
    }
};