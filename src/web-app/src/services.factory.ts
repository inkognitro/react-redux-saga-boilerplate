import {
    applyMiddleware,
    combineReducers,
    createStore as createReduxStore,
    Reducer,
    Store,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import { createBrowserHistory, History } from "history";
import {
    ToasterState,
    ToasterStateSelector,
    toasterReducer,
    createToasterSaga,
    ToasterSettings,
} from "packages/common/toaster/domain";
import {
    TranslatorState,
    TranslatorStateSelector,
    createTranslatorSaga,
    translatorReducer,
} from "packages/common/translator/domain";
import { createCookieSaga } from "packages/common/cookie/domain";
import { BrowserCookieStorage } from "packages/common/cookie/infrastructure";
import {
    HttpFoundationState,
    HttpFoundationStateSelector,
    HttpRequestDispatcher,
    httpFoundationReducer,
    createHttpFoundationSaga,
} from "packages/common/http-foundation/domain";
import {
    AxiosHttpRequestDispatcher,
    MockHttpRequestDispatcher,
} from "packages/common/http-foundation/infrastructure";
import {
    AuthState,
    AuthStateSelector,
    authenticationReducer,
    createAuthenticationSaga,
} from "packages/common/authentication/domain";
import { designReducer, DesignState } from "packages/common/design/domain";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLoaderSaga, loaderReducer, LoaderState } from "packages/common/loader/domain";
import {
    createRoutingSaga,
    routingReducer,
    RoutingState,
    RoutingStateSelector,
} from "web-app/routing/domain";
import {
    createHttpApiV1Saga,
    httpApiV1Reducer,
    HttpApiV1State,
    HttpApiV1StateSelector,
} from "packages/common/http-api-v1/domain";
import { createHttpApiV1ToasterSaga } from "packages/common/http-api-v1-toaster/domain";
import { createFoundationSaga } from "web-app/foundation/domain/saga/flow";

type AppServices = {
    store: Store
    sagaTask: any
    history: History
    httpRequestDispatcher: HttpRequestDispatcher
};

export type RootState = {
    design: DesignState
    translator: TranslatorState
    loader: LoaderState
    toaster: ToasterState
    httpFoundation: HttpFoundationState
    httpApiV1: HttpApiV1State
    routing: RoutingState
    authentication: AuthState
};

function createRootReducer(): Reducer<RootState> {
    return combineReducers({
        design: designReducer,
        translator: translatorReducer,
        toaster: toasterReducer,
        httpFoundation: httpFoundationReducer,
        httpApiV1: httpApiV1Reducer,
        routing: routingReducer,
        authentication: authenticationReducer,
        loader: loaderReducer,
    });
}

function createRootSaga(httpRequestDispatcher: HttpRequestDispatcher): () => Generator {
    const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
    const toasterSettings: ToasterSettings = {
        asyncToastWaitingTimeInMs: 200,
        toastIntroAnimationTimeInMs: 800,
        toastOutroAnimationTimeInMs: 800,
        toastMessageIntroAnimationTimeInMs: 800,
        toastMessageOutroAnimationTimeInMs: 550,
    };
    const toasterSaga = createToasterSaga(toasterSettings, toasterStateSelector);
    const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
    const translatorSaga = createTranslatorSaga(translatorStateSelector);
    const loaderSaga = createLoaderSaga();
    const cookieStorage = new BrowserCookieStorage();
    const cookieSaga = createCookieSaga(cookieStorage);
    const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
    const authenticationSaga = createAuthenticationSaga(cookieStorage, authStateSelector);
    const httpFoundationStateSelector: HttpFoundationStateSelector = (state: RootState) => state.httpFoundation;
    const httpFoundationSaga = createHttpFoundationSaga(httpFoundationStateSelector, httpRequestDispatcher);
    const httpApiV1StateSelector: HttpApiV1StateSelector = (state: RootState) => state.httpApiV1;
    const httpApiV1Saga = createHttpApiV1Saga(httpApiV1StateSelector, authStateSelector);
    const httpApiV1ToasterSaga = createHttpApiV1ToasterSaga();
    const routingStateSelector: RoutingStateSelector = (state: RootState) => state.routing;
    const routingSaga = createRoutingSaga(routingStateSelector);
    const appFoundationSaga = createFoundationSaga();
    return function* rootSaga(): Generator {
        yield spawn(translatorSaga);
        yield spawn(loaderSaga);
        yield spawn(toasterSaga);
        yield spawn(cookieSaga);
        yield spawn(authenticationSaga);
        yield spawn(httpFoundationSaga);
        yield spawn(httpApiV1Saga);
        yield spawn(httpApiV1ToasterSaga);
        yield spawn(routingSaga);
        yield spawn(appFoundationSaga);
    };
}

export function createDevAppServices(currentServices?: AppServices): AppServices {
    if (currentServices) {
        currentServices.sagaTask.cancel();
    }
    const httpRequestDispatcher: HttpRequestDispatcher = new MockHttpRequestDispatcher();
    const history: History = (currentServices ? currentServices.history : createBrowserHistory());
    const sagaMiddleware = createSagaMiddleware();
    const initialState = (currentServices ? currentServices.store.getState() : undefined);
    const store = createReduxStore(
        createRootReducer(),
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );
    const rootSaga = createRootSaga(httpRequestDispatcher);
    const sagaTask = sagaMiddleware.run(rootSaga);
    return {
        store,
        sagaTask,
        history,
        httpRequestDispatcher,
    };
}

export function createProdAppServices(): AppServices {
    const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
    const history: History = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(createRootReducer(), applyMiddleware(sagaMiddleware));
    const rootSaga = createRootSaga(httpRequestDispatcher);
    const sagaTask = sagaMiddleware.run(rootSaga);
    return {
        store,
        sagaTask,
        history,
        httpRequestDispatcher,
    };
}

// @ts-ignore
window.hotReloadedServices = (window.hotReloadedServices ? window.hotReloadedServices : null);
export function createHotReloadedDevAppServices(): AppServices {
    // @ts-ignore
    if (window.hotReloadedServices === null) {
        // @ts-ignore
        window.hotReloadedServices = createDevAppServices();
        // @ts-ignore
        return window.hotReloadedServices;
    }
    // @ts-ignore
    window.hotReloadedServices = createDevAppServices(window.hotReloadedServices);
    // @ts-ignore
    return window.hotReloadedServices;
}
