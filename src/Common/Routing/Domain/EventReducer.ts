import {RoutingEvents, RoutingEventTypes, RoutingState} from "./Types";

function createInitialRoutingState(): RoutingState {
    return {
        routeDefinitions: [],
    };
}

export function routing(state: RoutingState = createInitialRoutingState(), action?: RoutingEvents): RoutingState {
    if (!action) {
        return state;
    }

    if (action.type === RoutingEventTypes.ROUTE_DEFINITION_WAS_ADDED) {
        return Object.assign({}, state, {
            routeDefinitions: [
                ...state.routeDefinitions,
                action.payload.routeDefinition
            ],
        });
    }

    return state;
}