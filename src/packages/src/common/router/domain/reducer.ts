import { RouterState } from "./types";
import {
    CurrentUrlWasChanged,
    RouterEventTypes,
    RouterWasExtended,
    RouterWasInitialized,
} from "./event";

type RouterEvent = (RouterWasInitialized | CurrentUrlWasChanged | RouterWasExtended)

const initialRouterState: RouterState = {
    redirects: [],
};

export function routerReducer(state: RouterState = initialRouterState, event?: RouterEvent): RouterState {
    if (!event) {
        return state;
    }
    if (event.type === RouterEventTypes.ROUTER_WAS_EXTENDED) {
        return {
            ...state,
            redirects: [...state.redirects, ...event.payload.redirects],
        };
    }
    return state;
}
