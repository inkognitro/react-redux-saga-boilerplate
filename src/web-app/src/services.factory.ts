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
import { designReducer, DesignState, DesignStateSelector } from "packages/common/design/domain";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLoaderSaga, loaderReducer, LoaderState } from "packages/common/loader/domain";
import {
    createHttpApiV1Saga,
    httpApiV1Reducer,
    HttpApiV1State,
    HttpApiV1StateSelector,
} from "packages/common/http-api-v1/domain";
import { createHttpApiV1ToasterSaga } from "packages/common/http-api-v1-toaster/domain";
import { pagesReducer, PagesState } from "web-app/pages/services";
import { BrowserCurrentUserStorage } from "packages/common/authentication/infrastructure";

export type AppServices = {
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
    authentication: AuthState
    pages: PagesState
};

function createRootReducer(): Reducer<RootState> {
    return combineReducers({
        design: designReducer,
        translator: translatorReducer,
        loader: loaderReducer,
        toaster: toasterReducer,
        httpFoundation: httpFoundationReducer,
        httpApiV1: httpApiV1Reducer,
        authentication: authenticationReducer,
        pages: pagesReducer,
    });
}

export const authStateSelector: AuthStateSelector = (state: RootState) => state.authentication;
export const translatorStateSelector: TranslatorStateSelector = (state: RootState) => state.translator;
export const designStateSelector: DesignStateSelector = (state: RootState) => state.design;

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
    const translatorSaga = createTranslatorSaga(translatorStateSelector);
    const loaderSaga = createLoaderSaga();
    const currentUserStorage = new BrowserCurrentUserStorage();
    const authenticationSaga = createAuthenticationSaga(authStateSelector, currentUserStorage);
    const httpFoundationStateSelector: HttpFoundationStateSelector = (state: RootState) => state.httpFoundation;
    const httpFoundationSaga = createHttpFoundationSaga(httpFoundationStateSelector, httpRequestDispatcher);
    const httpApiV1StateSelector: HttpApiV1StateSelector = (state: RootState) => state.httpApiV1;
    const httpApiV1Saga = createHttpApiV1Saga(httpApiV1StateSelector, authStateSelector);
    const httpApiV1ToasterSaga = createHttpApiV1ToasterSaga();
    return function* rootSaga(): Generator {
        yield spawn(translatorSaga);
        yield spawn(loaderSaga);
        yield spawn(toasterSaga);
        yield spawn(authenticationSaga);
        yield spawn(httpFoundationSaga);
        yield spawn(httpApiV1Saga);
        yield spawn(httpApiV1ToasterSaga);
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
