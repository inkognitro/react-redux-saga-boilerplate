import {
    ADD_TOAST_MESSAGE_TO_PIPELINE,
    ADD_MESSAGE_TO_TOAST,
    ToasterActionType,
    Message
} from "./types";

export function addToastMessageToPipeline (message: Message): ToasterActionType {
    return {
        type: ADD_TOAST_MESSAGE_TO_PIPELINE,
        payload: {
            message: message
        }
    }
}

export function addMessageToToast(message: Message): ToasterActionType {
    return {
        type: ADD_MESSAGE_TO_TOAST,
        payload: {
            message: message
        }
    }
}