import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toaster} from 'Common/Toaster/Domain/Event/Reducer';
import {ActionListenerFactory, createMiddleware} from "Common/AppBase/ActionListener";
import {AppServices, AppServicesFactory, AppPresetServicesFactory} from "SinglePageApp/AppBase/ServiceFactories/AppServices";
import {CommandActionListenerFactory} from "SinglePageApp/AppBase/ServiceFactories/CommandActionListenerFactory";

const storeReducer = combineReducers({toaster});
export type RootState = ReturnType<typeof storeReducer>;

export function createStore(
    presetServicesFactory: AppPresetServicesFactory,
    servicesFactory: AppServicesFactory
): Store {
    const actionListenerFactories: ActionListenerFactory<AppServices>[] = [
        new CommandActionListenerFactory(),
    ];
    const actionListenerMiddleware = createMiddleware(presetServicesFactory, servicesFactory, actionListenerFactories);
    return createReduxStore(
        storeReducer,
        applyMiddleware(actionListenerMiddleware)
    );
}