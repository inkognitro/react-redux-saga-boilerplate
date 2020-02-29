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

    if (action.type === RoutingActionTypes.SET_CURRENT_ROUTE_STATE) {
        return Object.assign({}, state, {
            currentRouteState: action.payload.state,
        });
    }

    if (action.type === RoutingActionTypes.APPLY_CURRENT_ROUTE_STATE_CHANGES) {
        const currentRouteState = (state.currentRouteState === null ? {} : state.currentRouteState);
        return Object.assign({}, state, {
            currentRouteState: Object.assign({}, currentRouteState, action.payload.stateChanges)
        });
    }

    return state;
}