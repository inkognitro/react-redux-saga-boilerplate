import {
    call, put, spawn, takeEvery,
} from "@redux-saga/core/effects";
import { HistoryManager, RouterStateSelector } from "../../Types";
import { watchExtendRouterCommands } from "./ExtendRouterHandling";
import { handleOpenUrl } from "./OpenUrlHandling";
import { createCurrentUrlWasChanged } from "../../Event/CurrentUrlWasChanged";
import { createRouterWasInitialized } from "../../Event/RouterWasInitialized";
import { RouterCommandTypes } from "../../Command/Types";

export function createRouterSaga(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager,
): () => Generator {
    return function* (): Generator {
        yield call(initializeRouter, historyManager);
        yield spawn(watchCurrentUrlChange, historyManager);
        yield spawn(watchOpenUrlCommands, routerStateSelector, historyManager);
        yield spawn(watchExtendRouterCommands, routerStateSelector);
    };
}

function* watchCurrentUrlChange(historyManager: HistoryManager): Generator {
    while (true) {
        // @ts-ignore
        const url: string = yield call(historyManager.getOnChangeCurrentUrlPromise);
        yield put(createCurrentUrlWasChanged(url));
    }
}

function* watchOpenUrlCommands(routerStateSelector: RouterStateSelector, historyManager: HistoryManager): Generator {
    yield takeEvery(RouterCommandTypes.OPEN_URL, handleOpenUrl, routerStateSelector, historyManager)
}

function* initializeRouter(historyManager: HistoryManager): Generator {
    yield put(createRouterWasInitialized(historyManager.getCurrentUrl()));
}
