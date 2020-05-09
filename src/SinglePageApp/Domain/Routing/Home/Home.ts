import { select, spawn, takeEvery } from "redux-saga/effects";
import { HomeCommandTypes } from "SinglePageApp/Domain/Routing/Home/Types";

export function createHomeSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchLeakReduxStateCommands);
    };
}

function* watchLeakReduxStateCommands(): Generator {
    yield takeEvery(HomeCommandTypes.LEAK_REDUX_STATE, function* (): Generator {
        const state = yield select();
        console.log(state);
    });
}
