import {applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Domain/HttpRequestHandling/Reducer';
import {auth} from 'Common/Auth/Domain/Reducer';
import {toaster} from 'Common/Toaster/Domain/Reducer';
import {cache} from './EntityCache/Domain/Reducer';
import thunkMiddleware from 'redux-thunk';
import {
    HttpRequestManager,
    HttpRequestManagerInterface
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import {AxiosRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosRequestDispatcher";
import {ToastRepository, ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";
import {ApiHttpRequestManager} from "Common/RequestHandling/Domain/ApiHttpRequestManager";
import {BrowserCookieStorage} from "Common/CookieHandling/Infrastructure/BrowserCookieStorage";
import {UserRepository} from "Common/EntityCache/Domain/User/UserRepository";
import {AuthManager} from "Common/Auth/Domain/AuthManager";
import {ApiAuthBackendService} from "Common/Auth/Infrastructure/ApiAuthBackendService";
import {Services} from "SinglePageApp/App";

const store = createStore(
    combineReducers({requestHandling, auth, cache, toaster}),
    applyMiddleware(thunkMiddleware)
);

const httpRequestManager: HttpRequestManagerInterface = new HttpRequestManager(
    () => store.getState().requestHandling,
    store.dispatch,
    new AxiosRequestDispatcher()
);

const toastRepository: ToastRepositoryInterface = new ToastRepository(
    store.dispatch,
    () => store.getState().toaster
);

const apiHttpRequestManager: ApiHttpRequestManager = new ApiHttpRequestManager(
    httpRequestManager,
    toastRepository,
);

const userRepository = new UserRepository(store.dispatch, () => store.getState().cache.userRepository);

const cookieStorage = new BrowserCookieStorage();

const authManager = new AuthManager(
    store.dispatch,
    () => store.getState().auth,
    userRepository,
    cookieStorage,
    new ApiAuthBackendService(apiHttpRequestManager)
);

export const services: Services = {
    store: store,
    authManager: authManager,
    httpRequestManager: httpRequestManager,
    toastRepository: toastRepository,
};