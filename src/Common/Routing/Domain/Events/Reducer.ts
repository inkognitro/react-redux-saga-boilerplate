import {RoutingEvent, RoutingEventTypes, RoutingState} from "Common/Routing/Domain/Types";
import {Action, Reducer} from "redux";

export interface CurrentRouteDataReducer {
    reduce(state: (undefined | any), action: Action): any
}

export function createRoutingReducer(currentRouteDataReducer: CurrentRouteDataReducer): Reducer {
    const initialRoutingState: RoutingState = {
        redirects: [],
        routes: [],
        // @ts-ignore
        currentRouteData: currentRouteDataReducer.reduce()
    };
    return function routing(state: RoutingState = initialRoutingState, action: RoutingEvent): RoutingState {
        if (!action) {
            return {
                ...state,
                currentRouteData: currentRouteDataReducer.reduce(state.currentRouteData, action)
            };
        }
        if (action.type === RoutingEventTypes.ROUTE_WAS_ADDED) {
            return {
                ...state,
                routes: [
                    ...state.routes,
                    action.payload.route
                ],
                currentRouteData: currentRouteDataReducer.reduce(state.currentRouteData, action),
            };
        }
        if (action.type === RoutingEventTypes.REDIRECT_WAS_ADDED) {
            return {
                ...state,
                redirects: [
                    ...state.redirects,
                    action.payload.redirect,
                ],
                currentRouteData: currentRouteDataReducer.reduce(state.currentRouteData, action),
            };
        }
        if (action.type === RoutingEventTypes.CURRENT_URL_WAS_CHANGED) {
            return {
                ...state,
                currentRouteData: currentRouteDataReducer.reduce(undefined, action)
            };
        }
        return {
            ...state,
            currentRouteData: currentRouteDataReducer.reduce(state.currentRouteData, action)
        };
    }
}