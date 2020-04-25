import { Command } from "Common/Domain/Bus/Command";
import { select, takeEvery } from "redux-saga/effects";
import { HomeCommandTypes } from "SinglePageApp/Domain/Routing/Home/Home";

export function createWatchLeakReduxStateSaga(): () => Generator {
    return function* watchLeakReduxState(): Generator {
        yield takeEvery(HomeCommandTypes.LEAK_REDUX_STATE, function* (
            _: LeakReduxState,
        ): Generator {
            const state = yield select();
            console.log(state);
        });
    };
}

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomeCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomeCommandTypes.LEAK_REDUX_STATE>;
