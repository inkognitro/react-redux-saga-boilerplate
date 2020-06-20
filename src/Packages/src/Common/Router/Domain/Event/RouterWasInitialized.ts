import { Event } from "Packages/Entity/CommonTypes";
import { RouterEventTypes } from "./Types";

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
