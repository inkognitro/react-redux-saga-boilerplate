import {RouteDefinition, RoutingEventTypes} from "Common/RoutingWIP/Domain/Types";

export function createRouteDefinitionWasAdded(routeDefinition: RouteDefinition): RouteDefinitionWasAdded {
    return {
        type: RoutingEventTypes.ROUTE_DEFINITION_WAS_ADDED,
        payload: {
            routeDefinition: routeDefinition,
        }
    };
}

export type RouteDefinitionWasAdded = {
    type: RoutingEventTypes.ROUTE_DEFINITION_WAS_ADDED,
    payload: {
        routeDefinition: RouteDefinition,
    }
};