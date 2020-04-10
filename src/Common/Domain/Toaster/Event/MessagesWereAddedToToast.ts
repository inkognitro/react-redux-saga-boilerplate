import {Message, ToasterEventTypes} from "Common/Domain/Toaster/Types";
import {Event} from "Common/Domain/Bus/Event";

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