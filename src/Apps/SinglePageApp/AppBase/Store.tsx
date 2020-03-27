import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toasterReducer} from 'Common/Toaster/Domain/Event/Reducer';
import {requestHandlingReducer} from 'Common/RequestHandling/Domain/Event/Reducer';
import {authenticationReducer} from "Common/Authentication/Domain/Event/Reducer";
import {ReducerManager as RoutingReducerManager} from 'Common/Routing/Domain/Event/Reducer';
import {ActionListenerFactory, createMiddleware} from "Common/AppBase/ActionListener";
import {AppServices, AppServicesFactory} from "./ServiceFactories/AppServices";
import {CommandActionListenerFactory} from "./ServiceFactories/CommandActionListenerFactory";
import {EventActionListenerFactory} from "./ServiceFactories/EventActionListenerFactory";
import {ToasterState} from "Common/Toaster/Domain/Types";
import {RequestHandlingState} from "Common/RequestHandling/Domain/Types";
import {RoutingState} from "Common/Routing/Domain/Types";
import {homeRouteReducer} from "SinglePageApp/Routing/Home/Home";

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

export function createStore(
    servicesFactory: AppServicesFactory,
    presetServices?: Partial<AppServices>,
): Store {
    const actionListenerFactories: ActionListenerFactory<AppServices>[] = [
        new CommandActionListenerFactory(),
        new EventActionListenerFactory(),
    ];
    const partialServices = (presetServices ? presetServices : {});
    const actionListenerMiddleware = createMiddleware(partialServices, servicesFactory, actionListenerFactories);
    return createReduxStore(
        storeReducer,
        applyMiddleware(actionListenerMiddleware)
    );
}