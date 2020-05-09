import { select, spawn, takeEvery } from "redux-saga/effects";
import { HomePageCommandTypes } from "SinglePageApp/Domain/Routing/HomePage/Types";

export function createHomeSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLeakReduxStateCommands);
    };
}

function* watchLeakReduxStateCommands(): Generator {
    yield takeEvery(HomePageCommandTypes.LEAK_REDUX_STATE, function* (): Generator {
        const state = yield select();
        console.log(state);
    });
}
