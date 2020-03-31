import {MessageToAdd, ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createMessageWasAddedToPipeline(messageToAdd: MessageToAdd): MessageWasAddedToPipeline {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
        payload: {
            messageToAdd: messageToAdd,
        }
    };
}

export type MessageWasAddedToPipeline = Event<ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE, {
    messageToAdd: MessageToAdd,
}>;