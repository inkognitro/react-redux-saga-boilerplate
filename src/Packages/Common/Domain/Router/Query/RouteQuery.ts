import { Route, RouterState } from "Packages/Common/Domain/Router/Types";
import { isUrlMatchingRoute } from "Packages/Common/Domain/Router/Query/UrlMatchesRouteQuery";

export function findRouteByUrl(state: RouterState, url: string): null | Route {
    for (const index in state.routes) {
        const route = state.routes[index];
        if (isUrlMatchingRoute(url, route)) {
            return route;
        }
    }
    return null;
}

export function findStoredRoute(
    state: RouterState,
    route: Route,
): null | Route {
    for (const index in state.routes) {
        const storedRoute = state.routes[index];
        if (
            storedRoute.urlMustMatchExactly === route.urlMustMatchExactly
      && storedRoute.urlSchema === route.urlSchema
        ) {
            return route;
        }
    }
    return null;
}
