import {Command} from "Common/Bootstrap/Domain/Command";
import {select, takeEvery} from "@redux-saga/core/effects";
import {HomeCommandTypes} from "SinglePageApp/Routing/Domain/Home/Home";

export function createWatchLeakReduxStateSaga(): GeneratorFunction {
    return <GeneratorFunction>function* watchLeakReduxState(): Generator {
        yield takeEvery(HomeCommandTypes.LEAK_REDUX_STATE, function* (_: LeakReduxState): Generator {
            console.log(select());
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