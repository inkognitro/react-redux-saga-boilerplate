import {Action, Dispatch, Middleware, Store} from "redux";

export enum ListenerActionTypes {
    COMMAND = 'COMMAND-8ad4cdc4-7498-4187-8f47-4bd19867e3c1'
}

export interface ActionListener {
    getActionTypesToListen(): string[]
    handleAction(action: Action): void
}

export interface ActionListenerFactory<Services> {
    create(services: Services): ActionListener
}

export interface ServicesFactory<PresetServices, Services> {
    create(presetServices: PresetServices, store: Store): Services
}

export function createMiddleware<PresetServices, Services>(
    presetServices: PresetServices,
    servicesFactory: ServicesFactory<PresetServices, Services>,
    actionListenerFactories: ActionListenerFactory<Services>[]
): Middleware {
    return function initializeServices(store: Store) {
        const services = servicesFactory.create(presetServices, store);
        return function initializeActionListeners(next: Dispatch) {
            const actionListeners = actionListenerFactories.map(factory => factory.create(services));
            return function handleAction(action: Action) {
                actionListeners.forEach((actionListener) => actionListener.handleAction(action));
                return next(action);
            }
        }
    }
}