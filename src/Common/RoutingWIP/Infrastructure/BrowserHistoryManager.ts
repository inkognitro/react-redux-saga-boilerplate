import {History, LocationState} from 'history';
import {HistoryManager} from "Common/RoutingWIP/Domain/RoutingMiddleware";

export class BrowserHistoryManager implements HistoryManager {
    private readonly history: History<LocationState>;

    constructor(history: History) {
        this.history = history;
    }

    setCurrentRouteUrl(routeUrl: string): void {
        this.history.push(routeUrl);
    }

    replaceCurrentRouteUrl(routeUrl: string): void {
        this.history.replace(routeUrl);
    }

    addCurrentRouteUrlWasChangedListener(onChangeCurrentRouteUrl: (routeUrl: string) => void): void {
        this.history.listen((location) => onChangeCurrentRouteUrl(location.pathname));
    }
}