import {RouterEvent, RouterEventTypes, RouterState} from "Common/Router/Domain/Types";

const initialRouterState: RouterState = {
    redirects: [],
    routes: [],
};

export function routerReducer(state: RouterState = initialRouterState, event?: RouterEvent): RouterState {
    if (!event) {
        return state;
    }
    if (event.type === RouterEventTypes.ROUTER_WAS_EXTENDED) {
        return {
            ...state,
            redirects: [
                ...state.redirects,
                ...event.payload.redirects,
            ],
            routes: [
                ...state.routes,
                ...event.payload.routes,
            ],
        };
    }
    return state;
}