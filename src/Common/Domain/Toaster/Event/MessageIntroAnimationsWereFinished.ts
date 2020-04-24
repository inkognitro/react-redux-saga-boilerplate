import { ToasterEventTypes } from "Common/Domain/Toaster/Types";
import { Event } from "Common/Domain/Bus/Event";

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

export type MessageIntroAnimationsWereFinished = Event<
  ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED,
  {
    messageIds: string[];
  }
>;
