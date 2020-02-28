import {RoutingState} from "Common/Routing/Domain/Types";

export function getCurrentRouteState(state: RoutingState): object {
    return state.currentRouteState;
}