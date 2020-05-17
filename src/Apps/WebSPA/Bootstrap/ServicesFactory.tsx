import {
    applyMiddleware,
    combineReducers,
    createStore as createReduxStore,
    Store,
} from "redux";
import { RouterState, RouterStateSelector } from "Packages/Common/Domain/Router/Types";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import { createBrowserHistory, History } from "history";
import { createToasterSaga } from "Packages/Common/Domain/Toaster/Toaster";
import {
    ToasterState,
    ToasterStateSelector,
} from "Packages/Common/Domain/Toaster/Types";
import { toasterReducer } from "Packages/Common/Domain/Toaster/Reducer";
import {
    TranslatorState,
    TranslatorStateSelector,
} from "Packages/Common/Domain/Translator/Types";
import { createTranslatorSaga } from "Packages/Common/Domain/Translator/Translator";
import { translatorReducer } from "Packages/Common/Domain/Translator/Reducer";
import { createRouterSaga } from "Packages/Common/Domain/Router/Router";
import { BrowserHistoryManager } from "Packages/Common/Infrastructure/Router/BrowserHistoryManager";
import { createCookieSaga } from "Packages/Common/Domain/Cookie/Cookie";
import { BrowserCookieStorage } from "Packages/Common/Infrastructure/Cookie/BrowserCookieStorage";
import { routerReducer } from "Packages/Common/Domain/Router/Reducer";
import { httpReducer } from "Packages/Common/Domain/HttpFoundation/Reducer";
import {
    HttpFoundationState,
    HttpFoundationStateSelector,
} from "Packages/Common/Domain/HttpFoundation/Types";
import { createRequestHandlingSaga } from "Apps/WebSPA/Domain/RequestHandling/RequestHandling";
import {
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Domain/Authentication/Types";
import { authenticationReducer } from "Packages/Common/Domain/Authentication/Reducer";
import { HttpRequestDispatcher } from "Packages/Common/Domain/HttpFoundation/HttpRequestDispatcher";
import { createAuthenticationSaga } from "Packages/Common/Domain/Authentication/Authentication";
import { RoutingState } from "Apps/WebSPA/Domain/Routing/Types";
import { designReducer } from "Packages/Common/Domain/Design/Reducer";
import { DesignState } from "Packages/Common/Domain/Design/Types";
import { createFormElementsFlow } from "Packages/Common/Domain/FormElement/FormElements";
import { createFormFlow } from "Packages/Common/Domain/Form/Form";
import { createRoutingSaga, routingReducer } from "Apps/WebSPA/Domain/Routing/Routing";
import { composeWithDevTools } from 'redux-devtools-extension';
import { AxiosHttpRequestDispatcher } from "Packages/Common/Infrastructure/RequestHandling/AxiosHttpRequestDispatcher";
import { createLoaderSaga } from "Packages/Common/Domain/Loader/Loader";
import { loaderReducer } from "Packages/Common/Domain/Loader/Reducer";
import { LoaderState } from "Packages/Common/Domain/Loader/Types";

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
    loader: loaderReducer,
});

function createRootSaga(
    history: History,
    httpRequestDispatcher: HttpRequestDispatcher,
): () => Generator {
    const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
    const toasterSaga = createToasterSaga(toasterStateSelector);

    const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
    const translatorSaga = createTranslatorSaga(translatorStateSelector);

    const loaderSaga = createLoaderSaga();

    const historyManager = new BrowserHistoryManager(history);
    const routerStateSelector: RouterStateSelector = (state: RootState) => state.router;
    const routerSaga = createRouterSaga(routerStateSelector, historyManager);

    const cookieStorage = new BrowserCookieStorage();
    const cookieSaga = createCookieSaga(cookieStorage);

    const formElementsSaga = createFormElementsFlow();

    const formSaga = createFormFlow();

    const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
    const authenticationSaga = createAuthenticationSaga(authStateSelector);

    const httpFoundationStateSelector: HttpFoundationStateSelector = (state: RootState) => state.http;
    const requestHandlingSaga = createRequestHandlingSaga(
        httpFoundationStateSelector,
        httpRequestDispatcher,
        authStateSelector,
    );

    const routingSaga = createRoutingSaga();

    return function* rootSaga(): Generator {
        yield spawn(translatorSaga);
        yield spawn(loaderSaga);
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
  design: DesignState
  translator: TranslatorState
  loader: LoaderState
  toaster: ToasterState
  http: HttpFoundationState
  router: RouterState
  routing: RoutingState
  authentication: AuthState
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
