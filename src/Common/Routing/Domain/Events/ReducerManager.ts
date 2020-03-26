import {Route, RoutingEvent, RoutingEventTypes, RoutingState} from "Common/Routing/Domain/Types";
import {Reducer} from "redux";
import {isUrlMatchingRoute} from "Common/Routing/Domain/Query/UrlMatchesRouteQuery";

export class ReducerManager {
    private readonly routeDataReducers: RouteDataReducer[];
    private readonly defaultCurrentRouteDataReducer: Reducer;
    private currentRouteDataReducer: Reducer;

    public constructor(routeReducers: RouteDataReducer[]) {
        this.routeDataReducers = routeReducers;
        this.defaultCurrentRouteDataReducer = () => null;
        this.currentRouteDataReducer = this.defaultCurrentRouteDataReducer;
    }

    private createInitialRoutingState(): RoutingState {
        let routes: Route[] = [];
        this.routeDataReducers.forEach((routeDataReducer) => {
            routes.push(routeDataReducer.route);
        });
        return {
            redirects: [],
            routes: routes,
            currentRouteData: undefined
        };
    }

    public reduce(passedDownState: (RoutingState | undefined), event: RoutingEvent): RoutingState {
        const state = (passedDownState ? passedDownState : this.createInitialRoutingState());
        if (!event) {
            return {
                ...state,
                currentRouteData: this.currentRouteDataReducer(state.currentRouteData, event),
            };
        }
        if (event.type === RoutingEventTypes.REDIRECT_WAS_ADDED) {
            return {
                ...state,
                redirects: [
                    ...state.redirects,
                    event.payload.redirect,
                ],
                currentRouteData: this.currentRouteDataReducer(state.currentRouteData, event),
            };
        }
        if (event.type === RoutingEventTypes.CURRENT_URL_WAS_CHANGED) {
            this.setCurrentRouteDataReducerByUrl(event.payload.url);
            return {
                ...state,
                currentRouteData: this.currentRouteDataReducer(undefined, event)
            };
        }
        return {
            ...state,
            currentRouteData: this.currentRouteDataReducer(state.currentRouteData, event),
        };
    }

    private setCurrentRouteDataReducerByUrl(url: string): void {
        const routeDataReducer = this.findRouteDataReducerByUrl(url);
        if(routeDataReducer !== null) {
            this.currentRouteDataReducer = routeDataReducer.reducer;
            return;
        }
        this.currentRouteDataReducer = this.defaultCurrentRouteDataReducer;
    }

    private findRouteDataReducerByUrl(url: string): (null | RouteDataReducer) {
        for(let index in this.routeDataReducers) {
            const routeDataReducer = this.routeDataReducers[index];
            if(isUrlMatchingRoute(url, routeDataReducer.route)) {
                return routeDataReducer;
            }
        }
        return null;
    }
}

export type RouteDataReducer = {
    route: Route,
    reducer: Reducer
};