import {Command} from "Common/Domain/Bus/Command";
import {ToasterCommandTypes} from "Common/Domain/Toaster/Types";

export function createMoveMessagesFromPipelineToToasts(): MoveMessagesFromPipelineToToasts {
    return {
        type: ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS,
        payload: undefined,
    };
}

export type MoveMessagesFromPipelineToToasts = Command<ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS>;