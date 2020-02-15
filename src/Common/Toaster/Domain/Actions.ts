import {v4 as uuidV4} from 'uuid';
import {getCommonToastIdByType} from "Common/Toaster/Domain/Selectors";
import {ToasterActions, ToasterActionTypes} from "Common/Toaster/Domain/Types";
import {AppThunk} from "Common/types";
import {ToastTypes} from "Common/Toaster/Domain/ToastRepository";

//todo: get rid of imports outside of the toaster domain layer!

type AddToastMessageProps = {
    type: ToastTypes,
    content: string,
};

export function createAddToastMessageThunk(props: AddToastMessageProps): AppThunk {
    return function (dispatch) {
        const toastId = getCommonToastIdByType(props.type);
        dispatch(createAddMessageToPipelineAction(toastId, props.type, props.content));
        setTimeout(() => {
            dispatch(createMoveMessagesFromPipelineToToastAction(toastId));
        }, 200)
    };
}

export function createRemoveToastThunk(toastId: string): AppThunk {
    return function (dispatch) {
        dispatch(createRemoveToastAction(toastId));
        dispatch(createMoveMessagesFromPipelineToToastAction(toastId));
    };
}

export function createBlockToastForMessageReceivingAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId,
        }
    };
}

export function createRemoveToastMessageAction(toastId: string, toastMessageId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            toastMessageId: toastMessageId
        }
    };
}

function createRemoveToastAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId,
        }
    };
}

function createMoveMessagesFromPipelineToToastAction(toastId: string): ToasterActions {
    return {
        type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

function createAddMessageToPipelineAction(toastId: string, type: ToastTypes, content: string): ToasterActions {
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
