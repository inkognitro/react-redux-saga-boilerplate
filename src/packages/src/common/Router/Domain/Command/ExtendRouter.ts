import { Command } from "packages/entity/common-types";
import { Redirect } from "../Types";
import { RouterCommandTypes } from "./Types";

export function createExtendRouter(redirects: Redirect[]): ExtendRouter {
    return {
        type: RouterCommandTypes.EXTEND_ROUTER,
        payload: { redirects },
    };
}

export type ExtendRouter = Command<RouterCommandTypes.EXTEND_ROUTER, {
    redirects: Redirect[];
}>;
