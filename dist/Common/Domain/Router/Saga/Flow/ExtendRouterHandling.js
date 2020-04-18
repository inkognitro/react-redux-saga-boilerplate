"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
const effects_1 = require("@redux-saga/core/effects");
const RedirectQuery_1 = require("Common/Domain/Router/Query/RedirectQuery");
const RouteQuery_1 = require("Common/Domain/Router/Query/RouteQuery");
const RouterWasExtended_1 = require("Common/Domain/Router/Event/RouterWasExtended");
function createWatchExtendRouterFlow(routerStateSelector) {
    return function* () {
        yield effects_1.takeEvery(Types_1.RouterCommandTypes.EXTEND_ROUTER, function* (command) {
            const routerState = yield effects_1.select(routerStateSelector);
            let redirectsToAdd = [];
            for (let index in command.payload.redirects) {
                const redirect = command.payload.redirects[index];
                const storedRedirect = RedirectQuery_1.findRedirectByExactRoute(routerState, redirect.fromRoute);
                if (storedRedirect) {
                    continue;
                }
                redirectsToAdd.push(redirect);
            }
            let routesToAdd = [];
            for (let index in command.payload.routes) {
                const route = command.payload.routes[index];
                const storedRoute = RouteQuery_1.findStoredRoute(routerState, route);
                if (storedRoute) {
                    continue;
                }
                routesToAdd.push(route);
            }
            if (redirectsToAdd.length === 0 && routesToAdd.length === 0) {
                return;
            }
            yield effects_1.put(RouterWasExtended_1.createRouterWasExtended(routesToAdd, redirectsToAdd));
        });
    };
}
exports.createWatchExtendRouterFlow = createWatchExtendRouterFlow;
//# sourceMappingURL=ExtendRouterHandling.js.map