import {Command} from "Common/Bootstrap/Command";
import {CommandTypes} from "Common/ToasterOld/Domain/Toaster";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createToastWasBlockedForMessageReceiving} from "Common/ToasterOld/Domain/Event/ToastWasBlockedForMessageReceiving";

function* handleBlockToastForMessageReceiving(command: BlockToastForMessageReceiving): Generator {
    yield put(createToastWasBlockedForMessageReceiving(command.payload.toastId));
}

export function* watchBlockToastForMessageReceiving() {
    yield takeEvery(CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING, handleBlockToastForMessageReceiving);
}

export function createBlockToastForMessageReceiving(toastId: string): BlockToastForMessageReceiving {
    return {
        type: CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        payload: {
            toastId: toastId
        }
    };
}

export type BlockToastForMessageReceiving = Command<CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING, {
    toastId: string,
}>;