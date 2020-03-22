import {Route, RoutingEventTypes} from "Common/Routing/Domain/Types";
import {Event} from "Common/AppBase/EventBus";

export function createRouteWasAdded(route: Route): RouteWasAdded {
    return {
        type: RoutingEventTypes.ROUTE_WAS_ADDED,
        payload: {
            route: route,
        }
    };
}

export type RouteWasAdded = Event<RoutingEventTypes.ROUTE_WAS_ADDED, {
    route: Route,
}>;