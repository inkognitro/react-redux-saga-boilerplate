import { spawn, takeEvery, put } from "redux-saga/effects";
import { createLoaderWasDemanded } from "../../Event/LoaderWasDemanded";
import { createLoaderWasWithdrawn } from "../../Event/LoaderWasWithdrawn";
import { LoaderCommandTypes } from "../../Types";

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
