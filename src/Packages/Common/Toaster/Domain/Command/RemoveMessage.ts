import { ToasterCommandTypes } from "Packages/Common/Toaster/Domain/Types";
import {Command} from "Packages/Common/Types";

export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: { messageId },
    };
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, {
    messageId: string;
}>;
