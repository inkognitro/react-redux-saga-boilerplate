import {RouterCommandTypes} from "Common/Router/Domain/Router";
import {Redirect, Route, RouterState, RouterStateSelector} from "Common/Router/Domain/Types";
import {Command} from "Common/Bus/Domain/Command";
import {select, takeEvery, put} from "@redux-saga/core/effects";
import {findRedirectByExactRoute} from "Common/Router/Domain/Query/RedirectQuery";
import {createRouterWasExtended} from "Common/Router/Domain/Event/RouterWasExtended";
import {findStoredRoute} from "Common/Router/Domain/Query/RouteQuery";

export function createWatchExtendRouterSaga(routerStateSelector: RouterStateSelector): GeneratorFunction {
    return <GeneratorFunction>function* watchAddRedirects(): Generator {
        yield takeEvery(RouterCommandTypes.EXTEND_ROUTER, function* (command: ExtendRouter): Generator {
            //@ts-ignore
            const routerState: RouterState = yield select(routerStateSelector);
            let redirectsToAdd: Redirect[] = [];
            for(let index in command.payload.redirects) {
                const redirect = command.payload.redirects[index];
                const storedRedirect = findRedirectByExactRoute(routerState, redirect.fromRoute);
                if(storedRedirect) {
                    continue;
                }
                redirectsToAdd.push(redirect);
            }
            let routesToAdd: Route[] = [];
            for(let index in command.payload.routes) {
                const route = command.payload.routes[index];
                const storedRoute = findStoredRoute(routerState, route);
                if(storedRoute) {
                    continue;
                }
                routesToAdd.push(route);
            }
            if(redirectsToAdd.length === 0 && routesToAdd.length === 0) {
                return;
            }
            yield put(createRouterWasExtended(routesToAdd, redirectsToAdd));
        });
    }
}

export function createAddRedirects(routes: Route[], redirects: Redirect[]): ExtendRouter {
    return {
        type: RouterCommandTypes.EXTEND_ROUTER,
        payload: {routes, redirects}
    };
}

export type ExtendRouter = Command<RouterCommandTypes.EXTEND_ROUTER, {
    routes: Route[]
    redirects: Redirect[]
}>;