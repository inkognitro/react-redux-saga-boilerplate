import { Command } from "Packages/Common/Domain/Bus/Command";
import { ToasterCommandTypes } from "Packages/Common/Domain/Toaster/Types";

export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: { messageId },
    };
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, {
    messageId: string;
}>;
