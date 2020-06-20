import { put, select, takeEvery } from "redux-saga/effects";
import {
    Redirect,
    RouterState,
    RouterStateSelector,
} from "../../Types";
import { createRouterWasExtended } from "../../Event/RouterWasExtended";
import { findRedirectByExactRoute } from "../../Query/RedirectQuery";
import { ExtendRouter } from "../../Command/ExtendRouter";
import { RouterCommandTypes } from "../../Command/Types";

export function* handleExtendRouter(routerStateSelector: RouterStateSelector, command: ExtendRouter): Generator {
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
    if (redirectsToAdd.length === 0) {
        return;
    }
    yield put(createRouterWasExtended(redirectsToAdd));
}

export function* watchExtendRouterCommands(routerStateSelector: RouterStateSelector): Generator {
    yield takeEvery(RouterCommandTypes.EXTEND_ROUTER, handleExtendRouter, routerStateSelector);
}
