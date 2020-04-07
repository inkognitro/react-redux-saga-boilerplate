import {ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {spawn} from "@redux-saga/core/effects";
import {createWatchShowMessageSaga} from "Common/Toaster/Domain/Command/ShowMessage";
import {createWatchRemoveMessageSaga} from "Common/Toaster/Domain/Command/RemoveMessage";
import {createWatchMoveMessagesFromPipelineToToastsSaga} from "Common/Toaster/Domain/Command/MoveMessagesFromPipelineToToasts";

export enum AuthCommandTypes {
    INITIALIZE_CURRENT_USER = 'INITIALIZE_CURRENT_USER-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    REFRESH_AUTHENTICATION = 'REFRESH_AUTHENTICATION-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGIN = 'LOGIN-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
    LOGOUT = 'LOGOUT-b99351cf-06a9-4d0c-9a09-f09fd0b3cbe3',
}

export function createToasterSaga(toasterStateSelector: ToasterStateSelector): () => Generator {
    return function* toasterSaga() {
        yield spawn(createWatchShowMessageSaga(toasterStateSelector));
        yield spawn(createWatchMoveMessagesFromPipelineToToastsSaga(toasterStateSelector));
        yield spawn(createWatchRemoveMessageSaga(toasterStateSelector));
    }
}