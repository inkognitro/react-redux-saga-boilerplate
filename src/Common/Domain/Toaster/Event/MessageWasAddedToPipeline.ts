import { MessageToAdd, ToasterEventTypes } from "Common/Domain/Toaster/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createMessageWasAddedToPipeline(
    messageToAdd: MessageToAdd,
): MessageWasAddedToPipeline {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
        payload: {
            messageToAdd,
        },
    };
}

export type MessageWasAddedToPipeline = Event<
  ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
  {
    messageToAdd: MessageToAdd;
  }
>;
