import {
    ADD_TOAST_MESSAGE_ACTION_TYPE,
    REMOVE_TOAST_MESSAGE_ACTION_TYPE,
    AddToastMessageAction,
    RemoveToastMessageAction,
    Message
} from "App/Redux/Common/Toasts/types";

export const addToastMessage = (message: Message): AddToastMessageAction => {
    return {
        type: ADD_TOAST_MESSAGE_ACTION_TYPE,
        payload: {
            message: message
        }
    }
};

export const removeToastMessage = (message: Message): RemoveToastMessageAction => {
    return {
        type: REMOVE_TOAST_MESSAGE_ACTION_TYPE,
        payload: {
            message: message
        }
    }
};