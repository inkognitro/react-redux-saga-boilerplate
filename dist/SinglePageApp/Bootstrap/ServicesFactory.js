"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_saga_1 = __importDefault(require("redux-saga"));
const effects_1 = require("@redux-saga/core/effects");
const history_1 = require("history");
const Toaster_1 = require("Common/Domain/Toaster/Toaster");
const Reducer_1 = require("Common/Domain/Toaster/Event/Reducer");
const Translator_1 = require("Common/Domain/Translator/Translator");
const Reducer_2 = require("Common/Domain/Translator/Event/Reducer");
const Router_1 = require("Common/Domain/Router/Router");
const BrowserHistoryManager_1 = require("Common/Infrastructure/Router/BrowserHistoryManager");
const Cookie_1 = require("Common/Domain/Cookie/Cookie");
const BrowserCookieStorage_1 = require("Common/Infrastructure/Cookie/BrowserCookieStorage");
const Reducer_3 = require("Common/Domain/Router/Event/Reducer");
const Routing_1 = require("../Domain/Routing/Routing");
const Reducer_4 = require("Common/Domain/RequestHandling/Base/Http/Event/Reducer");
const RequestHandling_1 = require("Common/Domain/RequestHandling/RequestHandling");
const Reducer_5 = require("Common/Domain/Authentication/Event/Reducer");
const Authentication_1 = require("Common/Domain/Authentication/Authentication");
const Reducer_6 = require("Common/Domain/Design/Event/Reducer");
let currentServices = null;
function createHotReloadedAppServices(httpRequestDispatcher) {
    if (currentServices === null) {
        currentServices = createAppServices(httpRequestDispatcher);
        return currentServices;
    }
    return currentServices;
}
exports.createHotReloadedAppServices = createHotReloadedAppServices;
function createAppServices(httpRequestDispatcher) {
    const history = history_1.createBrowserHistory();
    const sagaMiddleware = redux_saga_1.default();
    const store = redux_1.createStore(rootReducer, redux_1.applyMiddleware(sagaMiddleware));
    const rootSaga = createRootSaga(history, httpRequestDispatcher);
    sagaMiddleware.run(rootSaga);
    return {
        store: store,
        history: history,
        httpRequestDispatcher: httpRequestDispatcher,
    };
}
exports.createAppServices = createAppServices;
const rootReducer = redux_1.combineReducers({
    design: Reducer_6.designReducer,
    translator: Reducer_2.translatorReducer,
    toaster: Reducer_1.toasterReducer,
    http: Reducer_4.httpReducer,
    router: Reducer_3.routerReducer,
    routing: Routing_1.routingReducer,
    authentication: Reducer_5.authenticationReducer,
});
function createRootSaga(history, httpRequestDispatcher) {
    const toasterStateSelector = (state) => state.toaster;
    const toasterSaga = Toaster_1.createToasterFlow(toasterStateSelector);
    const translatorStateSelector = (state) => state.translator;
    const translatorSaga = Translator_1.createTranslatorFlow(translatorStateSelector);
    const historyManager = new BrowserHistoryManager_1.BrowserHistoryManager(history);
    const routerStateSelector = (state) => state.router;
    const routerSaga = Router_1.createRouterFlow(routerStateSelector, historyManager);
    const cookieStorage = new BrowserCookieStorage_1.BrowserCookieStorage();
    const cookieSaga = Cookie_1.createCookieFlow(cookieStorage);
    const authStateSelector = (state) => state.authentication;
    const authenticationSaga = Authentication_1.createAuthenticationFlow(authStateSelector);
    const httpStateSelector = (state) => state.http;
    const requestHandlingSaga = RequestHandling_1.createRequestHandlingFlow(httpStateSelector, httpRequestDispatcher, authStateSelector, translatorStateSelector);
    const routingSaga = Routing_1.createRoutingSaga();
    return function* rootSaga() {
        yield effects_1.spawn(translatorSaga);
        yield effects_1.spawn(toasterSaga);
        yield effects_1.spawn(cookieSaga);
        yield effects_1.spawn(authenticationSaga);
        yield effects_1.spawn(requestHandlingSaga);
        yield effects_1.spawn(routerSaga);
        yield effects_1.spawn(routingSaga);
    };
}
//# sourceMappingURL=ServicesFactory.js.map