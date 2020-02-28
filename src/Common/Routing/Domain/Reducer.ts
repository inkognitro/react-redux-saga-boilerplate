import {RoutingActions, RoutingActionTypes, RoutingState} from "./Types";

function createInitialRoutingState(): RoutingState {
    return {
        currentRouteState: {},
    };
}

export function routing(state: RoutingState = createInitialRoutingState(), action?: RoutingActions): RoutingState {
    if (!action) {
        return state;
    }

    if (action.type === RoutingActionTypes.SET_CURRENT_ROUTE) {
        return Object.assign({}, state, {
            currentRouteState: action.payload.initialState,
        });
    }

    if (action.type === RoutingActionTypes.SET_CURRENT_ROUTE_STATE) {
        const currentRouteState = (state.currentRouteState === null ? {} : state.currentRouteState);
        return Object.assign({}, state, {
            currentRouteState: Object.assign({}, currentRouteState, action.payload.stateChanges)
        });
    }

    return state;
}