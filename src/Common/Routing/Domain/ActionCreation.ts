import {RoutingActions, RoutingActionTypes} from "Common/Routing/Domain/Types";

export function createApplyCurrentRouteStateChangesAction(stateChanges: object): RoutingActions {
    return {
        type: RoutingActionTypes.APPLY_CURRENT_ROUTE_STATE_CHANGES,
        payload: {
            stateChanges: stateChanges
        }
    };
}

export function createSetCurrentRouteStateAction(state: object): RoutingActions {
    return {
        type: RoutingActionTypes.SET_CURRENT_ROUTE_STATE,
        payload: {
            state: state
        }
    };
}
