import {Store} from "redux";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {
    AppServices,
    AppServicesFactory,
} from "./AppServices";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";
import {createBrowserHistory} from 'history';
import {Router} from "Common/Routing/Domain/Router";
import {ByRedirectInfluencedUrlQuery} from "Common/Routing/Domain/Query/ByRedirectInfluencedUrlQuery";
import {RoutingState} from "Common/Routing/Domain/Types";
import {RootState} from "SinglePageApp/AppBase/Store";
import {BrowserHistoryManager} from "Common/Routing/Infrastructure/BrowserHistoryManager";

export const prodPresetServices: Partial<AppServices> = {
    history: createBrowserHistory(),
};

export class ProdAppServicesFactory implements AppServicesFactory {
    create(presetServices: Partial<AppServices>, store: Store): AppServices {
        let partialAppServices = {...presetServices};
        partialAppServices = {...partialAppServices, commandBus: createCommandBus(partialAppServices, store)};
        partialAppServices = {...partialAppServices, eventBus: createEventBus(partialAppServices, store)};
        partialAppServices = {...partialAppServices, toaster: createToaster(partialAppServices)};
        partialAppServices = {...partialAppServices, router: createRouter(partialAppServices, store)};
        //@ts-ignore
        return partialAppServices;
    }
}

function createRouter(presetServices: Partial<AppServices>, store: Store<RootState>): Router {
    if(presetServices.router) {
        return presetServices.router;
    }
    const eventBus = presetServices.eventBus;
    if(!eventBus) {
        throw new Error('eventBus must already be initialized!');
    }
    const history = presetServices.history;
    if(!history) {
        throw new Error('history must already be initialized!');
    }
    const getRoutingState = (): RoutingState => store.getState().routing;
    const byRedirectInfluencedUrlQuery = new ByRedirectInfluencedUrlQuery(getRoutingState);
    const browserHistoryManager = new BrowserHistoryManager(history);
    return new Router(eventBus, byRedirectInfluencedUrlQuery, browserHistoryManager);
}

function createToaster(presetServices: Partial<AppServices>): Toaster {
    if(presetServices.toaster) {
        return presetServices.toaster;
    }
    const eventBus = presetServices.eventBus;
    if(!eventBus) {
        throw new Error('eventBus must already be initialized!');
    }
    return new Toaster(eventBus);
}

function createCommandBus(presetServices: Partial<AppServices>, store: Store): CommandBus {
    if(presetServices.commandBus) {
        return presetServices.commandBus;
    }
    return new CommandBus(store.dispatch);
}

function createEventBus(presetServices: Partial<AppServices>, store: Store): EventBus {
    if(presetServices.eventBus) {
        return presetServices.eventBus;
    }
    return new EventBus(store.dispatch);
}