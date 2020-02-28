import {RoutingActions, RoutingActionTypes} from "Common/Routing/Domain/Types";

export function createSetCurrentRouteStateAction(stateChanges: object): RoutingActions {
    return {
        type: RoutingActionTypes.SET_CURRENT_ROUTE_STATE,
        payload: {
            stateChanges: stateChanges
        }
    };
}

export function createSetCurrentRouteAction(initialState: object): RoutingActions {
    return {
        type: RoutingActionTypes.SET_CURRENT_ROUTE,
        payload: {
            initialState: initialState
        }
    };
}
