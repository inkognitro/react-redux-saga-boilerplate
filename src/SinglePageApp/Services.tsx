import {applyMiddleware, combineReducers, createStore, Store} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Domain/HttpRequestHandling/Reducer';
import {auth} from 'Common/Auth/Domain/Reducer';
import {toaster} from 'Common/Toaster/Domain/Events/Reducer';
import {cache} from './EntityCache/Domain/Reducer';
import {routing} from 'Common/Routing/Domain/EventReducer';
import thunkMiddleware from 'redux-thunk';
import {
    HttpRequestManager,
    HttpRequestManagerInterface, HttpRequestDispatcherInterface
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AxiosHttpRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosHttpRequestDispatcher";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import {BrowserCookieStorage} from "Common/CookieHandling/Infrastructure/BrowserCookieStorage";
import {UserRepository, UserRepositoryInterface} from "Common/EntityCache/Domain/User/UserRepository";
import {AuthManager, AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {ApiAuthBackendService} from "Common/Auth/Infrastructure/ApiAuthBackendService";
import {AppServices} from "SinglePageApp/App";
import {CookieStorageInterface} from "Common/CookieHandling/Domain/CookieStorage";
import {createToasterMiddleware} from "Common/Toaster/Domain/ToasterMiddleware";
import {createCommandBusMiddleware} from "Common/Routing/Domain/RoutingMiddleware";

function addStoreService(services: Services): void {
    if(services.store) {
        return;
    }
    services.store = createStore(
        combineReducers({requestHandling, auth, cache, toaster, routing}),
        applyMiddleware(
            createCommandBusMiddleware(),
            createToasterMiddleware(),
            thunkMiddleware
        )
    );
}

function addHttpRequestDispatcherService(services: Services): void {
    if(services.httpRequestDispatcher) {
        return;
    }
    services.httpRequestDispatcher = new AxiosHttpRequestDispatcher();
}

function addHttpRequestManagerService(services: Services): void {
    if(services.httpRequestManager) {
        return;
    }
    const store = services.store;
    if(!store) {
        throw new Error('services.store must be defined!');
    }
    const httpRequestDispatcher = services.httpRequestDispatcher;
    if(!httpRequestDispatcher) {
        throw new Error('services.httpRequestDispatcher must be defined!');
    }
    services.httpRequestManager = new HttpRequestManager(
        () => store.getState().requestHandling,
        store.dispatch,
        httpRequestDispatcher
    );
}

function addApiHttpRequestManagerService(services: Services): void {
    if(services.apiHttpRequestManager) {
        return;
    }
    const httpRequestManager = services.httpRequestManager;
    if(!httpRequestManager) {
        throw new Error('services.httpRequestManager must be defined!');
    }
    services.apiHttpRequestManager = new ApiHttpRequestManager(httpRequestManager);
}

function addUserRepositoryService(services: Services): void {
    if(services.userRepository) {
        return;
    }
    const store = services.store;
    if(!store) {
        throw new Error('services.store must be defined!');
    }
    services.userRepository = new UserRepository(
        store.dispatch,
        () => store.getState().cache.userRepository
    );
}

function addCookieStorageService(services: Services): void {
    if(services.cookieStorage) {
        return;
    }
    services.cookieStorage = new BrowserCookieStorage();
}

function addAuthManagerService(services: Services): void {
    if(services.authManager) {
        return;
    }
    const store = services.store;
    if(!store) {
        throw new Error('services.store must be defined!');
    }
    const userRepository = services.userRepository;
    if(!userRepository) {
        throw new Error('services.userRepository must be defined!');
    }
    const cookieStorage = services.cookieStorage;
    if(!cookieStorage) {
        throw new Error('services.cookieStorage must be defined!');
    }
    const apiHttpRequestManager = services.apiHttpRequestManager;
    if(!apiHttpRequestManager) {
        throw new Error('services.apiHttpRequestManager must be defined!');
    }
    services.authManager = new AuthManager(
        store.dispatch,
        () => store.getState().auth,
        userRepository,
        cookieStorage,
        new ApiAuthBackendService(apiHttpRequestManager)
    );
}

export type Services = {
    store?: Store,
    authManager?: AuthManagerInterface,
    httpRequestManager?: HttpRequestManagerInterface,
    apiHttpRequestManager?: ApiHttpRequestManager,
    userRepository?: UserRepositoryInterface,
    cookieStorage?: CookieStorageInterface,
    httpRequestDispatcher?: HttpRequestDispatcherInterface,
}

export function createProdAppServices(): AppServices {
    let services = {};
    return createWithMissingProdAppServices(services);
}

export function createWithMissingProdAppServices(services: Services): AppServices {
    addStoreService(services);
    addHttpRequestDispatcherService(services);
    addCookieStorageService(services);
    addHttpRequestManagerService(services);
    addApiHttpRequestManagerService(services);
    addUserRepositoryService(services);
    addAuthManagerService(services);
    if(
        !services.store
        || !services.authManager
        || !services.apiHttpRequestManager
        || !services.httpRequestManager
    ) {
        throw new Error('Some properties of the services variable are missing!');
    }
    return {
        store: services.store,
        httpRequestManager: services.httpRequestManager,
        apiHttpRequestManager: services.apiHttpRequestManager,
        authManager: services.authManager,
    };
}