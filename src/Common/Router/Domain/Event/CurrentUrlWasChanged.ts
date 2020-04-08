import {RouterEventTypes} from "Common/Router/Domain/Types";
import {Event} from "Common/Bus/Domain/Event";

export function createCurrentUrlWasChanged(url: string): CurrentUrlWasChanged {
    return {
        type: RouterEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: {
            url: url,
        }
    };
}

export type CurrentUrlWasChanged = Event<RouterEventTypes.CURRENT_URL_WAS_CHANGED, {
    url: string,
}>;