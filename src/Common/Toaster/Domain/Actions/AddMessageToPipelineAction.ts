import {v4 as uuidV4} from "uuid";
import {MessageToAdd, ToasterActions, ToasterActionTypes, ToastTypes} from "Common/Toaster/Domain/Types";

export function createAddMessageToPipelineAction(toastId: string, type: ToastTypes, content: string): ToasterActions {
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

export type AddMessageToPipelineAction = {
    type: ToasterActionTypes.ADD_MESSAGE_TO_PIPELINE,
    payload: {
        messageToAdd: MessageToAdd,
    }
};