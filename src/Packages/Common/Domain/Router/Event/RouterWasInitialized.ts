import { RouterEventTypes } from "Packages/Common/Domain/Router/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createRouterWasInitialized(url: string): RouterWasInitialized {
    return {
        type: RouterEventTypes.ROUTER_WAS_INITIALIZED,
        payload: {
            url,
        },
    };
}

export type RouterWasInitialized = Event<RouterEventTypes.ROUTER_WAS_INITIALIZED, {
    url: string;
}>;
