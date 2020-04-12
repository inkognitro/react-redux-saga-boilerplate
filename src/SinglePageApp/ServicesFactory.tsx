import {applyMiddleware, combineReducers, createStore as createReduxStore, Middleware, Store} from 'redux';
import {RouterState, RouterStateSelector} from "Common/Domain/Router/Types";
import createSagaMiddleware from 'redux-saga';
import {spawn} from "@redux-saga/core/effects";
import {createBrowserHistory, History} from 'history';
import {createToasterFlow} from "Common/Domain/Toaster/Toaster";
import {ToasterState, ToasterStateSelector} from "Common/Domain/Toaster/Types";
import {toasterReducer} from "Common/Domain/Toaster/Event/Reducer";
import {TranslatorState, TranslatorStateSelector} from "Common/Domain/Translator/Types";
import {createTranslatorFlow} from "Common/Domain/Translator/Translator";
import {translatorReducer} from "Common/Domain/Translator/Event/Reducer";
import {createRouterFlow} from "Common/Domain/Router/Router";
import {BrowserHistoryManager} from "Common/Infrastructure/Router/BrowserHistoryManager";
import {createCookieFlow} from "Common/Domain/Cookie/Cookie";
import {BrowserCookieStorage} from "Common/Infrastructure/Cookie/BrowserCookieStorage";
import {routerReducer} from "Common/Domain/Router/Event/Reducer";
import {createRoutingSaga, routingReducer} from "./Domain/Routing/Routing";
import {httpReducer} from "Common/Domain/RequestHandling/Base/Http/Event/Reducer";
import {HttpState, HttpStateSelector} from "Common/Domain/RequestHandling/Base/Http/Types";
import {createRequestHandlingFlow} from "Common/Domain/RequestHandling/RequestHandling";
import {AuthState, AuthStateSelector} from "Common/Domain/Authentication/Types";
import {authenticationReducer} from "Common/Domain/Authentication/Event/Reducer";
import {HttpRequestDispatcher} from "Common/Domain/RequestHandling/Base/Http/HttpRequestDispatcher";
import {createAuthenticationFlow} from "Common/Domain/Authentication/Authentication";
import {RoutingState} from "SinglePageApp/Domain/Routing/Types";

interface SagaTask {
    cancel(): void
}

type AppServices = {
    store: Store,
    history: History,
    httpRequestDispatcher: HttpRequestDispatcher,
    sagaMiddleware: SagaMiddleware,
    rootSagaTask: SagaTask,
}

let currentServices: (null | AppServices) = null;
export function createHotReloadedAppServices(httpRequestDispatcher: HttpRequestDispatcher): AppServices {
    if(currentServices === null) {
        currentServices = createAppServices(httpRequestDispatcher);
        return currentServices;
    }
    currentServices.rootSagaTask.cancel();
    const newRootSaga = createRootSaga(currentServices.history, currentServices.httpRequestDispatcher);
    const newRootSagaTask = currentServices.sagaMiddleware.run(newRootSaga);
    return {
        ...currentServices,
        //@ts-ignore
        rootSagaTask: newRootSagaTask,
    };
}

export function createAppServices(httpRequestDispatcher: HttpRequestDispatcher): AppServices {
    const history: History = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(rootReducer, applyMiddleware(sagaMiddleware));
    const rootSaga = createRootSaga(history, httpRequestDispatcher);
    const rootSagaTask: SagaTask = sagaMiddleware.run(rootSaga);
    return {
        store: store,
        history: history,
        httpRequestDispatcher: httpRequestDispatcher,
        sagaMiddleware: sagaMiddleware,
        rootSagaTask: rootSagaTask,
    };
}

const rootReducer = combineReducers({
    translator: translatorReducer,
    toaster: toasterReducer,
    http: httpReducer,
    router: routerReducer,
    routing: routingReducer,
    authentication: authenticationReducer,
});

export type RootState = {
    translator: TranslatorState,
    toaster: ToasterState,
    http: HttpState,
    router: RouterState,
    routing: RoutingState,
    authentication: AuthState,
};

type SagaMiddleware = (Middleware & {
    run(rootSaga: () => Generator): void
});

function createRootSaga(history: History, httpRequestDispatcher: HttpRequestDispatcher): () => Generator {
    const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
    const toasterSaga = createToasterFlow(toasterStateSelector);

    const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
    const translatorSaga = createTranslatorFlow(translatorStateSelector);

    const historyManager = new BrowserHistoryManager(history);
    const routerStateSelector: RouterStateSelector = (state: RootState) => state.router;
    const routerSaga = createRouterFlow(routerStateSelector, historyManager);

    const cookieStorage = new BrowserCookieStorage();
    const cookieSaga = createCookieFlow(cookieStorage);

    const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
    const authenticationSaga = createAuthenticationFlow(authStateSelector);

    const httpStateSelector: HttpStateSelector = (state: RootState) => state.http;
    const requestHandlingSaga = createRequestHandlingFlow(
        httpStateSelector,
        httpRequestDispatcher,
        authStateSelector,
        translatorStateSelector
    );

    const routingSaga = createRoutingSaga();

    return function* rootSaga(): Generator {
        yield spawn(translatorSaga);
        yield spawn(toasterSaga);
        yield spawn(cookieSaga);
        yield spawn(authenticationSaga);
        yield spawn(requestHandlingSaga);
        yield spawn(routerSaga);
        yield spawn(routingSaga);
    };
}