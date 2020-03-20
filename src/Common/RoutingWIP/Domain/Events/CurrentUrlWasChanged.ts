import {RoutingEventTypes} from "Common/RoutingWIP/Domain/Types";

export function createCurrentUrlWasChanged(url: string): CurrentUrlWasChanged {
    return {
        type: RoutingEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: {
            url: url,
        }
    };
}

export type CurrentUrlWasChanged = {
    type: RoutingEventTypes.CURRENT_URL_WAS_CHANGED,
    payload: {
        url: string,
    }
};