import { Event } from "Packages/Common/CommonTypes";
import { MessageToAdd, ToasterEventTypes } from "../Types";

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

export type MessageWasAddedToPipeline = Event<ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE, {
    messageToAdd: MessageToAdd;
}>;
