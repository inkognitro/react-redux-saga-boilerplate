import { Event } from "packages/entity/common-types";
import { Redirect } from "./types";

export enum RouterEventTypes {
    ROUTER_WAS_INITIALIZED = "ROUTER_WAS_INITIALIZED-6c0f7c81-d248-45a0-9813-187c90e42254",
    CURRENT_URL_WAS_CHANGED = "CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254",
    ROUTER_WAS_EXTENDED = "ROUTER_WAS_EXTENDED-6c0f7c81-d248-45a0-9813-187c90e42254",
}

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

export function createRouterWasExtended(redirects: Redirect[] = []): RouterWasExtended {
    return {
        type: RouterEventTypes.ROUTER_WAS_EXTENDED,
        payload: { redirects },
    };
}

export type RouterWasExtended = Event<RouterEventTypes.ROUTER_WAS_EXTENDED, {
    redirects: Redirect[];
}>;

export function createCurrentUrlWasChanged(url: string): CurrentUrlWasChanged {
    return {
        type: RouterEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: { url },
    };
}

export type CurrentUrlWasChanged = Event<RouterEventTypes.CURRENT_URL_WAS_CHANGED, {
    url: string;
}>;
