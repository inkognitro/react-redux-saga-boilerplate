import {
    applyMiddleware,
    combineReducers,
    createStore as createReduxStore,
    Store,
} from "redux";
import { RouterState, RouterStateSelector } from "Common/Domain/Router/Types";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import { createBrowserHistory, History } from "history";
import { createToasterSaga } from "Common/Domain/Toaster/Toaster";
import {
    ToasterState,
    ToasterStateSelector,
} from "Common/Domain/Toaster/Types";
import { toasterReducer } from "Common/Domain/Toaster/Reducer";
import {
    TranslatorState,
    TranslatorStateSelector,
} from "Common/Domain/Translator/Types";
import { createTranslatorSaga } from "Common/Domain/Translator/Translator";
import { translatorReducer } from "Common/Domain/Translator/Reducer";
import { createRouterSaga } from "Common/Domain/Router/Router";
import { BrowserHistoryManager } from "Common/Infrastructure/Router/BrowserHistoryManager";
import { createCookieSaga } from "Common/Domain/Cookie/Cookie";
import { BrowserCookieStorage } from "Common/Infrastructure/Cookie/BrowserCookieStorage";
import { routerReducer } from "Common/Domain/Router/Reducer";
import { httpReducer } from "Common/Domain/RequestHandling/Base/Http/Reducer";
import {
    HttpState,
    HttpStateSelector,
} from "Common/Domain/RequestHandling/Base/Http/Types";
import { createRequestHandlingFlow } from "Common/Domain/RequestHandling/RequestHandling";
import {
    AuthState,
    AuthStateSelector,
} from "Common/Domain/Authentication/Types";
import { authenticationReducer } from "Common/Domain/Authentication/Reducer";
import { HttpRequestDispatcher } from "Common/Domain/RequestHandling/Base/Http/HttpRequestDispatcher";
import { createAuthenticationSaga } from "Common/Domain/Authentication/Authentication";
import { RoutingState } from "SinglePageApp/Domain/Routing/Types";
import { designReducer } from "Common/Domain/Design/Reducer";
import { DesignState } from "Common/Domain/Design/Types";
import { createFormElementsFlow } from "Common/Domain/FormUtils/FormElements/FormElements";
import { createFormFlow } from "Common/Domain/FormUtils/Form/Form";
import { createRoutingSaga, routingReducer } from "SinglePageApp/Domain/Routing/Routing";
import { composeWithDevTools } from 'redux-devtools-extension';
import { AxiosHttpRequestDispatcher } from "Common/Infrastructure/RequestHandling/AxiosHttpRequestDispatcher";

type AppServices = {
  store: Store;
  history: History;
  httpRequestDispatcher: HttpRequestDispatcher;
};

const rootReducer = combineReducers({
    design: designReducer,
    translator: translatorReducer,
    toaster: toasterReducer,
    http: httpReducer,
    router: routerReducer,
    routing: routingReducer,
    authentication: authenticationReducer,
});

function createRootSaga(
    history: History,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
    const toasterSaga = createToasterSaga(toasterStateSelector);

    const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
    const translatorSaga = createTranslatorSaga(translatorStateSelector);

    const historyManager = new BrowserHistoryManager(history);
    const routerStateSelector: RouterStateSelector = (state: RootState) => state.router;
    const routerSaga = createRouterSaga(routerStateSelector, historyManager);

    const cookieStorage = new BrowserCookieStorage();
    const cookieSaga = createCookieSaga(cookieStorage);

    const formElementsSaga = createFormElementsFlow();

    const formSaga = createFormFlow();

    const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
    const authenticationSaga = createAuthenticationSaga(authStateSelector);

    const httpStateSelector: HttpStateSelector = (state: RootState) => state.http;
    const requestHandlingSaga = createRequestHandlingFlow(
        httpStateSelector,
        httpRequestDispatcher,
        authStateSelector,
        translatorStateSelector,
    );

    const routingSaga = createRoutingSaga();

    return function* rootSaga(): Generator {
        yield spawn(translatorSaga);
        yield spawn(toasterSaga);
        yield spawn(cookieSaga);
        yield spawn(formElementsSaga);
        yield spawn(formSaga);
        yield spawn(authenticationSaga);
        yield spawn(requestHandlingSaga);
        yield spawn(routerSaga);
        yield spawn(routingSaga);
    };
}

export function createDevAppServices(httpRequestDispatcher: HttpRequestDispatcher): AppServices {
    const history: History = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    const rootSaga = createRootSaga(history, httpRequestDispatcher);
    sagaMiddleware.run(rootSaga);
    return {
        store,
        history,
        httpRequestDispatcher,
    };
}

export function createProdAppServices(): AppServices {
    const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
    const history: History = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(rootReducer, applyMiddleware(sagaMiddleware));
    const rootSaga = createRootSaga(history, httpRequestDispatcher);
    sagaMiddleware.run(rootSaga);
    return {
        store,
        history,
        httpRequestDispatcher,
    };
}

export type RootState = {
  design: DesignState;
  translator: TranslatorState;
  toaster: ToasterState;
  http: HttpState;
  router: RouterState;
  routing: RoutingState;
  authentication: AuthState;
};

let currentServices: null | AppServices = null;
export function createHotReloadedDevAppServices(
    httpRequestDispatcher: HttpRequestDispatcher,
): AppServices {
    if (currentServices === null) {
        currentServices = createDevAppServices(httpRequestDispatcher);
        return currentServices;
    }
    return currentServices;
}
