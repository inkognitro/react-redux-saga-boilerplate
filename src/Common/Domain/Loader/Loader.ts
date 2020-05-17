import { spawn, takeEvery, put } from "redux-saga/effects";
import { LoaderCommandTypes } from "Common/Domain/Loader/Types";
import { createLoaderWasDemanded } from "Common/Domain/Loader/Event/LoaderWasDemanded";
import { createLoaderWasWithdrawn } from "Common/Domain/Loader/Event/LoaderWasWithdrawn";

export function createLoaderSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchShowLoaderCommands);
        yield spawn(watchHideLoaderCommands);
    };
}

function* watchShowLoaderCommands(): Generator {
    yield takeEvery(LoaderCommandTypes.SHOW_LOADER, function* () {
        yield put(createLoaderWasDemanded());
    });
}

function* watchHideLoaderCommands(): Generator {
    yield takeEvery(LoaderCommandTypes.HIDE_LOADER, function* () {
        yield put(createLoaderWasWithdrawn());
    });
}
