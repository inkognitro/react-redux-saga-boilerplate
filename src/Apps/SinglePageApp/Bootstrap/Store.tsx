import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toasterReducer} from 'Common/ToasterOld/Domain/Event/Reducer';
import {requestHandlingReducer} from 'Common/RequestHandling/Domain/Event/Reducer';
import {authenticationReducer} from "Common/Authentication/Domain/Event/Reducer";
import {ReducerManager as RoutingReducerManager} from 'Common/Routing/Domain/Event/Reducer';
import {ToasterState} from "Common/ToasterOld/Domain/Types";
import {RequestHandlingState} from "Common/RequestHandling/Domain/Types";
import {RoutingState} from "Common/Routing/Domain/Types";
import {homeRouteReducer} from "SinglePageApp/Routing/Home/Home";
import createSagaMiddleware from 'redux-saga';
import {spawn} from "@redux-saga/core/effects";
import {toasterSaga} from "Common/ToasterOld/Domain/Toaster";
import {createBrowserHistory, History} from 'history';

export const browserHistory: History = createBrowserHistory();

function* rootSaga(): Generator {
    yield spawn(toasterSaga);
}

const routingReducerManager = new RoutingReducerManager([
    homeRouteReducer
]);

const storeReducer = combineReducers({
    toaster: toasterReducer,
    requestHandling: requestHandlingReducer,
    authentication: authenticationReducer,
    routing: routingReducerManager.reduce,
});

export type RootState<CurrentRouteState = any> = {
    toaster: ToasterState,
    requestHandling: RequestHandlingState,
    routing: RoutingState<CurrentRouteState>,
};

export function createStore(): Store {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(
        storeReducer,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga); //todo: return {sagaMiddleware, store} instead!
    return store;
}