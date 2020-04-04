import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux';
import {RouterStateSelector} from "Common/Router/Domain/Types";
import createSagaMiddleware from 'redux-saga';
import {spawn} from "@redux-saga/core/effects";
import {createBrowserHistory, History} from 'history';
import {createToasterSaga} from "Common/Toaster/Domain/Toaster";
import {ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {toasterReducer} from "Common/Toaster/Domain/Event/Reducer";
import {TranslatorStateSelector} from "Common/Translator/Domain/Types";
import {createTranslatorSaga} from "Common/Translator/Domain/Translator";
import {translatorReducer} from "Common/Translator/Domain/Event/Reducer";
import {createRouterSaga} from "Common/Router/Domain/Router";
import {BrowserHistoryManager} from "Common/Router/Infrastructure/BrowserHistoryManager";
import {createCookieSaga} from "Common/Cookie/Domain/Cookie";
import {BrowserCookieStorage} from "Common/Cookie/Infrastructure/BrowserCookieStorage";
import {routerReducer} from "Common/Router/Domain/Event/Reducer";
import {routingReducer} from "SinglePageApp/Routing/Domain/Routing";

const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
const toasterSaga = createToasterSaga(toasterStateSelector);

const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
const translatorSaga = createTranslatorSaga(translatorStateSelector);

export const browserHistory: History = createBrowserHistory();
const historyManager = new BrowserHistoryManager(browserHistory);
const routerStateSelector: RouterStateSelector = (state: RootState) => state.router;
const routerSaga = createRouterSaga(routerStateSelector, historyManager);

const cookieStorage = new BrowserCookieStorage();
const cookieSaga = createCookieSaga(cookieStorage);

function* rootSaga(): Generator {
    yield spawn(toasterSaga);
    yield spawn(translatorSaga);
    yield spawn(routerSaga);
    yield spawn(cookieSaga);
}

const rootReducer = combineReducers({
    translator: translatorReducer,
    toaster: toasterReducer,
    router: routerReducer,
    routing: routingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function createStore(): Store {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga); //todo: return {sagaMiddleware, store} instead!
    return store;
}