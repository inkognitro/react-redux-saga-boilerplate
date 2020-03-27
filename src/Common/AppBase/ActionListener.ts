import {Action, Dispatch, Middleware, Store} from "redux";

export interface ActionListener {
    getActionTypesToListen(): string[]
    handleAction(action: Action): void
}

export interface ActionListenerFactory<Services> {
    create(services: Services): ActionListener
}

export interface ServicesFactory<Services> {
    create(presetServices: Partial<Services>, store: Store): Services
}

export function createMiddleware<Services>(
    presetServices: Partial<Services>,
    servicesFactory: ServicesFactory<Services>,
    actionListenerFactories: ActionListenerFactory<Services>[]
): Middleware {
    return function initializeServices(store: Store) {
        const services = servicesFactory.create(presetServices, store);
        return function initializeActionListeners(next: Dispatch) {
            const actionListeners = actionListenerFactories.map(factory => factory.create(services));
            return function handleAction(action: Action) {
                actionListeners.forEach((listener) => {
                    if(listener.getActionTypesToListen().includes(action.type)) {
                        listener.handleAction(action);;
                    }
                });
                return next(action);
            }
        }
    }
}