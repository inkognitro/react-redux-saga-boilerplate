import {Command} from "Common/Bootstrap/Command";
import {takeEvery} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";

function* handleMoveMessagesFromPipelineToToasts(_: MoveMessagesFromPipelineToToasts): Generator {

}

export function* watchMoveMessagesFromPipelineToToasts() {
    yield takeEvery(ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS, handleMoveMessagesFromPipelineToToasts);
}

export function createMoveMessagesFromPipelineToToasts(): MoveMessagesFromPipelineToToasts {
    return {
        type: ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS,
        payload: undefined,
    };
}

export type MoveMessagesFromPipelineToToasts = Command<ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS>;