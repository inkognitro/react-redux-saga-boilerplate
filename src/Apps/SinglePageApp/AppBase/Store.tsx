import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toasterReducer} from 'Common/Toaster/Domain/Event/Reducer';
import {requestHandlingReducer} from 'Common/RequestHandling/Domain/Event/Reducer';
import {authenticationReducer} from "Common/Authentication/Domain/Event/Reducer";
import {ReducerManager as RoutingReducerManager} from 'Common/Routing/Domain/Event/Reducer';
import {ToasterState} from "Common/Toaster/Domain/Types";
import {RequestHandlingState} from "Common/RequestHandling/Domain/Types";
import {RoutingState} from "Common/Routing/Domain/Types";
import {homeRouteReducer} from "SinglePageApp/Routing/Home/Home";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "SinglePageApp/AppBase/RootSaga";

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
    sagaMiddleware.run(rootSaga);
    return store;
}