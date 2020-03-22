import {Route, RoutingState, RoutingStateSelector} from "Common/Routing/Domain/Types";
import {isUrlMatching} from "Common/Routing/Domain/Router";

export function findRouteByUrl(state: RoutingState, url: string): (null | Route) {
    for(let index in state.routes) {
        const route = state.routes[index];
        if(isUrlMatching(route, url)) {
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