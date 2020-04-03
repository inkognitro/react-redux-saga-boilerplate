import {RouterStateSelector} from "Common/Router/Domain/Types";
import {put, call, spawn} from "@redux-saga/core/effects";
import {HistoryManager} from "Common/Router/Domain/HistoryManager";
import {createWatchOpenUrlSaga} from "Common/Router/Domain/Commands/OpenUrl";
import {createRouterWasInitialized} from "Common/Router/Domain/Event/RouterWasInitialized";
import {createCurrentUrlWasChanged} from "Common/Router/Domain/Event/CurrentUrlWasChanged";
import {createWatchAddRedirectsSaga} from "Common/Router/Domain/Commands/AddRedirect";

export enum RouterCommandTypes {
    OPEN_URL = 'OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    ADD_REDIRECTS = 'ADD_REDIRECTS-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
}

export function createRouterSaga(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager
): () => Generator {
    const watchCurrentUrlChange = function* (): Generator {
        while(true) {
            const url = yield call(historyManager.getOnChangeCurrentUrlPromise);
            //@ts-ignore
            put(createCurrentUrlWasChanged(url));
        }
    };
    const initializeRouterSaga = function* (): Generator {
        yield put(createRouterWasInitialized(historyManager.getCurrentUrl()));
    };
    return function* routerSaga() {
        yield call(initializeRouterSaga);
        yield spawn(watchCurrentUrlChange);
        yield spawn(createWatchOpenUrlSaga(routerStateSelector, historyManager));
        yield spawn(createWatchAddRedirectsSaga(routerStateSelector));
    }
}