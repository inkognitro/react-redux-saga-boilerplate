import {Command} from "Common/Bootstrap/Command";
import {CommandTypes} from "Common/ToasterOld/Domain/Toaster";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createToastMessageWasRemoved} from "Common/ToasterOld/Domain/Event/ToastMessageWasRemoved";
import {createToastMessageRemovalWasStarted} from "Common/ToasterOld/Domain/Event/ToastMessageRemovalWasStarted";

function* handleRemoveToastMessage(command: RemoveToastMessage): Generator {
    yield put(createToastMessageRemovalWasStarted(command.payload.messageId));

    yield put(createToastMessageWasRemoved(command.payload.messageId));
}

export function* watchRemoveToastMessage() {
    yield takeEvery(CommandTypes.REMOVE_TOAST_MESSAGE, handleRemoveToastMessage)
}

export function createRemoveToastMessage(toastId: string, messageId: string): RemoveToastMessage {
    return {
        type: CommandTypes.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            messageId: messageId,
        }
    };
}

export type RemoveToastMessage = Command<CommandTypes.REMOVE_TOAST_MESSAGE, {
    toastId: string,
    messageId: string,
}>;