import {
    call, put, spawn, takeEvery,
} from "@redux-saga/core/effects";
import { HistoryManager, RouterStateSelector } from "../../types";
import { watchExtendRouterCommands } from "./extend.router.handling";
import { handleOpenUrl } from "./open.url.handling";
import { RouterCommandTypes } from "../../command";
import { createCurrentUrlWasChanged, createRouterWasInitialized } from "../../event";

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
