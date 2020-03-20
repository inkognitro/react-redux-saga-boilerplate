import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toaster} from 'Common/Toaster/Domain/Event/Reducer';
import {requestHandling} from 'Common/RequestHandling/Domain/Event/Reducer';
import {ActionListenerFactory, createMiddleware} from "Common/AppBase/ActionListener";
import {AppServices, AppServicesFactory, AppPresetServicesFactory} from "./ServiceFactories/AppServices";
import {CommandActionListenerFactory} from "./ServiceFactories/CommandActionListenerFactory";
import {EventActionListenerFactory} from "./ServiceFactories/EventActionListenerFactory";

const storeReducer = combineReducers({toaster, requestHandling});
export type RootState = ReturnType<typeof storeReducer>;

export function createStore(
    presetServicesFactory: AppPresetServicesFactory,
    servicesFactory: AppServicesFactory
): Store {
    const actionListenerFactories: ActionListenerFactory<AppServices>[] = [
        new CommandActionListenerFactory(),
        new EventActionListenerFactory(),
    ];
    const actionListenerMiddleware = createMiddleware(presetServicesFactory, servicesFactory, actionListenerFactories);
    return createReduxStore(
        storeReducer,
        applyMiddleware(actionListenerMiddleware)
    );
}