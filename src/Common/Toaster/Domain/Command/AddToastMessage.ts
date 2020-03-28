import {ToastTypes} from "Common/Toaster/Domain/Types";
import {Command} from "Common/Bootstrap/Command";
import {takeEvery, put, delay} from "@redux-saga/core/effects";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Query/CommonToastIdByTypeQuery";
import uuidV4 from "uuid/v4";
import {createMessageWasAddedToPipeline} from "Common/Toaster/Domain/Event/MessageWasAddedToPipeline";
import {createMessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Event/MessageWasMovedFromPipelineToToast";
import {CommandTypes} from "Common/Toaster/Domain/Toaster";

function* handleAddToastMessage(command: AddToastMessage): Generator {
    const toastId = getCommonToastIdByType(command.payload.type);
    const messageToAdd = {
        id: uuidV4(),
        toastId: toastId,
        type: command.payload.type,
        content: command.payload.content,
    };
    yield put(createMessageWasAddedToPipeline(messageToAdd));
    yield delay(200);
    yield put(createMessageWasMovedFromPipelineToToast(toastId));
}

export function* watchAddToastMessage() {
    yield takeEvery(CommandTypes.ADD_TOAST_MESSAGE, handleAddToastMessage)
}

export function createAddToastMessage(settings: Payload): AddToastMessage {
    return {
        type: CommandTypes.ADD_TOAST_MESSAGE,
        payload: settings,
    };
}

export type AddToastMessage = Command<CommandTypes.ADD_TOAST_MESSAGE, Payload>;

type Payload = {
    type: ToastTypes,
    content: string,
};