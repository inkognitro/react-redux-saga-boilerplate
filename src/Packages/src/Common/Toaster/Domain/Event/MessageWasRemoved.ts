import { Event } from "Packages/Entity/CommonTypes";
import { ToasterEventTypes } from "../Types";

export function createMessageWasRemoved(messageId: string): MessageWasRemoved {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_REMOVED,
        payload: {
            messageId,
        },
    };
}

export type MessageWasRemoved = Event<ToasterEventTypes.MESSAGE_WAS_REMOVED, {
    messageId: string;
}>;
