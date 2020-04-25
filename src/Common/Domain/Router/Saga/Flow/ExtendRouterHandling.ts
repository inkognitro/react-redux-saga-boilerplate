import {
    Redirect,
    Route,
    RouterCommandTypes,
    RouterState,
    RouterStateSelector,
} from "Common/Domain/Router/Types";
import { put, select, takeEvery } from "redux-saga/effects";
import { findRedirectByExactRoute } from "Common/Domain/Router/Query/RedirectQuery";
import { findStoredRoute } from "Common/Domain/Router/Query/RouteQuery";
import { createRouterWasExtended } from "Common/Domain/Router/Event/RouterWasExtended";
import { ExtendRouter } from "Common/Domain/Router/Commands/ExtendRouter";

export function createWatchExtendRouterFlow(
    routerStateSelector: RouterStateSelector,
): () => Generator {
    return function* (): Generator {
        yield takeEvery(RouterCommandTypes.EXTEND_ROUTER, function* (command: ExtendRouter): Generator {
            // @ts-ignore
            const routerState: RouterState = yield select(routerStateSelector);
            const redirectsToAdd: Redirect[] = [];
            for (const index in command.payload.redirects) {
                const redirect = command.payload.redirects[index];
                const storedRedirect = findRedirectByExactRoute(
                    routerState,
                    redirect.fromRoute,
                );
                if (storedRedirect) {
                    continue;
                }
                redirectsToAdd.push(redirect);
            }
            const routesToAdd: Route[] = [];
            for (const index in command.payload.routes) {
                const route = command.payload.routes[index];
                const storedRoute = findStoredRoute(routerState, route);
                if (storedRoute) {
                    continue;
                }
                routesToAdd.push(route);
            }
            if (redirectsToAdd.length === 0 && routesToAdd.length === 0) {
                return;
            }
            yield put(createRouterWasExtended(routesToAdd, redirectsToAdd));
        });
    };
}
