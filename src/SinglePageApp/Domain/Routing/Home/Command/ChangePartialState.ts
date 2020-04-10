import {Command} from "Common/Domain/Bus/Command";
import {put, takeEvery} from "@redux-saga/core/effects";
import {HomeCommandTypes} from "../Home";
import {HomeState} from "../Types";
import {createPartialStateWasChanged} from "../Event/PartialStateWasChanged";

export function createChangePartialStateSaga(): GeneratorFunction {
    return <GeneratorFunction>function* watchLeakReduxState(): Generator {
        yield takeEvery(HomeCommandTypes.CHANGE_PARTIAL_STATE, function* (command: ChangePartialState): Generator {
            yield put(createPartialStateWasChanged(command.payload));
        });
    }
}

export function createChangePartialState(state: Partial<HomeState>): ChangePartialState {
    return {
        type: HomeCommandTypes.CHANGE_PARTIAL_STATE,
        payload: state,
    };
}

export type ChangePartialState = Command<HomeCommandTypes.CHANGE_PARTIAL_STATE, Partial<HomeState>>;