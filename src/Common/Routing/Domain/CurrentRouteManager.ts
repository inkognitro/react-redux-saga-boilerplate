import {RoutingState} from "Common/Routing/Domain/Types";
import {AppDispatch} from "Common/types";
import {getCurrentRouteState} from "Common/Routing/Domain/Selectors";
import {createSetCurrentRouteAction, createSetCurrentRouteStateAction} from "Common/Routing/Domain/ActionCreation";

export interface CurrentRouteManagerInterface {
    setCurrentRoute(settings: SetCurrentRouteSettings): void
    setCurrentRouteState(stateChanges: object, callback?: () => void): void
    getCurrentRouteState(): object
}

export type RoutingStateSelector = () => RoutingState;

export type SetCurrentRouteSettings = {
    routeUrl: string,
    initialState: object
};

export class CurrentRouteManager implements CurrentRouteManagerInterface {
    private readonly dispatch: AppDispatch;
    private readonly getRoutingState: RoutingStateSelector;
    private readonly routeHistory: RouteHistoryInterface;

    constructor(dispatch: AppDispatch, getRoutingState: RoutingStateSelector, routeHistory: RouteHistoryInterface) {
        this.dispatch = dispatch;
        this.getRoutingState = getRoutingState;
        this.routeHistory = routeHistory;
    }

    setCurrentRoute(settings: SetCurrentRouteSettings): void {
        this.routeHistory.setCurrentRouteUrl(settings.routeUrl);
        this.dispatch(createSetCurrentRouteAction(settings.initialState));
    }

    setCurrentRouteState(stateChanges: object, callback?: () => void): void {
        this.dispatch(createSetCurrentRouteStateAction(stateChanges));
        if(callback) {
            callback();
        }
    }

    getCurrentRouteState(): object {
        return getCurrentRouteState(this.getRoutingState());
    }
}

export interface RouteHistoryInterface {
    setCurrentRouteUrl(routeUrl: string): void
}


