import { Redirect, Route, RouterEventTypes } from "Common/Domain/Router/Types";
import { Event } from "Common/Domain/Bus/Event";

export function createRouterWasExtended(
    routes: Route[],
    redirects: Redirect[] = [],
): RouterWasExtended {
    return {
        type: RouterEventTypes.ROUTER_WAS_EXTENDED,
        payload: { routes, redirects },
    };
}

export type RouterWasExtended = Event<
  RouterEventTypes.ROUTER_WAS_EXTENDED,
  {
    routes: Route[];
    redirects: Redirect[];
  }
>;
