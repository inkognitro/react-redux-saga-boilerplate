import {RouterEventTypes} from "Common/Router/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createRouterWasInitialized(url: string): RouterWasInitialized {
    return {
        type: RouterEventTypes.ROUTER_WAS_INITIALIZED,
        payload: {
            url: url,
        }
    };
}

export type RouterWasInitialized = Event<RouterEventTypes.ROUTER_WAS_INITIALIZED, {
    url: string,
}>;