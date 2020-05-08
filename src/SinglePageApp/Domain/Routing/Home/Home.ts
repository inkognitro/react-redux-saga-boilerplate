import { select, spawn, takeEvery } from "redux-saga/effects";

export enum HomeCommandTypes {
  LEAK_REDUX_STATE = "LEAK_REDUX_STATE-a8e50935-b646-4051-a727-f393c658d1e6",
}

export function createHomeSaga(): () => Generator {
    return function* homeSaga(): Generator {
        yield spawn(watchLeakReduxState);
    };
}

function* watchLeakReduxState(): Generator {
    yield takeEvery(HomeCommandTypes.LEAK_REDUX_STATE, function* (): Generator {
        const state = yield select();
        console.log(state);
    });
}
