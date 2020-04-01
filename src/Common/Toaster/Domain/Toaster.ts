import {spawn} from "@redux-saga/core/effects";
import {watchRemoveMessage} from "Common/Toaster/Domain/Command/RemoveMessage";
import {watchShowMessage} from "Common/Toaster/Domain/Command/ShowMessage";
import {watchMoveMessagesFromPipelineToToasts} from "Common/Toaster/Domain/Command/MoveMessagesFromPipelineToToasts";

export enum ToasterCommandTypes {
    SHOW_MESSAGE = 'SHOW_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
    MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS = 'MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export function* toasterSaga() {
    yield spawn(watchRemoveMessage);
    yield spawn(watchShowMessage);
    yield spawn(watchMoveMessagesFromPipelineToToasts);
}