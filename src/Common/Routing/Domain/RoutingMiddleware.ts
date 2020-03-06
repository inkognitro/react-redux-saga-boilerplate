import {Action, Dispatch, Middleware, Store} from 'redux';
import {handleOpenUrl} from "Common/Routing/Domain/Commands/OpenUrl";
import {handleReplaceCurrentUrl} from "Common/Routing/Domain/Commands/ReplaceCurrentUrl";

export enum CommandActionTypes {
    ADD_ROUTE_DEFINITION = 'ADD_ROUTE_DEFINITION-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
    OPEN_URL = 'OPEN_URL-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
    REPLACE_CURRENT_URL = 'REPLACE_CURRENT_URL-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
}


export function createCommandBusMiddleware(): Middleware {

    console.log('createCommandBusMiddleware');

    return function commandBus(store: Store) {

        console.log('initialize commandBus');

        return function allHandlers(next: Dispatch) {

            console.log('initialize allHandlers');

            return function someHandler(action: Action) {

                console.log('pass action down to someHandler', action);

                let result = next(action);

                console.log('next state', store.getState());

                return result;
            }
        }
    }
}

export function createRoutingMiddleware(historyManager: HistoryManager): Middleware {
    historyManager.addCurrentRouteUrlWasChangedListener((url: string) => {
        console.log('url was changed to ' + url); //todo: dispatch event
    });
    return _ => next => action => {
        if (!action) {
            return;
        }

        if(action.type === CommandActionTypes.OPEN_URL) {
            handleOpenUrl(action.payload);
            return;
        }

        if(action.type === CommandActionTypes.REPLACE_CURRENT_URL) {
            handleReplaceCurrentUrl(action.payload);
            return;
        }

        return next(action);
    };
}

export interface HistoryManager {
    setCurrentRouteUrl(routeUrl: string): void
    replaceCurrentRouteUrl(routeUrl: string): void
    addCurrentRouteUrlWasChangedListener(onChangeCurrentRouteUrl: (url: string) => void): void
}