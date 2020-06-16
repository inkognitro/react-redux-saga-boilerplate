import { Command } from "Packages/Entity/CommonTypes";
import { ToasterCommandTypes } from "../Types";

export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: { messageId },
    };
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, {
    messageId: string;
}>;
