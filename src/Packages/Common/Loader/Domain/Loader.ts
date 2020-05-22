import { spawn, takeEvery, put } from "redux-saga/effects";
import { LoaderCommandTypes } from "Packages/Common/Loader/Domain/Types";
import { createLoaderWasDemanded } from "Packages/Common/Loader/Domain/Event/LoaderWasDemanded";
import { createLoaderWasWithdrawn } from "Packages/Common/Loader/Domain/Event/LoaderWasWithdrawn";

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
