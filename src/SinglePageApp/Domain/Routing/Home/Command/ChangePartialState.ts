import { Command } from "Common/Domain/Bus/Command";
import { put, takeEvery } from "redux-saga/effects";
import { HomeCommandTypes } from "SinglePageApp/Domain/Routing/Home/Home";
import { createPartialStateWasChanged } from "SinglePageApp/Domain/Routing/Home/Event/PartialStateWasChanged";
import { HomeState } from "SinglePageApp/Domain/Routing/Home/Types";

export function createChangePartialStateSaga(): () => Generator {
    return function* watchLeakReduxState(): Generator {
        yield takeEvery(HomeCommandTypes.CHANGE_PARTIAL_STATE, function* (
            command: ChangePartialState,
        ): Generator {
            yield put(createPartialStateWasChanged(command.payload));
        });
    };
}

export function createChangePartialState(
    state: Partial<HomeState>,
): ChangePartialState {
    return {
        type: HomeCommandTypes.CHANGE_PARTIAL_STATE,
        payload: state,
    };
}

export type ChangePartialState = Command<
  HomeCommandTypes.CHANGE_PARTIAL_STATE,
  Partial<HomeState>
>;
