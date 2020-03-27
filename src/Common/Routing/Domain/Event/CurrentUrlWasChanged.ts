import {RoutingEventTypes} from "Common/Routing/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createCurrentUrlWasChanged(url: string): CurrentUrlWasChanged {
    return {
        type: RoutingEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: {
            url: url,
        }
    };
}

export type CurrentUrlWasChanged = Event<RoutingEventTypes.CURRENT_URL_WAS_CHANGED, {
    url: string,
}>;