import {RoutingEventTypes} from "Common/Routing/Domain/Types";
import {Event} from "Common/AppBase/EventBus";

export function createUrlWasChanged(url: string): UrlWasChanged {
    return {
        type: RoutingEventTypes.URL_WAS_CHANGED,
        payload: {
            url: url,
        }
    };
}

export type UrlWasChanged = Event<RoutingEventTypes.URL_WAS_CHANGED, {
    url: string,
}>;