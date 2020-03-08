import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toaster} from 'Common/Toaster/Domain/Event/Reducer';
import {ActionListenerFactory, createMiddleware} from "Common/AppBase/ActionListener";
import {AppServices, AppServicesFactory, PresetAppServices} from "SinglePageApp/AppBase/ServiceComposition/AppServices";
import {CommandActionListenerFactory} from "SinglePageApp/AppBase/CommandActionListenerFactory";

const storeReducer = combineReducers({toaster});
export type RootState = ReturnType<typeof storeReducer>;

export function createStore(presetServices: PresetAppServices, servicesFactory: AppServicesFactory): Store {
    const actionListenerFactories: ActionListenerFactory<AppServices>[] = [
        new CommandActionListenerFactory(),
    ];
    const actionListenerMiddleware = createMiddleware(presetServices, servicesFactory, actionListenerFactories);
    return createReduxStore(
        storeReducer,
        applyMiddleware(actionListenerMiddleware)
    );
}