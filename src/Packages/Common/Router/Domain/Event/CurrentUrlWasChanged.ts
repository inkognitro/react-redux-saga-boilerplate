import { RouterEventTypes } from "Packages/Common/Router/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createCurrentUrlWasChanged(url: string): CurrentUrlWasChanged {
    return {
        type: RouterEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: {
            url,
        },
    };
}

export type CurrentUrlWasChanged = Event<RouterEventTypes.CURRENT_URL_WAS_CHANGED, {
    url: string;
}>;
