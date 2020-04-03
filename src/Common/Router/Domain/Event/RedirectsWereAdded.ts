import {Redirect, RouterEventTypes} from "Common/Router/Domain/Types";
import {Event} from "Common/Bootstrap/Domain/Event";

export function createRedirectsWereAdded(redirects: Redirect[]): RedirectsWereAdded {
    return {
        type: RouterEventTypes.REDIRECTS_WERE_ADDED,
        payload: {
            redirects: redirects,
        }
    };
}

export type RedirectsWereAdded = Event<RouterEventTypes.REDIRECTS_WERE_ADDED, {
    redirects: Redirect[],
}>;