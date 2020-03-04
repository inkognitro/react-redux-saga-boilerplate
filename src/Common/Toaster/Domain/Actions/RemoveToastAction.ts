import {ToasterActions, ToasterActionTypes} from "Common/Toaster/Domain/Types";

export function createRemoveToastAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId,
        }
    };
}

export type RemoveToastAction = {
    type: ToasterActionTypes.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};