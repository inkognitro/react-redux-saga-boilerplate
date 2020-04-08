import {Command} from "Common/Bus/Domain/Command";
import {select, takeEvery} from "@redux-saga/core/effects";
import {HomeCommandTypes} from "SinglePageApp/Routing/Domain/Home/Home";

export function createWatchLeakReduxStateSaga(): GeneratorFunction {
    return <GeneratorFunction>function* watchLeakReduxState(): Generator {
        yield takeEvery(HomeCommandTypes.LEAK_REDUX_STATE, function* (_: LeakReduxState): Generator {
            const state = yield select();
            console.log(state);
        });
    }
}

export function createLeakReduxState(): LeakReduxState {
    return {
        type: HomeCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}

export type LeakReduxState = Command<HomeCommandTypes.LEAK_REDUX_STATE>;