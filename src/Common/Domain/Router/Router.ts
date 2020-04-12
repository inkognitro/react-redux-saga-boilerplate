import {RouterStateSelector} from "Common/Domain/Router/Types";
import {call, put, spawn} from "@redux-saga/core/effects";
import {HistoryManager} from "Common/Domain/Router/HistoryManager";
import {createRouterWasInitialized} from "Common/Domain/Router/Event/RouterWasInitialized";
import {createCurrentUrlWasChanged} from "Common/Domain/Router/Event/CurrentUrlWasChanged";
import {createWatchExtendRouterFlow} from "Common/Domain/Router/Saga/Flow/ExtendRouterHandling";
import {createWatchOpenUrlFlow} from "Common/Domain/Router/Saga/Flow/OpenUrlHandling";

export function createRouterFlow(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager
): () => Generator {
    const watchCurrentUrlChange = function* (): Generator {
        while(true) {
            //@ts-ignore
            const url: string = yield call(historyManager.getOnChangeCurrentUrlPromise);
            put(createCurrentUrlWasChanged(url));
        }
    };
    const initializeRouter = function* (): Generator {
        yield put(createRouterWasInitialized(historyManager.getCurrentUrl()));
    };
    return function* () {
        yield call(initializeRouter);
        yield spawn(watchCurrentUrlChange);
        yield spawn(createWatchOpenUrlFlow(routerStateSelector, historyManager));
        yield spawn(createWatchExtendRouterFlow(routerStateSelector));
    }
}