import { Event } from "packages/entity/common-types";
import { Redirect } from "../Types";
import { RouterEventTypes } from "./Types";

export function createRouterWasExtended(redirects: Redirect[] = []): RouterWasExtended {
    return {
        type: RouterEventTypes.ROUTER_WAS_EXTENDED,
        payload: { redirects },
    };
}

export type RouterWasExtended = Event<RouterEventTypes.ROUTER_WAS_EXTENDED, {
    redirects: Redirect[];
}>;
