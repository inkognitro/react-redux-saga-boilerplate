import { Redirect, RouterEventTypes } from "Packages/Common/Router/Domain/Types";
import { Event } from "Packages/Entity/CommonTypes";

export function createRouterWasExtended(redirects: Redirect[] = []): RouterWasExtended {
    return {
        type: RouterEventTypes.ROUTER_WAS_EXTENDED,
        payload: { redirects },
    };
}

export type RouterWasExtended = Event<RouterEventTypes.ROUTER_WAS_EXTENDED, {
    redirects: Redirect[];
}>;
