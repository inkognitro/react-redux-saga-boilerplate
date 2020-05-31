import { Event } from "Packages/Common/CommonTypes";
import { RouterEventTypes } from "../Types";

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
