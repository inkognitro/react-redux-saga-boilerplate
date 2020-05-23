import {
    Redirect,
    Route,
    RouterCommandTypes,
} from "Packages/Common/Router/Domain/Types";
import {Command} from "Packages/Common/CommonTypes";

export function createExtendRouter(
    routes: Route[],
    redirects: Redirect[],
): ExtendRouter {
    return {
        type: RouterCommandTypes.EXTEND_ROUTER,
        payload: { routes, redirects },
    };
}

export type ExtendRouter = Command<RouterCommandTypes.EXTEND_ROUTER, {
    routes: Route[];
    redirects: Redirect[];
}>;
