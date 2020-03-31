import {Command} from "Common/Bootstrap/Command";
import {put, takeEvery} from "@redux-saga/core/effects";
import {createToastWasRemoved} from "Common/ToasterOld/Domain/Event/ToastWasRemoved";
import {CommandTypes} from "Common/ToasterOld/Domain/Toaster";

function* handleRemoveToast(command: RemoveToast): Generator {
    yield put(createToastWasRemoved(command.payload.toastId));
}

export function* watchRemoveToast() {
    yield takeEvery(CommandTypes.ADD_TOAST_MESSAGE, handleRemoveToast)
}

export function createRemoveToast(toastId: string): RemoveToast {
    return {
        type: CommandTypes.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    };
}

export type RemoveToast = Command<CommandTypes.REMOVE_TOAST, {
    toastId: string,
}>;