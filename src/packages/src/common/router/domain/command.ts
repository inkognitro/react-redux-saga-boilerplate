import { Command } from "packages/entity/common-types";
import { Redirect } from "./types";

export enum RouterCommandTypes {
    OPEN_URL = "OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4",
    EXTEND_ROUTER = "EXTEND_ROUTER-33ca8d0f-20f8-439e-b34f-fdd6859316c4",
}

export function createExtendRouter(redirects: Redirect[]): ExtendRouter {
    return {
        type: RouterCommandTypes.EXTEND_ROUTER,
        payload: { redirects },
    };
}

export type ExtendRouter = Command<RouterCommandTypes.EXTEND_ROUTER, {
    redirects: Redirect[];
}>;

export function createOpenUrl(settings: OpenUrlSettings): OpenUrl {
    return {
        type: RouterCommandTypes.OPEN_URL,
        payload: settings,
    };
}

export type OpenUrl = Command<RouterCommandTypes.OPEN_URL, OpenUrlSettings>;
export type OpenUrlSettings = {
    url: string
    target?: string
    shouldReplaceCurrentUrl?: boolean
};
