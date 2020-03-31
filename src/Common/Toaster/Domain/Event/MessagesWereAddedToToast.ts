import {Message, ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createMessagesWereAddedToToast(toastId: string, messages: Message[]): MessagesWereAddedToToast {
    return {
        type: ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST,
        payload: {
            toastId: toastId,
            messages: messages,
        }
    };
}

export type MessagesWereAddedToToast = Event<ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST, {
    toastId: string,
    messages: Message[],
}>;