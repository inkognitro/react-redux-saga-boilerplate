import {RoutingState} from "Common/Routing/Domain/Types";
import {AppDispatch} from "Common/types";
import {getCurrentRouteState} from "Common/Routing/Domain/Selectors";
import {createSetCurrentRouteAction, createSetCurrentRouteStateAction} from "Common/Routing/Domain/ActionCreation";

export interface CurrentRouteManagerInterface {
    setCurrentRoute(routeUrl: string, initialState: object): void
    setCurrentRouteState(stateChanges: object): void
    getCurrentRouteState(): object
}

export type RoutingStateSelector = () => RoutingState;

export class CurrentRouteManager implements CurrentRouteManagerInterface {
    private readonly dispatch: AppDispatch;
    private readonly getRoutingState: RoutingStateSelector;
    private readonly routeHistory: RouteHistoryInterface;

    constructor(dispatch: AppDispatch, getRoutingState: RoutingStateSelector, routeHistory: RouteHistoryInterface) {
        this.dispatch = dispatch;
        this.getRoutingState = getRoutingState;
        this.routeHistory = routeHistory;
    }

    setCurrentRoute(routeUrl: string, initialState: object): void {
        this.routeHistory.setCurrentRouteUrl(routeUrl);
        this.dispatch(createSetCurrentRouteAction(initialState));
    }

    setCurrentRouteState(stateChanges: object): void {
        this.dispatch(createSetCurrentRouteStateAction(stateChanges));
    }

    getCurrentRouteState(): object {
        return getCurrentRouteState(this.getRoutingState());
    }
}

export interface RouteHistoryInterface {
    setCurrentRouteUrl(routeUrl: string): void
}


