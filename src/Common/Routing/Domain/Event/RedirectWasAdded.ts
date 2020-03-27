import {Redirect, RoutingEventTypes} from "Common/Routing/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createRedirectWasAdded(redirect: Redirect): RedirectWasAdded {
    return {
        type: RoutingEventTypes.REDIRECT_WAS_ADDED,
        payload: {
            redirect: redirect,
        }
    };
}

export type RedirectWasAdded = Event<RoutingEventTypes.REDIRECT_WAS_ADDED, {
    redirect: Redirect,
}>;