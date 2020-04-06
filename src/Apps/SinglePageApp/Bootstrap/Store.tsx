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
import {createRoutingSaga, routingReducer} from "SinglePageApp/Routing/Domain/Routing";
import {requestHandlerReducer} from "Common/RequestHandling/Domain/Base/Http/Event/Reducer";
import {HttpStateSelector} from "Common/RequestHandling/Domain/Base/Http/Types";
import {AxiosHttpRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosHttpRequestDispatcher";
import {createRequestHandlingSaga} from "Common/RequestHandling/Domain/RequestHandling";
import {AuthStateSelector} from "Common/AuthenticationWIP/Domain/Types";
import {authenticationReducer} from "Common/AuthenticationWIP/Domain/Event/Reducer";

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

const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
const httpStateSelector: HttpStateSelector = (state: RootState) => state.requestHandler;
const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
const requestHandlingSaga = createRequestHandlingSaga(
    httpStateSelector,
    httpRequestDispatcher,
    authStateSelector,
    translatorStateSelector
);

const routingSaga = createRoutingSaga();

function* rootSaga(): Generator {
    yield spawn(translatorSaga);
    yield spawn(toasterSaga);
    yield spawn(cookieSaga);
    yield spawn(requestHandlingSaga);
    yield spawn(routerSaga);
    yield spawn(routingSaga);
}

const rootReducer = combineReducers({
    translator: translatorReducer,
    toaster: toasterReducer,
    requestHandler: requestHandlerReducer,
    router: routerReducer,
    routing: routingReducer,
    authentication: authenticationReducer,
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