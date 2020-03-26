import {Route, RoutingState, RoutingStateSelector} from "Common/Routing/Domain/Types";
import {isUrlMatchingRoute} from "Common/Routing/Domain/Query/UrlMatchesRouteQuery";

export function findRouteByUrl(state: RoutingState, url: string): (null | Route) {
    for(let index in state.routes) {
        const route = state.routes[index];
        if(isUrlMatchingRoute(url, route)) {
            return route;
        }
    }
    return null;
}

export class RouteByUrlQuery {
    private readonly getRoutingState: RoutingStateSelector;

    constructor(getRoutingState: RoutingStateSelector) {
        this.getRoutingState = getRoutingState;
    }

    public find(url: string): (null | Route) {
        return findRouteByUrl(this.getRoutingState(), url);
    }
}