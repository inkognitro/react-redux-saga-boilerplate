import { takeEvery, all } from 'redux-saga/effects'
import {ListenerActionTypes} from "Common/Bootstrap/Action";
import {Command, CommandAction} from "Common/Bootstrap/Command";

function* handleCommand(command: Command) {
    yield console.log(command);
}

function* watchCommandsSaga() {
    yield takeEvery(ListenerActionTypes.COMMAND, (action: CommandAction) => handleCommand(action.command))
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchCommandsSaga()
    ])
}