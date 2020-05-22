import { Message, ToasterEventTypes } from "Packages/Common/Toaster/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createMessagesWereAddedToToast(
    toastId: string,
    messages: Message[],
): MessagesWereAddedToToast {
    return {
        type: ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST,
        payload: {
            toastId,
            messages,
        },
    };
}

export type MessagesWereAddedToToast = Event<ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST, {
    toastId: string;
    messages: Message[];
}>;
