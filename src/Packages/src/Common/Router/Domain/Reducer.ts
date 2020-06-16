import {
    RouterEvent,
    RouterEventTypes,
    RouterState,
} from "./Types";

const initialRouterState: RouterState = {
    redirects: [],
};

export function routerReducer(
    state: RouterState = initialRouterState,
    event?: RouterEvent,
): RouterState {
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
