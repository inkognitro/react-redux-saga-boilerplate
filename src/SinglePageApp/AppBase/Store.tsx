import {applyMiddleware, combineReducers, createStore as createReduxStore, Store} from 'redux'
import {toaster} from 'Common/Toaster/Domain/Event/EventReducer';
import {ActionListenerFactory, createMiddleware} from "Common/AppBase/ActionListener";
import {AppServices, AppServicesFactory} from "SinglePageApp/AppBase/Services";
import {CommandActionListenerFactory} from "SinglePageApp/AppBase/CommandActionListenerFactory";

export function createStore(): Store {
    const actionListenerFactories: ActionListenerFactory<AppServices>[] = [
        new CommandActionListenerFactory(),
    ];
    const actionListenerMiddleware = createMiddleware(
        new AppServicesFactory(),
        actionListenerFactories
    );
    return createReduxStore(
        combineReducers({toaster}),
        applyMiddleware(actionListenerMiddleware)
    );
}