import { Event } from "Packages/Entity/CommonTypes";
import { ToasterEventTypes } from "./Types";

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
