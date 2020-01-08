import {findToastById, getCommonToastIdByType} from "App/Redux/Toaster/selectors";
import {AppThunk, store} from "App/Redux/root";
import {ToastTypes, ToasterActions, ToasterActionTypes, Toast} from "App/Redux/Toaster/types";

const uuidV4 = require('uuid/v4');

type AddToastMessageProps = {
    type: ToastTypes,
    content: string,
};

export function addToastMessage(props: AddToastMessageProps): AppThunk {
    return function(dispatch) {
        const toastId = getCommonToastIdByType(props.type);
        dispatch(addMessageToPipeline(toastId, props.type, props.content));
        setTimeout(() => {
            const storedToast = findToastById(store.getState(), toastId);
            if(storedToast === null) {
                dispatch(addToast({
                    id: toastId,
                    type: props.type,
                    messages: [],
                }));
                dispatch(moveMessagesFromPipelineToToast(toastId, false));
                return;
            }
            dispatch(moveMessagesFromPipelineToToast(toastId, true));
        }, 200)
    };
}

function moveMessagesFromPipelineToToast(toastId: string, areMessageIntroAnimationsEnabled: boolean): ToasterActions {
    return {
        type: ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST,
        payload: {
            toastId: toastId,
            areMessageIntroAnimationsEnabled: areMessageIntroAnimationsEnabled,
        }
    };
}

function addToast(toast: Toast): ToasterActions {
    return {
        type: ToasterActionTypes.ADD_TOAST,
        payload: {
            toast: toast,
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



