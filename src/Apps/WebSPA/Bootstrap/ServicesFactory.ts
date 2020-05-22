import {
    applyMiddleware,
    combineReducers,
    createStore as createReduxStore,
    Store,
} from "redux";
import { RouterState, RouterStateSelector } from "Packages/Common/Router/Domain/Types";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import { createBrowserHistory, History } from "history";
import {
    ToasterState,
    ToasterStateSelector,
} from "Packages/Common/Toaster/Domain/Types";
import { toasterReducer } from "Packages/Common/Toaster/Domain/Reducer";
import {
    TranslatorState,
    TranslatorStateSelector,
} from "Packages/Common/Translator/Domain/Types";
import { createTranslatorSaga } from "Packages/Common/Translator";
import { translatorReducer } from "Packages/Common/Translator/Domain/Reducer";
import { BrowserHistoryManager } from "Packages/Common/Router/Infrastructure/BrowserHistoryManager";
import { BrowserCookieStorage } from "Packages/Common/Cookie/Infrastructure/BrowserCookieStorage";
import { routerReducer } from "Packages/Common/Router/Domain/Reducer";
import { httpReducer } from "Packages/Common/HttpFoundation/Domain/Reducer";
import {
    HttpFoundationState,
    HttpFoundationStateSelector,
} from "Packages/Common/HttpFoundation/Domain/Types";
import { createRequestHandlingSaga } from "Apps/WebSPA/RequestHandling/Domain/RequestHandling";
import {
    AuthState,
    AuthStateSelector,
} from "Packages/Common/Authentication/Domain/Types";
import { authenticationReducer } from "Packages/Common/Authentication/Domain/Reducer";
import { HttpRequestDispatcher } from "Packages/Common/HttpFoundation/Domain/HttpRequestDispatcher";
import { createAuthenticationSaga } from "Packages/Common/Authentication/Domain/Authentication";
import { designReducer } from "Packages/Common/Design/Domain/Reducer";
import { DesignState } from "Packages/Common/Design/Domain/Types";
import { composeWithDevTools } from 'redux-devtools-extension';
import { AxiosHttpRequestDispatcher } from "Packages/Common/HttpFoundation/Infrastructure/AxiosHttpRequestDispatcher";
import { createLoaderSaga } from "Packages/Common/Loader/Domain/Loader";
import { loaderReducer } from "Packages/Common/Loader/Domain/Reducer";
import { LoaderState } from "Packages/Common/Loader/Domain/Types";
import {createRouterSaga} from "Packages/Common/Router/Domain/Saga/Flow";
import {createToasterSaga} from "Packages/Common/Toaster/Domain/Saga/Flow";
import {createRoutingSaga, routingReducer, RoutingState} from "Apps/WebSPA/Routing/HomePage/Domain";
import {createFormElementsFlow} from "Packages/Common/FormElement/Domain/Saga/Flow";
import {createFormFlow} from "Packages/Common/Form/Domain/Saga/Flow";
import {createCookieSaga} from "Packages/Common/Cookie/Domain/Saga/Flow";

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
