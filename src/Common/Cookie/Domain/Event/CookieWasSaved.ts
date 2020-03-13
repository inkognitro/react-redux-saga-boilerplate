import {v4 as uuidV4} from "uuid";
import {MessageToAdd, ToasterEventTypes, ToastTypes} from "Common/Toaster/Domain/Types";

export function createCookieWasSaved(toastId: string, type: ToastTypes, content: string): CookieWasSaved {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
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

export type CookieWasSaved = {
    type: ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
    payload: {
        messageToAdd: MessageToAdd,
    }
};