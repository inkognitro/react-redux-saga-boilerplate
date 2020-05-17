import {
    Redirect,
    Route,
    RouterCommandTypes,
} from "Packages/Common/Domain/Router/Types";
import { Command } from "Packages/Common/Domain/Bus/Command";

export function createAddRedirects(
    routes: Route[],
    redirects: Redirect[],
): ExtendRouter {
    return {
        type: RouterCommandTypes.EXTEND_ROUTER,
        payload: { routes, redirects },
    };
}

export type ExtendRouter = Command<
  RouterCommandTypes.EXTEND_ROUTER,
  {
    routes: Route[];
    redirects: Redirect[];
  }
>;
