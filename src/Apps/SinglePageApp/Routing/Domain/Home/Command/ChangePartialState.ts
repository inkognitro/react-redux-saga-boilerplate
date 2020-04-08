import {Command} from "Common/Bus/Domain/Command";
import {put, takeEvery} from "@redux-saga/core/effects";
import {HomeCommandTypes} from "SinglePageApp/Routing/Domain/Home/Home";
import {HomeState} from "SinglePageApp/Routing/Domain/Home/Types";
import {createPartialStateWasChanged} from "SinglePageApp/Routing/Domain/Home/Event/PartialStateWasChanged";

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