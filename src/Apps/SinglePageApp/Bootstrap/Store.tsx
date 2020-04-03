import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux';
import {ReducerManager as RoutingReducerManager} from 'Common/Router/Domain/Event/Reducer';
import {RouterState, RouterStateSelector} from "Common/Router/Domain/Types";
import {homeRouteReducer} from "SinglePageApp/Routing/Home/Home";
import createSagaMiddleware from 'redux-saga';
import {spawn} from "@redux-saga/core/effects";
import {createBrowserHistory, History} from 'history';
import {createToasterSaga} from "Common/Toaster/Domain/Toaster";
import {ToasterState, ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {toasterReducer} from "Common/Toaster/Domain/Event/Reducer";
import {TranslatorState, TranslatorStateSelector} from "Common/Translator/Domain/Types";
import {createTranslatorSaga} from "Common/Translator/Domain/Translator";
import {translatorReducer} from "Common/Translator/Domain/Event/Reducer";
import {createRouterSaga} from "Common/Router/Domain/Router";
import {BrowserHistoryManager} from "Common/Router/Infrastructure/BrowserHistoryManager";

const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
const toasterSaga = createToasterSaga(toasterStateSelector);

const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
const translatorSaga = createTranslatorSaga(translatorStateSelector);

export const browserHistory: History = createBrowserHistory();
const historyManager = new BrowserHistoryManager(browserHistory);
const routerStateSelector: RouterStateSelector = (state: RootState) => state.router;
const routerSaga = createRouterSaga(routerStateSelector, historyManager);

function* rootSaga(): Generator {
    yield spawn(toasterSaga);
    yield spawn(translatorSaga);
    yield spawn(routerSaga);
}

const routingReducerManager = new RoutingReducerManager([
    homeRouteReducer
]);

const storeReducer = combineReducers({
    translator: translatorReducer,
    toaster: toasterReducer,
    router: routingReducerManager.reduce,
});

export type RootState<CurrentRouteState = any> = {
    translator: TranslatorState,
    toaster: ToasterState,
    router: RouterState<CurrentRouteState>,
};

export function createStore(): Store {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(
        storeReducer,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga); //todo: return {sagaMiddleware, store} instead!
    return store;
}