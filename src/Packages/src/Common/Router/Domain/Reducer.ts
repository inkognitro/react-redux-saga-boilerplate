import { RouterState } from "./Types";
import { RouterEventTypes } from "./Event/Types";
import { RouterWasInitialized } from "./Event/RouterWasInitialized";
import { CurrentUrlWasChanged } from "./Event/CurrentUrlWasChanged";
import { RouterWasExtended } from "./Event/RouterWasExtended";

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
