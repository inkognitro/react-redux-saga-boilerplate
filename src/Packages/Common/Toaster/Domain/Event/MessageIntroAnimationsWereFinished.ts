import { ToasterEventTypes } from "Packages/Common/Toaster/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createMessageIntroAnimationsWereFinished(
    messageIds: string[],
): MessageIntroAnimationsWereFinished {
    return {
        type: ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED,
        payload: {
            messageIds,
        },
    };
}

export type MessageIntroAnimationsWereFinished = Event<ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED, {
    messageIds: string[];
}>;
