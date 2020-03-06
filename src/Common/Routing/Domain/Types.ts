import {RouteDefinitionWasAdded} from "Common/Routing/Domain/Events/RouteDefinitionWasAdded";

export type RoutingState = {
    routeDefinitions: RouteDefinition[],
};

export type RouteDefinition = {
    urlSchema: string,
    urlMustMatchExactly: boolean,
};

export enum RoutingEventTypes {
    ROUTE_DEFINITION_WAS_ADDED = 'ROUTE_DEFINITION_WAS_ADDED-6c0f7c81-d248-45a0-9813-187c90e42254',
    CURRENT_URL_WAS_CHANGED = 'CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254',
}

export type RoutingEvents = (RouteDefinitionWasAdded);