import { ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

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
