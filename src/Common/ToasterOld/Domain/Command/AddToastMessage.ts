import {MessageToAdd, ToastTypes} from "Common/ToasterOld/Domain/Types";
import {Command} from "Common/Bootstrap/Command";
import {takeEvery, put, delay, select} from "@redux-saga/core/effects";
import {getCommonToastIdByType} from "Common/ToasterOld/Domain/Query/CommonToastIdByTypeQuery";
import uuidV4 from "uuid/v4";
import {createMessageWasAddedToPipeline} from "Common/ToasterOld/Domain/Event/MessageWasAddedToPipeline";
import {createMessageWasMovedFromPipelineToToast} from "Common/ToasterOld/Domain/Event/MessagesWereMovedFromPipelineToToasts";
import {CommandTypes} from "Common/ToasterOld/Domain/Toaster";
import {findMessageById} from "Common/ToasterOld/Domain/Query/MessageByIdQuery";
import {RootState} from "SinglePageApp/Bootstrap/Store";

const getToasterState = (rootState: RootState) => rootState.toaster; //todo pass by factory function!

function* handleAddToastMessage(command: AddToastMessage): Generator {
    const messageDoesAlreadyExist = (
        command.payload.id
        && findMessageById(getToasterState(yield select()), command.payload.id)
    );
    if(messageDoesAlreadyExist) {
        return;
    }
    const toastId = getCommonToastIdByType(command.payload.type);
    const messageToAdd: MessageToAdd = {
        id: (command.payload.id ? command.payload.id : uuidV4()),
        toastId: toastId,
        type: command.payload.type,
        content: command.payload.content,
    };
    yield put(createMessageWasAddedToPipeline(messageToAdd));
    yield delay(200);
    //add messages from pipeline to toast!

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
    id?: string,
    type: ToastTypes,
    content: string,
};