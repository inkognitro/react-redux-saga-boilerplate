import {findToastById, getCommonToastIdByType} from "App/Redux/Toaster/selectors";
import {AppThunk, store} from "App/Redux/root";
import {ToastTypes, ToasterActions, ToasterActionTypes} from "App/Redux/Toaster/types";

const uuidV4 = require('uuid/v4');

type AddToastMessageProps = {
    type: ToastTypes,
    content: string,
};

export function addToastMessage(props: AddToastMessageProps): AppThunk {
    return function (dispatch) {
        const toastId = getCommonToastIdByType(props.type);
        dispatch(addMessageToPipeline(toastId, props.type, props.content));
        setTimeout(() => {
            const storedToast = findToastById(store.getState(), toastId);
            if (storedToast === null) {
                dispatch(moveMessagesFromPipelineToToast(toastId, false));
                return;
            }
            if (storedToast.canReceiveMessages) {
                dispatch(moveMessagesFromPipelineToToast(toastId, true));
            }
        }, 200)
    };
}

export function removeToast(toastId: string): AppThunk {
    return function (dispatch) {
        dispatch(createRemoveToastMessageAction(toastId));
        dispatch(moveMessagesFromPipelineToToast(toastId, false));
    };
}

function createRemoveToastMessageAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId,
        }
    };
}

export function blockToastForMessageReceiving(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId,
        }
    };
}

export function removeToastMessage(toastId: string, toastMessageId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            toastMessageId: toastMessageId
        }
    };
}

function moveMessagesFromPipelineToToast(toastId: string, areMessageIntroAnimationsEnabled: boolean): ToasterActions {
    return {
        type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId,
            enableMessageIntroAnimation: areMessageIntroAnimationsEnabled,
        }
    };
}

function addMessageToPipeline(toastId: string, type: ToastTypes, content: string): ToasterActions {
    return {
        type: ToasterActionTypes.ADD_MESSAGE_TO_PIPELINE,
        payload: {
            messageToAdd: {
                id: uuidV4(),
                toastId: toastId,
                type: type,
                content: content,
            },
        }
    };
}



