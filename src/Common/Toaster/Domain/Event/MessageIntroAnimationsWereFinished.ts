import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createMessageIntroAnimationsWereFinished(messageIds: string[]): MessageIntroAnimationsWereFinished {
    return {
        type: ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED,
        payload: {
            messageIds: messageIds
        }
    };
}

export type MessageIntroAnimationsWereFinished = Event<ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED, {
    messageIds: string[],
}>;