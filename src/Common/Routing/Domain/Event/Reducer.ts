import {Route, RoutingEvent, RoutingEventTypes, RoutingState} from "Common/Routing/Domain/Types";
import {Reducer} from "redux";
import {isUrlMatchingRoute} from "Common/Routing/Domain/Query/UrlMatchesRouteQuery";

export class ReducerManager {
    private readonly routeReducers: RouteReducer[];
    private readonly defaultCurrentRouteReducer: Reducer;
    private currentRouteReducer: Reducer;

    public constructor(routeReducers: RouteReducer[]) {
        this.routeReducers = routeReducers;
        this.defaultCurrentRouteReducer = () => null;
        this.currentRouteReducer = this.defaultCurrentRouteReducer;
        this.reduce = this.reduce.bind(this);
    }

    public reduce(passedDownState: (RoutingState | undefined), event: RoutingEvent): RoutingState {
        const state = (passedDownState ? passedDownState : this.createInitialRoutingState());
        if (!event) {
            return {
                ...state,
                currentRouteData: this.currentRouteReducer(state.currentRouteData, event),
            };
        }
        if (event.type === RoutingEventTypes.REDIRECT_WAS_ADDED) {
            return {
                ...state,
                redirects: [
                    ...state.redirects,
                    event.payload.redirect,
                ],
                currentRouteData: this.currentRouteReducer(state.currentRouteData, event),
            };
        }
        if (event.type === RoutingEventTypes.CURRENT_URL_WAS_CHANGED) {
            this.setCurrentRouteReducerByUrl(event.payload.url);
            return {
                ...state,
                currentRouteData: this.currentRouteReducer(undefined, event)
            };
        }
        return {
            ...state,
            currentRouteData: this.currentRouteReducer(state.currentRouteData, event),
        };
    }

    private createInitialRoutingState(): RoutingState {
        return {
            redirects: [],
            routes: this.routeReducers.map((routeReducer) => (routeReducer.route)),
            currentRouteData: undefined
        };
    }

    private setCurrentRouteReducerByUrl(url: string): void {
        const routeReducer = this.findRouteReducerByUrl(url);
        if(routeReducer !== null) {
            this.currentRouteReducer = routeReducer.reducer;
            return;
        }
        this.currentRouteReducer = this.defaultCurrentRouteReducer;
    }

    private findRouteReducerByUrl(url: string): (null | RouteReducer) {
        for(let index in this.routeReducers) {
            const routeReducer = this.routeReducers[index];
            if(isUrlMatchingRoute(url, routeReducer.route)) {
                return routeReducer;
            }
        }
        return null;
    }
}

export type RouteReducer = {
    route: Route,
    reducer: Reducer
};