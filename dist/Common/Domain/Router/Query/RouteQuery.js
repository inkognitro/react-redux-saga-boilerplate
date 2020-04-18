"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlMatchesRouteQuery_1 = require("Common/Domain/Router/Query/UrlMatchesRouteQuery");
function findRouteByUrl(state, url) {
    for (let index in state.routes) {
        const route = state.routes[index];
        if (UrlMatchesRouteQuery_1.isUrlMatchingRoute(url, route)) {
            return route;
        }
    }
    return null;
}
exports.findRouteByUrl = findRouteByUrl;
function findStoredRoute(state, route) {
    for (let index in state.routes) {
        const storedRoute = state.routes[index];
        if (storedRoute.urlMustMatchExactly === route.urlMustMatchExactly && storedRoute.urlSchema === route.urlSchema) {
            return route;
        }
    }
    return null;
}
exports.findStoredRoute = findStoredRoute;
//# sourceMappingURL=RouteQuery.js.map