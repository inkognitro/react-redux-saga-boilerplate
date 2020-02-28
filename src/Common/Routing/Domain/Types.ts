export type RoutingState = {
    currentRouteState: object,
};

export enum RoutingActionTypes {
    SET_CURRENT_ROUTE_STATE = 'SET_CURRENT_ROUTE_STATE-6c0f7c81-d248-45a0-9813-187c90e42254',
    SET_CURRENT_ROUTE = 'SET_ROUTE-6c0f7c81-d248-45a0-9813-187c90e42254',
}

type SetCurrentRouteStateAction = {
    type: RoutingActionTypes.SET_CURRENT_ROUTE_STATE,
    payload: {
        stateChanges: object,
    }
};

type SetCurrentRouteAction = {
    type: RoutingActionTypes.SET_CURRENT_ROUTE,
    payload: {
        initialState: object,
    }
};

export type RoutingActions = (SetCurrentRouteAction | SetCurrentRouteStateAction);