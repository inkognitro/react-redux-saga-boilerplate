import {Command} from "Common/Bootstrap/Command";
import {CommandTypes} from "Common/Toaster/Domain/Toaster";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";

function* handleRemoveToastMessage(command: RemoveToastMessage): Generator {
    yield put(createToastMessageWasRemoved(command.payload.toastId, command.payload.messageId));
}

export function* watchRemoveToastMessage() {
    yield takeEvery(CommandTypes.ADD_TOAST_MESSAGE, handleRemoveToastMessage)
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