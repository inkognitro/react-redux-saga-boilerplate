import {
    ADD_TOAST_MESSAGE_TO_PIPELINE,
    ADD_MESSAGE_TO_TOAST,
    ToastActionType,
    RemoveToastMessageAction,
    Message
} from "App/Redux/Common/Toasts/types";

export function addToastMessageToPipeline (message: Message): ToastActionType {
    return {
        type: ADD_TOAST_MESSAGE_TO_PIPELINE,
        payload: {
            message: message
        }
    }
}

export function addMessageToToast(message: Message): ToastActionType {
    return {
        type: ADD_MESSAGE_TO_TOAST,
        payload: {
            message: message
        }
    }
}