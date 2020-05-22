import { RouterCommandTypes, RouterStateSelector } from "Packages/Common/Router/Domain/Types";
import {
    call, put, spawn, takeEvery,
} from "@redux-saga/core/effects";
import { watchExtendRouterCommands } from "Packages/Common/Router/Domain/Saga/Flow/ExtendRouterHandling";
import { handleOpenUrl } from "Packages/Common/Router/Domain/Saga/Flow/OpenUrlHandling";
import { createCurrentUrlWasChanged } from "Packages/Common/Router/Domain/Event/CurrentUrlWasChanged";
import { createRouterWasInitialized } from "Packages/Common/Router/Domain/Event/RouterWasInitialized";
import { HistoryManager } from "Packages/Common/Router/Domain";

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
