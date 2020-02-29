export type RoutingState = {
    currentRouteState: object,
};

export enum RoutingActionTypes {
    APPLY_CURRENT_ROUTE_STATE_CHANGES = 'APPLY_CURRENT_ROUTE_STATE_CHANGES-6c0f7c81-d248-45a0-9813-187c90e42254',
    SET_CURRENT_ROUTE_STATE = 'SET_CURRENT_ROUTE_STATE-6c0f7c81-d248-45a0-9813-187c90e42254',
}

type ApplyCurrentRouteStateChangesAction = {
    type: RoutingActionTypes.APPLY_CURRENT_ROUTE_STATE_CHANGES,
    payload: {
        stateChanges: object,
    }
};

type SetCurrentRouteStateAction = {
    type: RoutingActionTypes.SET_CURRENT_ROUTE_STATE,
    payload: {
        state: object,
    }
};

export type RoutingActions = (SetCurrentRouteStateAction | ApplyCurrentRouteStateChangesAction);