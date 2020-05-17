import { RouterCommandTypes, RouterStateSelector } from "Packages/Common/Domain/Router/Types";
import {
    call, put, spawn, takeEvery,
} from "redux-saga/effects";
import { HistoryManager } from "Packages/Common/Domain/Router/HistoryManager";
import { createRouterWasInitialized } from "Packages/Common/Domain/Router/Event/RouterWasInitialized";
import { createCurrentUrlWasChanged } from "Packages/Common/Domain/Router/Event/CurrentUrlWasChanged";
import { handleOpenUrl } from "Packages/Common/Domain/Router/Saga/OpenUrlHandling";

export function createRouterSaga(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager,
): () => Generator {
    return function* (): Generator {
        yield call(initializeRouter, historyManager);
        yield spawn(watchCurrentUrlChange, historyManager);
        yield spawn(watchOpenUrlCommands, routerStateSelector, historyManager);
        yield spawn(handleExtendRouter, routerStateSelector);
    };
}

function* watchOpenUrlCommands(routerStateSelector: RouterStateSelector, historyManager: HistoryManager): Generator {
    yield takeEvery(RouterCommandTypes.OPEN_URL, handleOpenUrl, routerStateSelector, historyManager)
}

function* watchCurrentUrlChange(historyManager: HistoryManager): Generator {
    while (true) {
        // @ts-ignore
        const url: string = yield call(historyManager.getOnChangeCurrentUrlPromise);
        yield put(createCurrentUrlWasChanged(url));
    }
}

function* initializeRouter(historyManager: HistoryManager): Generator {
    yield put(createRouterWasInitialized(historyManager.getCurrentUrl()));
}

function* handleExtendRouter(routerStateSelector: RouterStateSelector): Generator {
    yield takeEvery(RouterCommandTypes.EXTEND_ROUTER, handleExtendRouter, routerStateSelector);
}
