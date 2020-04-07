import {spawn} from "@redux-saga/core/effects";
import {createWatchRemoveMessageSaga} from "Common/Toaster/Domain/Command/RemoveMessage";
import {createWatchShowMessageSaga} from "Common/Toaster/Domain/Command/ShowMessage";
import {ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {createWatchMoveMessagesFromPipelineToToastsSaga} from "Common/Toaster/Domain/Command/MoveMessagesFromPipelineToToasts";

export enum ToasterCommandTypes {
    SHOW_MESSAGE = 'SHOW_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
    MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS = 'MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export function createToasterSaga(toasterStateSelector: ToasterStateSelector): () => Generator {
    return function* toasterSaga() {
        yield spawn(createWatchShowMessageSaga(toasterStateSelector));
        yield spawn(createWatchMoveMessagesFromPipelineToToastsSaga(toasterStateSelector));
        yield spawn(createWatchRemoveMessageSaga(toasterStateSelector));
    }
}