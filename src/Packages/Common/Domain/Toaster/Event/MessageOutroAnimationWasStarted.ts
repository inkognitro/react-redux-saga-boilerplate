import { ToasterEventTypes } from "Packages/Common/Domain/Toaster/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createMessageOutroAnimationWasStarted(
    messageId: string,
): MessageOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            messageId,
        },
    };
}

export type MessageOutroAnimationWasStarted = Event<ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED, {
    messageId: string;
}>;
