import {RoutingEvent, RoutingEventTypes, RoutingState} from "Common/Routing/Domain/Types";
import {Action, Reducer} from "redux";

interface CurrentRouteDataReducerManager {
    reduce(state?: any, action?: Action): any
}

export function createRoutingReducer(currentRouteDataReducerManager: CurrentRouteDataReducerManager): Reducer {
    const initialRoutingState: RoutingState = {
        redirects: [],
        routes: [],
        currentRouteData: currentRouteDataReducerManager.reduce()
    };
    return function routing(state: RoutingState = initialRoutingState, action?: (Action | RoutingEvent)): RoutingState {
        if (!action) {
            return state;
        }
        if (action.type === RoutingEventTypes.ROUTE_WAS_ADDED) {
            return {
                ...state,
                routes: [
                    ...state.routes,
                    action.payload.route
                ],
                currentRouteData: currentRouteDataReducerManager.reduce(state.currentRouteData, action),
            };
        }
        if (action.type === RoutingEventTypes.REDIRECT_WAS_ADDED) {
            return {
                ...state,
                redirects: [
                    ...state.redirects,
                    action.payload.redirect
                ],
                currentRouteData: currentRouteDataReducerManager.reduce(state.currentRouteData, action),
            };
        }
        return state;
    }
}