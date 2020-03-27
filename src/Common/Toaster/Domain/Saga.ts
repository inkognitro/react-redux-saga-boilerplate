import { takeEvery, all } from 'redux-saga/effects'
import {ListenerActionTypes} from "Common/Bootstrap/Action";
import {CommandAction} from "Common/Bootstrap/Command";
import {AddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";

function* handleAddToastMessage(command: AddToastMessage) {
    yield console.log(command);
}

function* watchCommandsSaga() {
    yield takeEvery(ListenerActionTypes.COMMAND, (action: CommandAction) => handleAddToastMessage(action.command))
}

export function* rootSaga() {
    yield all([
        watchCommandsSaga()
    ])
}