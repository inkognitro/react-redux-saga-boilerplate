import { ToasterEventTypes } from "Packages/Common/Toaster/Domain/Types";
import {Event} from "Packages/Common/Types";

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
